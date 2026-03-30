import { motion } from "framer-motion";
import { FlowButtonGold } from "@/components/ui/flow-button-gold";
import { GlowCard } from "@/components/ui/spotlight-card";
import { courses } from "@/data/courses";
import { staggerContainer, cardEntrance, sectionHeader } from "@/lib/animations";

const CoursesSection = () => {
  return (
    <section id="formaciones" className="section-padding bg-deep-green overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...sectionHeader}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-body tracking-[0.4em] uppercase block">Expandiendo Conocimiento</span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mt-4 text-primary-foreground text-balance">
            Escuela de <span className="text-gradient-gold italic">Acompañamiento</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            Programas integrales de formación para quienes desean profundizar en su propio proceso 
            o profesionalizarse como terapeutas holísticos de vanguardia.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={cardEntrance}>
              {course.isComingSoon ? (
                <GlowCard
                  glowColor="orange"
                  customSize
                  className="group/card flex flex-col bg-background/95 backdrop-blur-md h-full w-full p-0 gap-0 border border-gold/20 hover:border-gold/50 transition-all duration-500 shadow-xl shadow-black/10 rounded-2xl overflow-hidden"
                >
                  <div className="relative h-56 mx-3 mt-3 rounded-2xl overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="flex flex-col flex-1 px-0 pt-4 pb-5">
                    <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-tight px-5">
                      Próximamente
                    </h3>
                    <div className="flex items-center justify-between mb-4 border-y border-white/10 py-3 mx-5">
                      <span className="text-xs font-body text-zinc-400 uppercase tracking-wider sm:tracking-widest">Duración</span>
                      <span className="text-xs font-body font-medium text-white uppercase tracking-wider sm:tracking-widest">{course.duration}</span>
                    </div>
                    <div className="px-5">
                      <FlowButtonGold text="Próximamente" disabled className="w-full" />
                    </div>
                  </div>
                </GlowCard>
              ) : (
                <a href={`/formacion/${course.id}`} className="block h-full">
                  <GlowCard
                    glowColor="orange"
                    customSize
                    className="group/card flex flex-col bg-background/95 backdrop-blur-md h-full w-full p-0 gap-0 border border-gold/20 hover:border-gold/50 transition-all duration-500 shadow-xl shadow-black/10 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-56 mx-3 mt-3 rounded-2xl overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="flex flex-col flex-1 px-0 pt-4 pb-5">
                      <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-tight group-hover/card:text-gold transition-colors duration-300 px-5">
                        {course.title}
                      </h3>
                      <div className="flex items-center justify-between mb-4 border-y border-white/10 py-3 mx-5">
                        <span className="text-xs font-body text-zinc-400 uppercase tracking-wider sm:tracking-widest">Duración</span>
                        <span className="text-xs font-body font-medium text-white uppercase tracking-wider sm:tracking-widest">{course.duration}</span>
                      </div>
                      <div className="px-5">
                        <FlowButtonGold
                          text="Detalles del Programa"
                          variant="white"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </GlowCard>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;