import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FlowButtonGold } from "@/components/ui/flow-button-gold";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const enter = () => setIsActive(true);
    const leave = () => setIsActive(false);
    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);
    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center overflow-hidden max-w-full"
    >
      {/* Full-screen MeshGradient background */}
      <div className="absolute inset-0">
        <MeshGradient
          colors={["#28362F", "#506642", "#6B8E65", "#1B2420", "#28362F"]}
          speed={isActive ? 0.6 : 0.25}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Soft overlay for text readability - Using a dark gradient from left to match the deep green theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a120b]/90 via-[#0a120b]/40 to-transparent z-[1]" />

      {/* Floating SVG grid pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="heroGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/40 backdrop-blur-md mb-10 group hover:bg-gold/20 transition-all duration-500"
          >
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-[10px] sm:text-xs md:text-sm font-body font-medium tracking-wider sm:tracking-widest text-gold uppercase">Conciencia que Sana y Transforma</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 55, damping: 20, delay: 0.15 }}
            className="font-display text-foreground leading-[0.9] lg:leading-[0.85] text-balance"
          >
            <span className="block text-[clamp(1.5rem,6.5vw,3.5rem)] lg:text-6xl xl:text-[7.5rem] font-extralight text-zinc-100/60 lowercase tracking-tighter italic whitespace-normal">
              Carina Silvana
            </span>
            <span className="block text-[clamp(2rem,8.5vw,3.75rem)] md:text-[7vw] lg:text-[7.5vw] xl:text-[clamp(5rem,9.5vw,9.5rem)] font-bold tracking-tighter mt-2 bg-clip-text text-transparent bg-gradient-to-br from-gold/90 via-gold to-gold-dark break-words">
              LIEVENTAN
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 55, damping: 20, delay: 0.35 }}
            className="font-display text-base sm:text-xl md:text-2xl italic text-gold/90 mt-5 tracking-wide text-balance"
          >
            Terapias Holísticas y Escuela de Formación
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 55, damping: 20, delay: 0.5 }}
            className="font-body text-zinc-200 mt-6 text-xs sm:text-sm md:text-lg leading-relaxed max-w-xl font-light"
          >
            Abriendo portales hacia tu sanación profunda. Acompaño procesos de transformación 
            y expansión de la conciencia a través de abordajes sistémicos que honran tu historia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 55, damping: 20, delay: 0.65 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            <FlowButtonGold text="Explorar Terapias" href="#servicios" variant="white" />
            <Button 
                variant="ghost" 
                size="lg" 
                asChild 
                className="text-gold border border-gold/20 hover:bg-gold/10 px-8 transition-all duration-500 tracking-wider font-body text-sm uppercase"
            >
              <a href="#formaciones">Formaciones Académicas</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
