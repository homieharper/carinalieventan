import { useParams, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Send, Copy, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const PaymentPage = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Curso no encontrado</h1>
          <Button variant="gold-outline" asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>);

  }

  const whatsappMessage = encodeURIComponent(`Hola Carina, acabo de realizar el pago del curso "${course.title}" por $${course.price}. Te envío el comprobante.`);
  const whatsappUrl = `https://wa.me/542323318733?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto">
          <Link to={`/formacion/${course.id}`} className="inline-flex items-center gap-2 text-gold font-body text-sm mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Volver al curso
          </Link>

          {/* Course Summary */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="font-display text-2xl text-foreground mb-2">{course.title}</h2>
            <div className="flex items-center gap-3">
              <span className="font-body text-muted-foreground line-through">${course.originalPrice}</span>
              <span className="font-display text-3xl text-gold font-bold">${course.price}</span>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-2xl text-foreground">Datos para Transferencia</h3>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-body text-muted-foreground">Banco</p>
                    <p className="font-body text-foreground">Banco Provincia de Buenos Aires</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-body text-muted-foreground">Titular</p>
                    <p className="font-body text-foreground">Carina Silvana Lieventan</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-body text-muted-foreground">CBU</p>
                    <p className="font-body text-foreground font-mono text-sm">0140034203716956223442</p>
                  </div>
                  <button
                    onClick={() => handleCopy("0140034203716956223442")}
                    className="p-2 rounded-lg hover:bg-muted transition-colors">
                    
                    {copied ? <CheckCircle className="w-5 h-5 text-gold" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-body text-muted-foreground">Alias</p>
                    <p className="font-body text-foreground font-mono">frente.ambo.oslo</p>
                  </div>
                  <button
                    onClick={() => handleCopy("CARINA.LIEVENTAN")}
                    className="p-2 rounded-lg hover:bg-muted transition-colors">
                    
                    {copied ? <CheckCircle className="w-5 h-5 text-gold" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-body text-muted-foreground">Monto a transferir</p>
                    <p className="font-display text-2xl text-gold font-bold">${course.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <h4 className="font-display text-xl text-foreground">Pasos para completar tu compra:</h4>
              <ol className="space-y-3 font-body text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-sm flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Realizá la transferencia con los datos proporcionados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-sm flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Selecciona compartir comprobante</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-sm flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Enviá el comprobante por WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-sm flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <span>Recibirás el acceso al curso en menos de 24 horas</span>
                </li>
              </ol>
            </div>

            {/* WhatsApp Button */}
            <Button variant="gold" size="lg" className="w-full gap-2" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Send className="w-5 h-5" />
                Enviar Comprobante por WhatsApp
              </a>
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Tenés dudas? Escribinos por WhatsApp y te ayudamos.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>);

};

export default PaymentPage;