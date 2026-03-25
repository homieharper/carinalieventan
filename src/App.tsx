import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import LearningPage from "./pages/LearningPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Preloader } from "./components/Preloader";

// Import Clerk Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key. Authentication will not work.");
}

const queryClient = new QueryClient();

const App = () => {
  // If no key is present, we render the app without Clerk to avoid white screen crash
  if (!PUBLISHABLE_KEY) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Preloader />
          <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center p-6 text-center">
            <div className="max-w-md bg-card border border-gold/20 p-8 rounded-2xl shadow-2xl">
              <h2 className="font-display text-2xl text-gold mb-4 italic">Configuración de Clerk Requerida</h2>
              <p className="font-body text-muted-foreground mb-6 text-sm">
                Para que el Login y los Pagos funcionen, necesitas agregar tu <code className="text-gold">VITE_CLERK_PUBLISHABLE_KEY</code> en el archivo <code className="text-gold">.env</code>.
              </p>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest border-t border-border/30 pt-4">
                Por favor, agrega la clave y reinicia el servidor.
              </div>
            </div>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Preloader />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/formacion/:id" element={<LearningPage />} />
              <Route path="/pago/:id" element={<PaymentPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Analytics />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
