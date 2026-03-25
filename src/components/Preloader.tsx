import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/carina-logo.svg";

export const Preloader = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if preloader has already been shown in this session
        const hasShown = sessionStorage.getItem("preloader-shown");
        
        if (!hasShown) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem("preloader-shown", "true");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,165,114,0.05)_0%,transparent_70%)]" />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="relative mb-8">
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -inset-8 bg-gold/10 rounded-full blur-3xl"
                            />
                            <img src={logo} alt="Logo" className="w-24 h-24 relative" />
                        </div>

                        <div className="flex flex-col items-center overflow-hidden">
                            <motion.span 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="font-display text-2xl md:text-3xl text-gold uppercase tracking-[0.2em] md:tracking-[0.4em]"
                            >
                                Carina Lieventan
                            </motion.span>
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                                className="h-px bg-gold/30 mt-4 self-stretch"
                            />
                        </div>
                    </motion.div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 overflow-hidden">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1.5 }}
                            className="text-[10px] font-body text-gold uppercase tracking-widest md:tracking-[0.8em]"
                        >
                            Elevando la Conciencia
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
