import { Instagram, Phone, Mail, ChevronRight, Sparkles, MapPin } from "lucide-react";
import logo from "@/assets/carina-logo.svg";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const { pathname } = useLocation();

    const handleHomeClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

  return (
    <footer className="bg-deep-green pt-32 pb-16 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 relative z-10">
        
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <Link to="/" onClick={handleHomeClick} className="flex items-center gap-4 mb-10 group">
             <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-2.5 group-hover:border-gold/30 transition-all duration-700">
                <img src={logo} alt="Logo" className="w-full h-full opacity-90 group-hover:rotate-[360deg] transition-transform duration-700" />
             </div>
             <div className="flex flex-col">
                <span className="font-display text-sm md:text-xl text-gold leading-none tracking-widest md:tracking-[0.3em] uppercase mb-1">Carina Lieventan</span>
                <span className="text-[7px] md:text-[8px] text-white/40 uppercase tracking-widest md:tracking-[0.3em] font-body font-light">Ecos de Sanación</span>
             </div>
          </Link>
          <p className="text-white/60 font-body text-sm leading-relaxed mb-10 max-w-sm italic pr-4">
            "Acompañando procesos de sanación profunda a través de la mirada sistémica y la conciencia corporal."
          </p>
          <div className="flex gap-4">
             {[
               { icon: Instagram, href: "https://www.instagram.com/formaciones_holisticas/" },
               { icon: Phone, href: "https://wa.me/542323318733" },
               { icon: Mail, href: "mailto:cslieventan@hotmail.com" }
             ].map((social, i) => (
               <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-500"
               >
                  <social.icon className="w-4 h-4" />
               </a>
             ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-xs text-gold uppercase tracking-widest md:tracking-[0.3em] mb-10 opacity-80 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Navegación
          </h4>
          <ul className="space-y-4">
            {[
              { label: "Inicio", href: "/", isHome: true },
              { label: "Sobre Mí", href: "/#sobre-mi" },
              { label: "Servicios", href: "/#servicios" },
              { label: "Formaciones", href: "/#formaciones" },
              { label: "Contacto", href: "/#contacto" }
            ].map((item) => (
              <li key={item.label}>
                {item.isHome ? (
                    <Link 
                        to="/" 
                        onClick={handleHomeClick}
                        className="text-white/50 hover:text-gold transition-all duration-300 text-[10px] uppercase tracking-widest md:tracking-[0.2em] font-body flex items-center gap-3 group"
                    >
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gold" />
                        {item.label}
                    </Link>
                ) : (
                    <a 
                        href={item.href} 
                        className="text-white/50 hover:text-gold transition-all duration-300 text-[10px] uppercase tracking-widest md:tracking-[0.2em] font-body flex items-center gap-3 group"
                    >
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gold" />
                        {item.label}
                    </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-display text-xs text-gold uppercase tracking-widest md:tracking-[0.3em] mb-10 opacity-80 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Legales
          </h4>
          <ul className="space-y-4">
            {["Términos y Condiciones", "Privacidad", "Cookies"].map((legal) => (
              <li key={legal}>
                <a href="#" className="text-white/50 hover:text-gold transition-all duration-300 text-[10px] uppercase tracking-[0.3em] font-body flex items-center gap-3 group">
                   <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gold" />
                   {legal}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Location & Contact */}
        <div className="lg:col-span-1">
            <h4 className="font-display text-xs text-gold uppercase tracking-widest md:tracking-[0.3em] mb-10 opacity-80 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Ubicación
            </h4>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                        <p className="text-white/60 text-xs leading-relaxed font-body uppercase tracking-widest font-bold mb-1">Presencial</p>
                        <p className="text-white/40 text-[11px] leading-relaxed font-body italic">Luján, Buenos Aires, Argentina</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                        <p className="text-white/60 text-xs leading-relaxed font-body uppercase tracking-widest font-bold mb-1">Online</p>
                        <p className="text-white/40 text-[11px] leading-relaxed font-body italic">Consultas individuales y talleres grupales vía Zoom</p>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Final Section */}
      <div className="w-full max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-widest md:tracking-[0.2em] font-body text-center md:text-left text-balance max-w-[280px] sm:max-w-none">
          &copy; {new Date().getFullYear()} Carina Lieventan. Todos los derechos reservados.
        </p>
        <div className="flex items-baseline gap-2 group cursor-default">
            <span className="text-white/10 text-[8px] uppercase tracking-widest font-body">Diseño y desarrollo por</span>
            <span className="text-gold/40 font-display text-xs lowercase italic group-hover:text-gold transition-colors duration-700">antigravity laboratory</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
