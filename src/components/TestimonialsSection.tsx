import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "María L.",
    text: "Carina me acompañó en uno de los momentos más difíciles de mi vida. Su mirada profunda y su calidez hicieron que pudiera ver lo que durante años no me animaba a mirar. Hoy siento que vivo con más libertad.",
  },
  {
    name: "Alejandro R.",
    text: "La formación con Carina fue transformadora. No solo aprendí una técnica, sino que viví un proceso personal que cambió mi manera de ver las relaciones, la familia y mi propia historia.",
  },
  {
    name: "Luciana M.",
    text: "Llegué con un síntoma crónico que nadie podía explicar. Carina me ayudó a entender qué estaba expresando mi cuerpo. El camino no fue fácil, pero fue profundo y sanador.",
  },
  {
    name: "Carolina S.",
    text: "Los talleres de Carina son espacios mágicos donde todo tiene sentido. Salí con herramientas concretas y una sensación de paz que hacía mucho no experimentaba.",
  },
  {
    name: "Fernando G.",
    text: "Nunca imaginé que mi cuerpo guardara tanta información. Con Carina descubrí patrones heredados que condicionaban mi vida. Fue un antes y un después en mi camino de sanación.",
  },
  {
    name: "Sofía R.",
    text: "Carina no solo es una excelente terapeuta, sino una maestra del autoconocimiento. Sus sesiones me ayudaron a reconectar conmigo misma.",
  },
  {
    name: "Martín D.",
    text: "Carina tiene una sensibilidad única para acompañar. Me sentí contenido y respetado en todo momento. Sus palabras llegaron justo donde necesitaba y me ayudaron a soltar lo que cargaba.",
  },
];

const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index),
    [api]
  );

  return (
    <section id="testimonios" className="section-padding bg-deep-green">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-body tracking-[0.3em] uppercase">Testimonios</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-primary-foreground">
            Voces que <span className="text-gradient-gold italic">Inspiran</span>
          </h2>
        </motion.div>

        <div className="relative px-14">
          {/* Prev / Next arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full border-gold/40 bg-gold/10 text-primary-foreground hover:bg-gold/20 hover:text-primary-foreground h-10 w-10"
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full border-gold/40 bg-gold/10 text-primary-foreground hover:bg-gold/20 hover:text-primary-foreground h-10 w-10"
            onClick={() => api?.scrollNext()}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>

          <Carousel
            opts={{ align: "center", loop: true }}
            plugins={[
              Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
            ]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="basis-full">
                  <div className="p-8 md:p-10 rounded-2xl bg-primary-foreground/5 border border-gold/30 backdrop-blur-sm">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="font-body text-primary-foreground/90 leading-relaxed italic text-base md:text-lg mb-8">
                      “{t.text}”
                    </p>
                    <p className="font-display text-lg text-gold">{t.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${
                current === i
                  ? "w-6 h-2.5 bg-gold"
                  : "w-2.5 h-2.5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Ir al testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
