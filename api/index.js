import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Configure Supabase Admin (uses service_role key to bypass RLS)
const supabase = createClient(
    process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Configure Mercado Pago
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN || '',
});

/**
 * Creates a Payment Preference
 */
app.post('/api/create-preference', async (req, res) => {
    try {
        const { title, quantity, price, courseId, userId } = req.body;

        // Dev tool: If title includes "TEST", force price to 1 ARS
        const finalPrice = title.includes("TEST") ? 1 : price;

        console.log("Creating preference for:", { title, finalPrice, courseId, userId });

        const preference = new Preference(client);
        
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: courseId,
                        title: title,
                        quantity: Number(quantity),
                        unit_price: Number(finalPrice),
                        currency_id: 'ARS',
                    }
                ],
                back_urls: {
                    success: `${process.env.FRONTEND_URL || 'https://carinalieventan.com'}/success?courseId=${courseId}`,
                    failure: `${process.env.FRONTEND_URL || 'https://carinalieventan.com'}/formacion/${courseId}`,
                    pending: `${process.env.FRONTEND_URL || 'https://carinalieventan.com'}/pending`,
                },
                auto_return: 'approved',
                binary_mode: true,
                notification_url: `${process.env.BACKEND_URL || 'https://carinalieventan.com'}/api/webhook`,
                external_reference: `${courseId}|${userId}`,
                metadata: {
                    course_id: courseId,
                    user_id: userId
                }
            }
        });

        res.json({ id: result.id, init_point: result.init_point });
    } catch (error) {
        console.error("Mercado Pago Preference Error:", error);
        res.status(500).json({ error: "No se pudo crear la preferencia de pago" });
    }
});

/**
 * Webhook for Payment Notifications
 */
app.post('/api/webhook', async (req, res) => {
    try {
        const { query } = req;
        const topic = query.topic || query.type;
        
        console.log("Webhook Received:", { topic, id: query.id || req.body.data?.id });

        if (topic === 'payment' || req.body.type === 'payment') {
            const paymentId = query.id || req.body.data.id;
            const payment = new Payment(client);
            
            // Get payment details
            const paymentInfo = await payment.get({ id: paymentId });
            
            if (paymentInfo.status === 'approved') {
                let { course_id, user_id } = paymentInfo.metadata || {};

                // Fallback: parse from external_reference if metadata is missing
                if (!course_id || !user_id) {
                    const parts = (paymentInfo.external_reference || '').split('|');
                    course_id = parts[0] || course_id;
                    user_id = parts[1] || user_id;
                    console.log(`Metadata missing, using external_reference fallback: ${course_id}|${user_id}`);
                }

                console.log(`Payment Approved! Course: ${course_id}, User: ${user_id}`);

                // Check if already enrolled (idempotent — SuccessPage may have already inserted)
                const { data: existing } = await supabase
                    .from('enrollments')
                    .select('id')
                    .eq('user_id', user_id)
                    .eq('course_id', course_id)
                    .limit(1);

                if (existing && existing.length > 0) {
                    console.log("Enrollment already exists, skipping insert.");
                } else {
                    const { error } = await supabase
                        .from('enrollments')
                        .insert([{ user_id, course_id, status: 'paid' }]);

                    if (error) {
                        console.error("Supabase Enrollment Error:", error);
                    } else {
                        console.log("Enrollment success!");
                    }
                }
            }
        }

        res.status(200).send("OK");
    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

/**
 * Confirm enrollment after successful payment redirect.
 * Called by SuccessPage as a fallback in case the webhook hasn't fired yet.
 */
app.post('/api/confirm-enrollment', async (req, res) => {
    try {
        const { paymentId, courseId, userId } = req.body;
        if (!paymentId || !courseId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const payment = new Payment(client);
        const paymentInfo = await payment.get({ id: paymentId });

        console.log(`Confirm enrollment: payment ${paymentId} status=${paymentInfo.status}`);

        if (paymentInfo.status !== 'approved') {
            return res.status(400).json({ error: 'Payment not approved', status: paymentInfo.status });
        }

        // Verify the payment belongs to this course (security check)
        const extRef = paymentInfo.external_reference || '';
        const refCourseId = extRef.split('|')[0];
        if (refCourseId && refCourseId !== courseId) {
            console.warn(`Course mismatch: expected ${courseId}, got ${refCourseId}`);
            return res.status(400).json({ error: 'Payment does not match course' });
        }

        // Check if already enrolled (idempotent)
        const { data: existing } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .limit(1);

        if (existing && existing.length > 0) {
            return res.json({ success: true, already: true });
        }

        const { error } = await supabase
            .from('enrollments')
            .insert([{ user_id: userId, course_id: courseId, status: 'paid' }]);

        if (error) {
            console.error("Confirm enrollment Supabase error:", error);
            return res.status(500).json({ error: 'Failed to register enrollment' });
        }

        console.log(`Confirm enrollment success: user ${userId} -> course ${courseId}`);
        res.json({ success: true });
    } catch (error) {
        console.error("Confirm enrollment error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Check if a user has access to a course.
 * Uses service_role key so it works regardless of Supabase RLS policies.
 */
app.post('/api/check-access', async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            return res.json({ hasAccess: false });
        }

        const { data } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .limit(1);

        res.json({ hasAccess: !!(data && data.length > 0) });
    } catch (error) {
        console.error("Check access error:", error);
        res.json({ hasAccess: false });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`🚀 Local Backend listening on port ${PORT}`);
    });
}

export default app;
