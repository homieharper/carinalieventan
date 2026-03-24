import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LayoutDashboard } from "lucide-react";
import logo from "@/assets/carina-logo.svg";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { courses } from "@/data/courses";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Sobre Mí", href: "/#sobre-mi" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Formaciones", href: "/#formaciones", hasDropdown: true },
  { label: "Contacto", href: "/#contacto" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.split("#")[1]);
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isHome = pathname === "/";
  const showSolid = !isHome || scrolled;

  if (!isMounted) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${showSolid ? "bg-white/80 backdrop-blur-2xl border-slate-200/50 py-3 shadow-[0_8px_32px_rgba(3,44,42,0.08)]" : "bg-transparent border-transparent py-5"}`}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
             <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 md:gap-4 group shrink-0">
                <div className="relative">
                    <div className="absolute -inset-2 bg-gold/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <img src={logo} alt="Logo" className="w-8 h-8 md:w-11 md:h-11 relative transition-transform duration-700 group-hover:rotate-[360deg]" />
                </div>
                <div className="flex flex-col">
                    <span className="font-display text-[10px] sm:text-xs md:text-xl text-gold leading-none tracking-wider md:tracking-[0.2em] uppercase">Carina Lieventan</span>
                </div>
             </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navLinks.map((link) => {
            const id = link.href.split("#")[1];
            const isActive = activeSection === id;

            if (link.label === "Inicio") {
                return (
                    <Link
                        key={link.label}
                        to="/"
                        onClick={handleLogoClick}
                        className={`text-[11px] font-body transition-all duration-500 uppercase tracking-[0.2em] relative group ${showSolid ? "text-slate-600 hover:text-gold" : "text-white/80 hover:text-white"}`}
                    >
                        {link.label}
                        <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-700 w-0 group-hover:w-full`} />
                    </Link>
                );
            }

            if (link.hasDropdown) {
              return (
                <div 
                    key={link.label} 
                    className="relative"
                    onMouseEnter={() => setCourseDropdown(true)}
                    onMouseLeave={() => setCourseDropdown(false)}
                >
                    <button className={`text-[11px] font-body transition-all duration-500 uppercase tracking-[0.2em] flex items-center gap-2 group ${isActive ? "text-gold font-medium" : showSolid ? "text-slate-600 hover:text-gold" : "text-white/80 hover:text-white"}`}>
                        {link.label}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${courseDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                        {courseDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 pt-6 w-72"
                            >
                                <div className="bg-white rounded-2xl border border-gold/20 shadow-2xl py-3 overflow-hidden">
                                     <div className="flex flex-col">
                                         {courses.map(course => (
                                             <Link 
                                                key={course.id} 
                                                to={`/curso/${course.id}`}
                                                className="px-6 py-3 text-[11px] font-body text-slate-600 hover:text-gold hover:bg-gold/5 transition-all duration-300 uppercase tracking-[0.2em]"
                                             >
                                                {course.title}
                                             </Link>
                                         ))}
                                     </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-[11px] font-body transition-all duration-500 uppercase tracking-[0.2em] relative group ${isActive ? "text-gold font-medium" : showSolid ? "text-slate-600 hover:text-gold" : "text-white/80 hover:text-white"}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-700 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </a>
            );
          })}
        </nav>

        {/* User / Dashboard Action */}
        <div className="hidden md:flex items-center gap-8">
          <SignedOut>
             <SignInButton mode="modal">
                <button className={`text-[10px] h-10 px-6 rounded-full border border-gold/30 font-body uppercase tracking-[0.2em] transition-all duration-500 hover:bg-gold hover:text-white ${showSolid ? "text-gold" : "text-white"}`}>
                    Ingresar
                </button>
             </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <UserButton 
                appearance={{
                    elements: {
                        userButtonAvatarBox: "w-9 h-9 border-2 border-gold/30 hover:border-gold transition-all duration-500",
                        userButtonTrigger: "focus:shadow-none focus:ring-2 focus:ring-gold/50"
                    }
                }}
            >
                <UserButton.MenuItems>
                   <UserButton.Action 
                        label="Mi Panel de Alumno" 
                        labelIcon={<LayoutDashboard className="w-4 h-4" />} 
                        onClick={() => navigate('/dashboard')} 
                    />
                </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

        <button
          className={`lg:hidden p-2 group ${showSolid ? "text-gold" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} className="group-hover:scale-110 transition-transform" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-background/98 backdrop-blur-3xl border-b border-gold/10"
          >
            <nav className="flex flex-col px-10 py-12 gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body text-muted-foreground hover:text-gold transition-colors uppercase tracking-[0.3em] font-light"
                >
                  {link.label}
                </a>
              ))}
              <SignedIn>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-body text-gold uppercase tracking-[0.3em]"
                  >
                        Mi Panel de Alumno
                  </Link>
              </SignedIn>
              <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-sm font-body text-gold uppercase tracking-[0.3em] text-left">
                        Ingresar
                    </button>
                  </SignInButton>
              </SignedOut>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
;
