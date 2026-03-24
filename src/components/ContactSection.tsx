import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Instagram, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contacto" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-body tracking-[0.3em] uppercase">Contacto</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
            Comienza tu <span className="text-gradient-gold italic">Proceso</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Si sentís el llamado de iniciar un camino de sanación, formarte como terapeuta 
            o sumarte a la comunidad, estoy aquí para acompañarte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-foreground mb-4">¿Cómo puedo ayudarte?</h3>
              <ul className="space-y-3 font-body text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Reservar una sesión individual
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Consultar por cursos y formaciones
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Sumarte a la comunidad terapéutica
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Información sobre talleres y eventos
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <a href="mailto:cslieventan@hotmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors font-body">
                <Mail className="w-5 h-5 text-gold" />
                cslieventan@hotmail.com
              </a>
              <a href="https://wa.me/542323318733?text=Hola%20Carina%2C%20vengo%20de%20tu%20p%C3%A1gina%20web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors font-body">
                <Phone className="w-5 h-5 text-gold" />
                WhatsApp
              </a>
              <a href="https://www.instagram.com/formaciones_holisticas/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors font-body">
                <Instagram className="w-5 h-5 text-gold" />
                Instagram
              </a>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-body text-muted-foreground mb-1">Nombre</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-muted-foreground mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-muted-foreground mb-1">Mensaje</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                placeholder="¿En qué puedo acompañarte?"
              />
            </div>
            <Button variant="gold" size="lg" className="w-full gap-2">
              <Send className="w-4 h-4" />
              Enviar Mensaje
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;