import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Route, HeartPulse, Compass } from "lucide-react";

const services = [
  {
    icon: User,
    title: "Sesiones Individuales",
    description: "Encuentros terapéuticos personalizados donde trabajamos con tus conflictos, síntomas y procesos emocionales de manera profunda y contenida.",
    features: ["Presencial u online", "90 minutos de duración", "Seguimiento personalizado"],
  },
  {
    icon: Route,
    title: "Procesos Terapéuticos",
    description: "Acompañamiento sostenido a lo largo del tiempo para abordar patrones profundos, dinámicas familiares y procesos de transformación integral.",
    features: ["Plan de trabajo personalizado", "Sesiones periódicas", "Herramientas entre sesiones"],
  },
  {
    icon: HeartPulse,
    title: "Sanación Emocional y Familiar",
    description: "Trabajo específico con síntomas emocionales, conflictos familiares y lealtades inconscientes que afectan tu bienestar y tus relaciones.",
    features: ["Constelaciones familiares", "Biodescodificación", "Memoria celular"],
  },
  {
    icon: Compass,
    title: "Autoconocimiento y Conciencia",
    description: "Procesos orientados a la expansión de la conciencia, el encuentro con tu propósito y la integración de todas las dimensiones de tu ser.",
    features: ["Trabajo con arquetipos", "Tarot terapéutico", "Meditación guiada"],
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-body tracking-[0.3em] uppercase">Servicios</span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mt-4 text-foreground text-balance">
            Acompañamiento <span className="text-gradient-gold italic">Terapéutico</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Cada proceso es único. Ofrezco distintas modalidades de acompañamiento para que encuentres 
            la que mejor resuene con tu momento y necesidad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-500"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <service.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground">{service.title}</h3>
                </div>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg" asChild>
            <a href="#contacto">Reservar una Sesión</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
