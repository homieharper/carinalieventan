import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="text-center max-w-md"
      >
        <span className="text-gold text-xs font-body tracking-[0.4em] uppercase mb-6 block">
          Error 404
        </span>
        <h1 className="font-display text-7xl md:text-9xl text-foreground mb-4 leading-none">
          404
        </h1>
        <p className="font-body text-muted-foreground text-lg mb-10">
          Esta página no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold font-body text-sm hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
