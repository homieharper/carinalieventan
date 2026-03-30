import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/carina-logo.svg";

export const Preloader = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-8">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -inset-8 bg-gold/10 rounded-full blur-3xl"
                            />
                            <motion.img
                                src={logo}
                                alt="Logo"
                                className="w-24 h-24 relative"
                                initial={{ scale: 0.3, rotate: -180, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 55,
                                    damping: 14,
                                    mass: 1.1,
                                    delay: 0.1,
                                }}
                            />
                        </div>

                        <div className="flex flex-col items-center overflow-hidden">
                            <span className="font-display text-2xl md:text-3xl text-gold uppercase tracking-[0.2em] md:tracking-[0.4em]">
                                Carina Lieventan
                            </span>
                            {/* Progress bar — animates across the full 2500ms */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.5, ease: "linear" }}
                                className="h-px bg-gold/30 mt-4"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 overflow-hidden">
                        <span className="text-[10px] font-body text-gold/50 uppercase tracking-widest md:tracking-[0.8em]">
                            Elevando la Conciencia
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
