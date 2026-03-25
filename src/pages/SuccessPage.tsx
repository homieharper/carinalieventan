import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Play, Sparkles, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

const SuccessPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { user } = useUser();
    const courseId = id || searchParams.get("courseId") || "constelaciones-familiares";
    const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id");
    const [enrolling, setEnrolling] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const confirmEnrollment = async () => {
            if (!paymentId || !user) {
                setEnrolling(false);
                return;
            }
            try {
                await fetch(`${import.meta.env.VITE_API_URL || 'https://carinalieventan.com'}/api/confirm-enrollment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId, courseId, userId: user.id })
                });
            } catch (err) {
                console.error("Could not confirm enrollment:", err);
            } finally {
                setEnrolling(false);
            }
        };

        confirmEnrollment();
    }, [paymentId, courseId, user]);

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-24 h-24 rounded-full bg-deep-green/10 flex items-center justify-center mb-10 relative"
                >
                    <CheckCircle2 className="w-12 h-12 text-deep-green" />
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1 -right-1"
                    >
                        <Sparkles className="w-6 h-6 text-gold" />
                    </motion.div>
                </motion.div>

                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-4xl md:text-6xl text-slate-900 mb-6 lowercase italic"
                >
                    ¡Tu camino comienza ahora!
                </motion.h1>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-body text-slate-600 text-lg max-w-xl mb-12 leading-relaxed"
                >
                    Felicidades por dar este paso hacia tu transformación. El pago ha sido procesado con éxito 
                    y ya tienes acceso completo a todos los materiales de la formación.
                </motion.p>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button variant="gold" size="lg" disabled={enrolling} className="h-14 px-10 uppercase tracking-widest text-xs" asChild={!enrolling}>
                        {enrolling ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparando acceso…
                            </>
                        ) : (
                            <Link to={`/formacion/${courseId}`}>
                                <Play className="mr-2 h-4 w-4 fill-current" /> Entrar al Aula Virtual
                            </Link>
                        )}
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 px-10 border-slate-200 text-slate-600 uppercase tracking-widest text-[10px]" asChild>
                        <Link to="/">Volver al Inicio</Link>
                    </Button>
                </motion.div>

                {/* Animated Background Decor */}
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-deep-green/5 rounded-full blur-[120px]" />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SuccessPage;
