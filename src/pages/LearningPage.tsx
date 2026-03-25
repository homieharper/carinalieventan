import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
/* ... rest of imports ... */
import {
    Play,
    Lock,
    ChevronRight,
    Download,
    CheckCircle2,
    FileText,
    Loader2,
    Sparkles,
    Clock,
    BookOpen,
    Check,
    Trophy,
    ChevronLeft
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";

/**
 * LearningPage - Unified course view for both sales and learning.
 * If the user hasn't purchased, it shows the "Locked" state (Sales Mode).
 * If the user has purchased, it shows the "Unlocked" state (Student Mode).
 */
const LearningPage = () => {
    const { id } = useParams();
    const { user } = useUser();
    const course = courses.find((c) => c.id === id);
    const [activeLessonId, setActiveLessonId] = useState(course?.lessons?.[0]?.id);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // Lógica para sincronizar la altura de la barra lateral con el video
    const videoRef = useRef<HTMLDivElement>(null);
    const [videoHeight, setVideoHeight] = useState<number | string>('auto');

    useEffect(() => {
        const updateHeight = () => {
            if (videoRef.current) {
                // Pequeño ajuste para compensar el padding o bordes si es necesario
                setVideoHeight(videoRef.current.offsetHeight);
            }
        };

        // Tiempo de espera inicial para asegurar que el DOM esté listo
        const timer = setTimeout(updateHeight, 150);
        window.addEventListener("resize", updateHeight);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", updateHeight);
        };
    }, [activeLessonId, hasAccess]); // Recalcular al cambiar de lección o estado de acceso

    // Load progress from localStorage
    useEffect(() => {
        if (!course) return;
        const saved = localStorage.getItem(`progress_${course.id}`);
        if (saved) {
            setCompletedLessons(JSON.parse(saved));
        }
    }, [course?.id]);

    const toggleLessonCompletion = (lessonId: string) => {
        if (!course) return;
        const newCompleted = completedLessons.includes(lessonId)
            ? completedLessons.filter(id => id !== lessonId)
            : [...completedLessons, lessonId];

        setCompletedLessons(newCompleted);
        localStorage.setItem(`progress_${course.id}`, JSON.stringify(newCompleted));

        if (!completedLessons.includes(lessonId)) {
            toast.success("¡Lección completada!", {
                description: "Tu proceso de sanación avanza con cada paso consciente. ✨",
            });
        }
    };

    const progressPercentage = course?.lessons
        ? Math.round((completedLessons.length / course.lessons.length) * 100)
        : 0;

    useEffect(() => {
        const checkAccess = async () => {
            if (!user || !course) return;

            const { data, error } = await supabase
                .from('enrollments')
                .select('*')
                .eq('user_id', user.id)
                .eq('course_id', course.id)
                .maybeSingle();

            if (data) setHasAccess(true);
        };

        checkAccess();
    }, [user, course]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!course) return null;

    const activeLesson = course.lessons?.find(l => l.id === activeLessonId) || course.lessons?.[0];
    const currentIndex = course.lessons?.findIndex(l => l.id === activeLessonId) ?? 0;
    const prevLesson = currentIndex > 0 ? course.lessons?.[currentIndex - 1] : null;
    const nextLesson = currentIndex < (course.lessons?.length ?? 0) - 1 ? course.lessons?.[currentIndex + 1] : null;

    const handlePurchase = async () => {
        setIsProcessing(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/create-preference`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: course.title,
                    quantity: 1,
                    price: course.price || 49000,
                    courseId: course.id,
                    userId: user?.id
                })
            });
            const data = await response.json();
            if (data.init_point) {
                window.location.href = data.init_point;
            } else {
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Error creating payment:", error);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col max-w-full overflow-hidden relative">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto w-full overflow-hidden">
                {/* Breadcrumbs */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start relative z-10">
              {/* Columna Izquierda: Contenido Principal */}
              <div className="space-y-6 md:space-y-8 min-w-0 w-full order-last lg:order-first">
               {/* 1. Video Player */}
               <div 
                    ref={videoRef}
                    id="video-player-container"
                    className="relative aspect-video bg-black rounded-3xl overflow-hidden group border border-slate-200 shadow-sm"
                >
                    {hasAccess ? (
                        activeLesson?.videoId && activeLesson.videoId !== 'your-youtube-id' ? (
                            <iframe 
                                src={`https://www.youtube.com/embed/${activeLesson.videoId}?modestbranding=1&rel=0&controls=1&showinfo=0`}
                                title={activeLesson.title}
                                className="w-full h-full border-0 absolute inset-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-center p-8">
                                 <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                                    <Play className="w-6 h-6 text-gold" />
                                 </div>
                                 <p className="text-white/60 font-body text-sm lowercase italic">El video estará disponible próximamente</p>
                            </div>
                        )
                    ) : (
                        <img 
                            src={course.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover transition-all duration-1000 blur-md opacity-40 grayscale" 
                        />
                    )}
                    
                    <AnimatePresence>
                        {!hasAccess && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 md:p-8 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 flex items-center justify-center mb-6">
                                    <Lock className="w-8 h-8 text-gold" />
                                </div>
                                <h2 className="font-display text-xl md:text-3xl text-white mb-6 md:mb-8 italic px-4 text-balance font-light">formación protegida</h2>
                                
                                <SignedIn>
                                    <Button 
                                        variant="gold" 
                                        size="lg" 
                                        disabled={isProcessing}
                                        className="px-6 md:px-10 h-14 uppercase tracking-wider md:tracking-widest text-xs min-w-[180px] w-full max-w-[280px]"
                                        onClick={handlePurchase}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Procesando…
                                            </>
                                        ) : (
                                            `Inscribirme Ahora ($49.000)`
                                        )}
                                    </Button>
                                </SignedIn>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button variant="gold" size="lg" className="px-6 md:px-10 h-14 uppercase tracking-wider md:tracking-widest text-xs w-full max-w-[280px]">
                                            Ingresar para Comprar
                                        </Button>
                                    </SignInButton>
                                </SignedOut>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 2. Description Area */}
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                    {!hasAccess && (
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <Sparkles className="w-32 h-32 text-gold rotate-12" />
                        </div>
                    )}

                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-deep-green/10 text-deep-green text-[10px] uppercase tracking-wide md:tracking-widest px-3 py-1 rounded-full font-bold shrink-0">
                                {hasAccess ? "Lección en curso" : "Sobre esta formación"}
                            </span>
                        </div>
                        <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl text-slate-900 leading-tight text-balance break-words overflow-wrap-anywhere">
                            {hasAccess ? activeLesson?.title : course.title}
                        </h1>
                        
                        {hasAccess && (
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4">
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wide md:tracking-[0.2em] font-body bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                    <Clock className="w-3.5 h-3.5 text-gold" />
                                    <span>Duración: {activeLesson?.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wide md:tracking-[0.2em] font-body bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                    <Play className="w-3.5 h-3.5 text-gold" />
                                    <span>Video HD</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="max-w-none space-y-12">
                        {/* Lesson Description */}
                        <div className="space-y-4">
                            <h3 className="font-display text-xl text-slate-900 italic flex items-center gap-2">
                                Sobre esta lección
                                <div className="h-px bg-gold/20 flex-grow ml-2" />
                            </h3>
                            <p className="text-slate-600 font-body text-[15px] leading-relaxed font-light whitespace-pre-wrap break-words">
                                {hasAccess 
                                    ? activeLesson?.description || `Bienvenido a esta lección sobre ${activeLesson?.title}. Aquí profundizaremos en los pilares fundamentales para tu crecimiento profesional.`
                                    : course.description
                                }
                            </p>
                        </div>

                        {/* Video Chapters Index */}
                        {hasAccess && activeLesson?.chapters && activeLesson.chapters.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="font-display text-xl text-slate-900 italic flex items-center gap-2">
                                    Índice del Video
                                    <div className="h-px bg-gold/20 flex-grow ml-2" />
                                </h3>
                                <div className="grid gap-3">
                                    {activeLesson.chapters.map((chapter, i) => (
                                        <div 
                                            key={i} 
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:border-gold/30 hover:bg-white transition-all duration-300 group cursor-default"
                                        >
                                            <div className="font-mono text-xs text-gold font-bold bg-gold/10 px-2.5 py-1 rounded-md min-w-[50px] text-center">
                                                {chapter.time}
                                            </div>
                                            <p className="text-sm text-slate-700 font-body group-hover:text-slate-900 transition-colors">
                                                {chapter.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recommendation */}
                        {hasAccess && (
                            <div className="bg-deep-green/5 rounded-3xl p-8 border border-deep-green/10">
                                <h3 className="font-display text-xl text-deep-green mb-4 italic flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-gold" />
                                    Recomendación para esta clase
                                </h3>
                                <p className="text-sm text-slate-600 font-body leading-relaxed max-w-2xl italic">
                                    Te sugiero tener a mano tu cuaderno de notas y el PDF interactivo de la formación. 
                                    Esta sesión es profundamente vivencial; si sientes que una parte resuena con tu historia actual, 
                                    tómate un momento para pausar el video y permitirte sentir esa emoción antes de continuar.
                                </p>
                            </div>
                        )}

                        {!hasAccess && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-10 border-t border-slate-100">
                                <div className="space-y-4">
                                    <h3 className="font-display text-xl text-slate-900 italic">¿Qué incluye?</h3>
                                    <ul className="space-y-3">
                                        {course.modules?.map((m, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-body">
                                                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                                                {m}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                     <h3 className="font-display text-xl text-slate-900 mb-4 italic">Detalles:</h3>
                                     <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wide md:tracking-widest font-body">
                                            <Clock className="w-4 h-4 text-gold" />
                                            <span>Duración: {course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wide md:tracking-widest font-body">
                                            <BookOpen className="w-4 h-4 text-gold" />
                                            <span>{course.lessons?.length} Lecciones</span>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        )}

                        {course.resources?.length > 0 && (
                            <div className="mt-10 pt-10 border-t border-slate-100">
                                <h3 className="font-display text-xl text-slate-900 mb-6 italic">Materiales y Recursos:</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {course.resources.map((res, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-deep-green/5 flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-deep-green" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800 lowercase">{res.title}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{res.size}</p>
                                                </div>
                                            </div>
                                            
                                            {hasAccess ? (
                                                <a 
                                                    href={res.url} 
                                                    download 
                                                    className="p-2 text-slate-400 hover:text-gold transition-colors"
                                                >
                                                    <Download className="w-5 h-5" />
                                                </a>
                                            ) : (
                                                <div className="p-2 text-slate-300">
                                                    <Lock className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
             </div>

             {/* Columna Derecha: Sidebar (Sticky) */}
             <aside className="order-first lg:order-last lg:sticky lg:top-24 space-y-4">
                <div 
                    style={{ '--video-height': videoHeight !== 'auto' ? `${videoHeight}px` : 'auto' } as any}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-auto lg:h-[var(--video-height)]"
                >
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display text-xl text-slate-900">Programa</h3>
                            {hasAccess && (
                                <div className="flex items-center gap-1.5 text-deep-green">
                                    <Trophy className="w-4 h-4" />
                                    <span className="text-[11px] font-bold uppercase tracking-tight">{progressPercentage}%</span>
                                </div>
                            )}
                        </div>

                        {hasAccess ? (
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    className="h-full bg-deep-green"
                                />
                            </div>
                        ) : (
                            <p className="text-xs text-muted-foreground uppercase tracking-wide md:tracking-widest font-body">
                                {course.lessons?.length} Lecciones
                            </p>
                        )}
                    </div>
                    
                    <div className="p-3 overflow-y-auto custom-scrollbar flex-grow">
                        {course.lessons?.map((lesson, idx) => (
                            <button
                                key={lesson.id}
                                disabled={!hasAccess && idx !== 0}
                                onClick={() => hasAccess && setActiveLessonId(lesson.id)}
                                className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 mb-2 relative group overflow-hidden
                                    ${activeLessonId === lesson.id && hasAccess 
                                        ? 'bg-deep-green text-white shadow-lg shadow-deep-green/20' 
                                        : completedLessons.includes(lesson.id)
                                            ? 'bg-[#EAE8DB] text-slate-600 border border-slate-300/50'
                                            : 'hover:bg-slate-50 text-slate-700 bg-white border border-transparent hover:border-slate-100'
                                    }
                                    ${!hasAccess && idx !== 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                            >
                                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold
                                    ${activeLessonId === lesson.id && hasAccess ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}
                                `}>
                                    {idx + 1}
                                </div>
                                <div className="flex flex-col items-start text-left min-w-0 flex-1">
                                    <span className="text-sm font-medium leading-tight mb-1 truncate w-full">
                                        {lesson.title}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] uppercase tracking-wide md:tracking-widest font-bold ${activeLessonId === lesson.id && hasAccess ? 'text-white/70' : 'text-slate-400'}`}>
                                            {lesson.duration}
                                        </span>
                                    </div>
                                </div>
                                
                                {!hasAccess && idx !== 0 && (
                                    <div className="ml-auto mt-1">
                                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                                    </div>
                                )}
                                
                                {hasAccess && (
                                     <div className="ml-auto mt-1 flex items-center gap-2">
                                        {completedLessons.includes(lesson.id) ? (
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${activeLessonId === lesson.id ? 'bg-white text-deep-green' : 'bg-emerald-500 text-white'}`}>
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                        ) : (
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ${activeLessonId === lesson.id ? 'bg-white/20 text-white' : 'bg-gold/10 text-gold'}`}>
                                                <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                                            </div>
                                        )}
                                     </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {hasAccess && (
                        <div className="p-4 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={!prevLesson}
                                onClick={() => prevLesson && setActiveLessonId(prevLesson.id)}
                                className="rounded-xl w-10 h-10 hover:bg-gold/10 text-slate-400 hover:text-gold disabled:opacity-20 flex-shrink-0"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            <Button
                                onClick={() => toggleLessonCompletion(activeLessonId || '')}
                                variant={completedLessons.includes(activeLessonId || '') ? "outline" : "gold"}
                                className={`flex-grow h-11 px-4 rounded-xl uppercase tracking-widest text-[9px] font-bold transition-all duration-300
                                    ${completedLessons.includes(activeLessonId || '') ? 'border-emerald-200 text-emerald-600 hover:bg-emerald-50' : 'bg-gold hover:bg-gold-light'}
                                `}
                            >
                                {completedLessons.includes(activeLessonId || '') ? (
                                    <span className="flex items-center justify-center gap-1.5 italic">
                                        <Check className="w-3.5 h-3.5" />
                                        Hecho
                                    </span>
                                ) : (
                                    "Completar"
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={!nextLesson}
                                onClick={() => nextLesson && setActiveLessonId(nextLesson.id)}
                                className="rounded-xl w-10 h-10 hover:bg-gold/10 text-slate-400 hover:text-gold disabled:opacity-20 flex-shrink-0"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                    
                    {!hasAccess && (
                        <div className="p-6 bg-gold/5 border-t border-gold/10">
                            <Button 
                                variant="gold" 
                                size="sm" 
                                disabled={isProcessing}
                                className="w-full h-12 uppercase tracking-wider md:tracking-widest text-[10px]"
                                onClick={handlePurchase}
                            >
                                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Desbloquear Formación"}
                            </Button>
                        </div>
                    )}
                 </div>
             </aside>
           </div>
        </main>

      <Footer />
    </div>
  );
};

export default LearningPage;
