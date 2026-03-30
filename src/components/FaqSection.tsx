import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { sectionHeader } from "@/lib/animations";

const faqs = [
  {
    question: "¿Necesito tener conocimientos previos para acceder a las formaciones?",
    answer:
      "No. Las formaciones están diseñadas tanto para personas que comienzan su camino de autoconocimiento como para terapeutas y profesionales que desean profundizar sus herramientas. Cada programa indica su nivel de enfoque en la descripción.",
  },
  {
    question: "¿Cómo funcionan las sesiones individuales? ¿Son presenciales u online?",
    answer:
      "Las sesiones pueden ser presenciales en Luján, Buenos Aires, o bien realizarse de forma online por Zoom. La modalidad no afecta la profundidad del proceso: el trabajo sistémico y terapéutico funciona igual de efectivamente en ambos formatos.",
  },
  {
    question: "¿Las terapias que ofrece reemplazan el tratamiento psicológico o médico?",
    answer:
      "No. Las Constelaciones Familiares, la Biodescodificación y la Memoria Celular son enfoques complementarios que trabajan desde una perspectiva sistémica y emocional. No reemplazan el diagnóstico ni el tratamiento de un profesional de la salud, sino que pueden acompañarlo y potenciarlo.",
  },
  {
    question: "¿Cómo accedo al contenido de una formación después de comprarla?",
    answer:
      "Una vez confirmado el pago, tu acceso se activa automáticamente. Podés ingresar desde el menú con tu cuenta y verás todas las lecciones disponibles. El acceso es de por vida: podés volver a ver el contenido cuando quieras, a tu propio ritmo.",
  },
  {
    question: "¿Puedo hacer una consulta antes de decidir si una formación es para mí?",
    answer:
      "Por supuesto. Podés escribirme por WhatsApp o completar el formulario de contacto con tus dudas. Te respondo personalmente para ayudarte a entender si el programa se alinea con tu momento y tus objetivos.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div {...sectionHeader} className="text-center mb-16">
          <span className="text-gold text-sm font-body tracking-[0.4em] uppercase mb-4 block">
            Preguntas Frecuentes
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-foreground text-balance">
            Todo lo que necesitás <span className="text-gradient-gold italic">saber</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-xl px-6 bg-card hover:border-gold/30 transition-colors duration-300"
              >
                <AccordionTrigger className="font-display text-base sm:text-lg text-foreground text-left hover:no-underline hover:text-gold transition-colors duration-300 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed text-sm sm:text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
