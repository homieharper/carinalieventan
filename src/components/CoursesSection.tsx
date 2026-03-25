import { motion } from "framer-motion";
import { FlowButtonGold } from "@/components/ui/flow-button-gold";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Tilt } from "@/components/ui/tilt";
import { courses } from "@/data/courses";

const CoursesSection = () => {
  return (
    <section id="formaciones" className="section-padding bg-deep-green overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-body tracking-[0.4em] uppercase block">Expandiendo Conocimiento</span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mt-4 text-primary-foreground text-balance">
            Escuela de <span className="text-gradient-gold italic">Acompañamiento</span>
          </h2>
          <p className="font-body text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            Programas integrales de formación para quienes desean profundizar en su propio proceso 
            o profesionalizarse como terapeutas holísticos de vanguardia.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            >
              <GlowCard 
                glowColor="orange" 
                customSize 
                className="group/card flex flex-col bg-background/95 backdrop-blur-md h-full w-full p-0 gap-0 border border-gold/20 hover:border-gold/50 transition-all duration-500 shadow-xl shadow-black/10 rounded-2xl overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-transparent to-transparent opacity-80" />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="font-display text-2xl text-white mb-3 leading-tight group-hover/card:text-gold transition-colors duration-300">
                      {course.title}
                  </h3>
                  <p className="font-body text-sm text-zinc-300/80 leading-relaxed mb-8 flex-1">
                      {course.shortDesc}
                  </p>
                  <div className="flex items-center justify-between mb-6 border-y border-white/10 py-3">
                      <span className="text-xs font-body text-zinc-400 uppercase tracking-widest">Duración</span>
                      <span className="text-xs font-body font-medium text-white uppercase tracking-widest">{course.duration}</span>
                  </div>
                  <FlowButtonGold text="Detalles del Programa" href={`/formacion/${course.id}`} variant="white" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
export { courses };