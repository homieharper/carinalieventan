import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";
import { courses } from "@/data/courses";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
    BookOpen, 
    Clock, 
    ArrowRight, 
    Sparkles, 
    GraduationCap,
    LayoutDashboard
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Dashboard = () => {
    const { user } = useUser();
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!user) return;
            
            const { data, error } = await supabase
                .from('enrollments')
                .select('course_id')
                .eq('user_id', user.id);

            if (data) {
                const purchasedIds = data.map(e => e.course_id);
                const list = courses.filter(c => purchasedIds.includes(c.id));
                setEnrolledCourses(list);
            }
            setLoading(false);
        };

        fetchEnrollments();
    }, [user]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-gold mb-4">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Panel del Alumno</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl text-slate-900 mb-4 lowercase italic">
                        Bienvenido, {user?.firstName || 'Buscador'}
                    </h1>
                    <p className="font-body text-slate-500 max-w-2xl leading-relaxed">
                        Aquí encontrarás todas tus formaciones activas. Continúa tu camino de sanación y expansión desde donde lo dejaste.
                    </p>
                </header>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : enrolledCourses.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrolledCourses.map((course, idx) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img 
                                        src={course.image} 
                                        alt={course.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-6">
                                        <span className="bg-gold/90 text-background text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                                            Activo
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-display text-xl text-slate-900 mb-4 group-hover:text-deep-green transition-colors">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest mb-8">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-3.5 h-3.5 text-gold" />
                                            <span>{course.lessons?.length} Lecciones</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-gold" />
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                    <Button variant="gold" className="w-full h-12 uppercase tracking-widest text-[10px]" asChild>
                                        <Link to={`/formacion/${course.id}`}>
                                            Entrar al Aula <ArrowRight className="ml-2 w-3.5 h-3.5" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center max-w-3xl mx-auto">
                        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8">
                            <Sparkles className="w-10 h-10 text-gold" />
                        </div>
                        <h2 className="font-display text-2xl text-slate-800 mb-4 italic">Aún no tienes formaciones activas</h2>
                        <p className="font-body text-slate-500 mb-10 text-sm leading-relaxed">
                            Explora nuestras propuestas y comienza hoy tu viaje hacia la sanación sistémica.
                        </p>
                        <Button variant="gold" size="lg" className="px-10 h-14 uppercase tracking-widest text-xs" asChild>
                            <Link to="/#formaciones">Ver Formaciones</Link>
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
