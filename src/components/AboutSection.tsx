import { motion } from "framer-motion";
import profileImage from "@/assets/carina-profile.jpg";

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="section-padding bg-background relative overflow-hidden">
      {/* Background Ornament */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                <img
                    src={profileImage}
                    alt="Carina Silvana Lieventan"
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-gold text-sm font-body tracking-[0.4em] uppercase mb-4 block">La Esencia Detrás</span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-foreground leading-[1.1] text-balance">
                    Una Vida Dedicada a la <span className="text-gradient-gold italic">Sanación Consciente</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-10"
            >
                <p className="font-body text-muted-foreground leading-relaxed text-base sm:text-xl md:text-2xl font-light">
                    Mi labor trasciende la técnica; es un compromiso con el alma. 
                    Acompaño procesos de <span className="text-gold italic">sanación profunda</span> donde integramos lo visible 
                    con lo espiritual para revelar tu verdadera esencia.
                </p>
                
                <div className="space-y-6 border-l border-gold/20 pl-8">
                    <p className="font-body text-foreground/70 leading-relaxed text-base md:text-lg">
                        Integro la sabiduría de las <span className="text-foreground font-medium">Constelaciones Familiares</span>, 
                        la <span className="text-foreground font-medium">Biodescodificación</span> y la <span className="text-foreground font-medium">Memoria Celular</span> 
                        en un enfoque sistémico y profesional.
                    </p>
                    <p className="font-body text-foreground/70 leading-relaxed text-base md:text-lg">
                        Como formadora, mi propósito es crear puentes entre el dolor y la comprensión, 
                        permitiendo que cada ser recupere su <span className="text-gold italic font-medium">poder interior</span>.
                    </p>
                </div>

                <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-foreground/90 italic leading-snug pt-4">
                    “Mi vocación es iluminar las sombras del sistema familiar para que la vida vuelva a fluir con amor y libertad.”
                </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
