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
                const { course_id, user_id } = paymentInfo.metadata;
                
                console.log(`Payment Approved! Course: ${course_id}, User: ${user_id}`);

                // Register enrollment in Supabase
                const { error } = await supabase
                    .from('enrollments')
                    .insert([
                        { 
                            user_id, 
                            course_id, 
                            status: 'paid' 
                        }
                    ]);

                if (error) {
                    console.error("Supabase Enrollment Error:", error);
                } else {
                    console.log("Enrollment success!");
                }
            }
        }

        res.status(200).send("OK");
    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).send("Internal Server Error");
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
