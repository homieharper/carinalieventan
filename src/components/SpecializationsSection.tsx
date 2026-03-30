import { motion } from "framer-motion";
import { Users, Brain, Dna, Network, Crown, Sun } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import { staggerContainer, cardEntrance, sectionHeader, hoverLift } from "@/lib/animations";

const specializations = [
  {
    icon: Users,
    title: "Constelaciones Familiares",
    description: "Revelando los órdenes ocultos del sistema familiar para liberar lealtades inconscientes.",
  },
  {
    icon: Dna,
    title: "Biodescodificación",
    description: "Descodificando el lenguaje biológico de los síntomas y sus conflictos emocionales.",
  },
  {
    icon: Brain,
    title: "Memoria Celular",
    description: "Acceso a la información profunda almacenada en las células (Método Gonçalves).",
  },
  {
    icon: Network,
    title: "Terapia Sistémica",
    description: "Visión integral del individuo dentro de sus sistemas de pertenencia y repetición.",
  },
  {
    icon: Crown,
    title: "Arquetipos y Simbología",
    description: "Herramientas ancestrales para el autoconocimiento profundo y el camino del alma.",
  },
  {
    icon: Sun,
    title: "Evolución Espiritual",
    description: "Procesos de expansión de conciencia integrando mente, emoción, cuerpo y ser.",
  },
];

const SpecializationsSection = () => {
  return (
    <section className="section-padding bg-deep-green relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/sacred-geometry.png')]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          {...sectionHeader}
          className="text-center mb-20"
        >
          <span className="text-gold text-sm font-body tracking-[0.5em] uppercase mb-4 block">Sabiduría Integrada</span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl mt-4 text-primary-foreground text-balance">
            Áreas de <span className="text-gradient-gold italic">Estudio</span>
          </h2>
          <div className="w-24 h-px bg-gold/50 mx-auto mt-8" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {specializations.map((spec, i) => (
            <motion.div key={i} variants={cardEntrance} {...hoverLift}>
              <Tilt rotationFactor={10} className="h-full">
                <div className="group h-full p-6 sm:p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/40 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5">
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-500">
                    <spec.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-primary-foreground mb-4 group-hover:text-gold transition-colors">{spec.title}</h3>
                  <p className="font-body text-sm text-primary-foreground/60 leading-relaxed font-light">{spec.description}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializationsSection;