import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface LegalSection {
  title: string;
  content: string | string[];
}

interface LegalPageLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const LegalPageLayout = ({ badge, title, subtitle, lastUpdated, sections }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold font-body text-sm mb-10 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <span className="text-gold text-xs font-body tracking-[0.4em] uppercase mb-4 block">
              {badge}
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4 leading-tight">
              {title}
            </h1>
            <p className="font-body text-muted-foreground text-base mb-2">{subtitle}</p>
            <p className="font-body text-xs text-muted-foreground/60 mb-12 border-b border-border pb-8">
              Última actualización: {lastUpdated}
            </p>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.section
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20, delay: i * 0.05 }}
                >
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 text-gradient-gold">
                    {section.title}
                  </h2>
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-2">
                      {section.content.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 font-body text-muted-foreground leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  )}
                </motion.section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
