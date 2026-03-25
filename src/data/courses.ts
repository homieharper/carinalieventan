import course1 from "@/assets/course-1.jpg";
import course2 from "@/assets/course-2.jpg";
import course3 from "@/assets/course-3.jpg";
import course4 from "@/assets/course-4.jpg";
import course5 from "@/assets/course-5.jpg";
import course6 from "@/assets/course-6.jpg";
import heridasPortada from "@/assets/heridas-infantiles-portada.jpg";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: string;
  videoId?: string;
  description?: string;
  chapters?: { time: string; title: string }[];
}

export interface Resource {
  title: string;
  size: string;
  url?: string;
}

export interface Course {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  description: string;
  originalPrice: number;
  price: number;
  modules: string[];
  duration: string;
  lessons: Lesson[];
  resources: Resource[];
  isComingSoon?: boolean;
}

export const courses: Course[] = [
  {
    id: "heridas-infantiles-pareja",
    title: "Heridas infantiles y Elecciones de pareja | Masterclass",
    shortDesc: "Comprende, reconoce y transforma los patrones emocionales que nacen en la infancia y se proyectan en tus vínculos.",
    image: heridasPortada,
    description: `✨ MASTERCLASS PREGRABADA ✨
Las heridas de la infancia y la elección de pareja
¿Sentís que repetís historias en tus vínculos?
¿Que elegís desde un lugar que después te duele… aunque no sabés bien por qué?
Esta masterclass teórico–vivencial está diseñada para que puedas comprender, reconocer y empezar a transformar los patrones emocionales que nacen en la infancia y se proyectan en tus relaciones de pareja.
💔 ¿Qué vas a trabajar?
Las principales heridas infantiles (rechazo, abandono, humillación, traición e injusticia)
Cómo se originan y qué vivencias las activan
De qué manera influyen en tu forma de elegir y vincularte en pareja
Los comportamientos, mecanismos de defensa y “máscaras” que se generan a partir de cada herida
Primeros pasos y sugerencias para comenzar a sanarlas de forma consciente
📘 Incluye material complementario
✔ PDF teórico claro y profundo
✔ PDF interactivo para que puedas ir trabajando tus propias experiencias, emociones y patrones a medida que avanzás
✔ Ejercicios de autoindagación para llevarlo a tu vida real
🌿 Es una propuesta vivencial, no solo para entender… sino para sentir, observarte y abrir un nuevo camino en tu forma de amar.
💫 Podés verla a tu ritmo, las veces que necesites, creando tu propio espacio de transformación.
Si sentís que es momento de dejar de repetir historias y empezar a elegir desde un lugar más consciente… este espacio es para vos.`,
    originalPrice: 75000,
    price: 1,
    modules: [
        "Las 5 heridas infantiles primarias",
        "Origen y activadores de las heridas",
        "Influencia en la elección de pareja",
        "Mecanismos de defensa y 'máscaras'",
        "Pasos para la sanación consciente"
    ],
    duration: "1 hora 13 min",
    lessons: [
      { 
        id: "leccion-1", 
        title: "El Espejo de la Infancia: Por qué atraes a quien atraes", 
        duration: "1:36", 
        type: "video", 
        videoId: "2OHkcrWrwQE",
        description: "¿Te has preguntado por qué el amor a veces parece un laberinto sin salida? En este episodio inaugural, descubrimos cómo los hilos invisibles de tu infancia tejen tus relaciones actuales. Aprenderás a identificar ese \"guion\" inconsciente que te empuja a repetir patrones y darás el primer paso para transformar tu destino amoroso.",
        chapters: [
          { time: "00:01", title: "El poder de lo que no nos enseñaron sobre el amor." },
          { time: "01:05", title: "Cita de Carl Jung: El subconsciente dirigiendo tu vida." },
          { time: "01:30", title: "La invitación: Mirar tu pasado con honestidad radical." }
        ]
      },
      { 
        id: "leccion-2", 
        title: "Los 5 Rostros del Dolor: Mapa de tus heridas profundas", 
        duration: "8:01", 
        type: "video", 
        videoId: "mVzTcBdECKo",
        description: "No puedes sanar lo que no eres capaz de nombrar. Aquí exploramos las 5 heridas fundamentales que marcan nuestra psique. Comprenderás la lógica detrás de tus mecanismos de defensa y por qué tu alma ha elegido ciertas \"máscaras\" para sobrevivir al dolor.",
        chapters: [
          { time: "00:15", title: "Reencuentro consciente con tu niño interior." },
          { time: "01:30", title: "Desglose de las 5 Heridas: Rechazo, Abandono, Humillación, Traición e Injusticia." },
          { time: "04:20", title: "Cómo tus defensas infantiles se vuelven tus limitaciones adultas." }
        ]
      },
      { 
        id: "leccion-3", 
        title: "El Bucle Infinito: Por qué repetimos lo que nos duele", 
        duration: "7:58", 
        type: "video", 
        videoId: "gjvTh3pCrCk",
        description: "¿La historia de tu vida amorosa parece un disco rayado? Analizamos la paradoja de la repetición: por qué el cerebro prefiere lo \"malo conocido\" antes que la incertidumbre de lo sano. Aprende a interrumpir el ciclo y a dejar de recrear el pasado en tu presente.",
        chapters: [
          { time: "02:00", title: "La búsqueda de familiaridad vs. la búsqueda de felicidad." },
          { time: "04:10", title: "Herramientas prácticas para detener el patrón de repetición." },
          { time: "05:30", title: "Ejercicio de autoconciencia: ¿Desde dónde elijo hoy?" }
        ]
      },
      { 
        id: "leccion-4", 
        title: "El Miedo al Rechazo y el Vacío del Abandono", 
        duration: "8:53", 
        type: "video", 
        videoId: "VPo3wu5fu8s",
        description: "Profundizamos en las dos heridas más comunes que destruyen relaciones. Aprenderás por qué el \"huidizo\" escapa del compromiso y por qué el \"dependiente\" se aferra con desesperación. Una guía para encontrar el equilibrio entre la conexión y la libertad emocional.",
        chapters: [
          { time: "01:03", title: "La Herida de Rechazo: El origen del \"no ser bienvenido\"." },
          { time: "02:47", title: "La Máscara del Huidizo: El búnker emocional." },
          { time: "03:59", title: "La Herida de Abandono: El miedo a la ausencia." },
          { time: "05:30", title: "Cómo estas heridas dictan tus silencios y tus reclamos." }
        ]
      },
      { 
        id: "leccion-5", 
        title: "Traición y Humillación: Del control al autosacrificio", 
        duration: "6:31", 
        type: "video", 
        videoId: "r5PvohBCTS0",
        description: "Descubre el origen de la necesidad compulsiva de control y la tendencia a ponerse siempre en segundo lugar. Exploramos cómo las promesas rotas y la vergüenza de la infancia crean adultos que no confían o que permiten abusos por sentirte \"indignos\".",
        chapters: [
          { time: "00:22", title: "La Herida de Traición: Cuando la confianza se rompió temprano." },
          { time: "01:27", title: "Máscara del Controlador: La hipervigilancia como escudo." },
          { time: "02:35", title: "La Herida de Humillación: El peso de la vergüenza ajena." },
          { time: "03:31", title: "El rol del Sacrificio: Priorizar al otro para sentir valor." }
        ]
      },
      { 
        id: "leccion-6", 
        title: "Alquimia Emocional: Estrategias para transformar tu herida", 
        duration: "17:57", 
        type: "video", 
        videoId: "I014VCHbHi4",
        description: "¡La sesión más práctica! Aquí te damos la \"medicina\" específica para cada herida. Desde cultivar hobbies individuales para sanar el abandono, hasta aprender a bailar y reír para romper la rigidez de la injusticia. Pasamos de la teoría a la acción transformadora.",
        chapters: [
          { time: "00:45", title: "Medicina para el Rechazo: Autenticidad y voz propia." },
          { time: "02:23", title: "Medicina para el Abandono: Fomentar la independencia gozosa." },
          { time: "04:14", title: "Medicina para la Injusticia: Vulnerabilidad, juego y disfrute." },
          { time: "06:33", title: "Medicina para la Humillación: El poder de decir \"No\"." }
        ]
      },
      { 
        id: "leccion-7", 
        title: "Desmantelando Creencias: Cambia tu chip mental", 
        duration: "8:55", 
        type: "video", 
        videoId: "5SG0p0I4NNk",
        description: "Tu realidad amorosa es un reflejo de tus creencias limitantes. Identificamos los \"virus mentales\" como \"no valgo lo suficiente\" o \"amar es sufrir\". Aprenderás a reprogramar tu diálogo interno para que tus pensamientos trabajen a tu favor, no en tu contra.",
        chapters: [
          { time: "01:20", title: "El circuito: Pensamiento -> Emoción -> Conducta -> Resultado." },
          { time: "02:50", title: "Identificando tus \"verdades\" heredadas sobre el amor." },
          { time: "05:00", title: "Ejemplos reales de creencias según cada perfil de herida." }
        ]
      },
      { 
        id: "leccion-8", 
        title: "Neurobiología del Amor: El casting de tus relaciones", 
        duration: "9:26", 
        type: "video", 
        videoId: "LQdsSyz8WQo",
        description: "¿Sabías que tu cerebro hace un \"casting\" de parejas para que encajen en tu viejo guion? Entenderemos el papel de la dopamina, la amígdala y el hipocampo en tus elecciones amorosas. Una mirada científica que te liberará de la culpa y te dará el poder de elegir desde la conciencia.",
        chapters: [
          { time: "02:40", title: "Redes neuronales: Por qué el cerebro prefiere lo que ya conoce." },
          { time: "04:45", title: "El cerebro límbico y la falsa sensación de \"pasión\"." },
          { time: "06:05", title: "Escribiendo un nuevo guion: El casting consciente de actores." }
        ]
      },
      { 
        id: "leccion-9", 
        title: "El Renacer: 5 Claves para un Amor Sano y Consciente", 
        duration: "3:39", 
        type: "video", 
        videoId: "_UJ76LcE3Og",
        description: "Concluimos nuestro viaje integrando todo lo aprendido. Te comparto las 5 claves fundamentales para construir una relación basada en la esencia, no en la máscara. Un recordatorio final de que no estás \"roto/a\", sino en un proceso de expansión hacia tu versión más auténtica.",
        chapters: [
          { time: "00:10", title: "Las 5 Claves para una relación auténtica y sin caretas." },
          { time: "01:05", title: "La importancia de la Autonomía Emocional y el apoyo mutuo." },
          { time: "03:22", title: "La comunicación asertiva: Expresar deseos reales." },
          { time: "05:00", title: "Cierre: Abrazando a tu niño interior con ternura y promesa de presencia." }
        ]
      },
    ],
    resources: [
      { title: "Material Complementario | Heridas Infantiles", size: "3.9 MB", url: "/recursos/heridas-infantiles-teorico.pdf" }
    ]
  },
  {
    id: "constelaciones-familiares",
    title: "Constelaciones Familiares e Individuales",
    shortDesc: "Formación profesional para acompañar procesos sistémicos con profundidad y conciencia.",
    image: course1,
    description: "Programa completo de formación profesional para quienes desean convertirse en consteladores y acompañar procesos sistémicos. Aprenderás los principios sistémicos, los órdenes del amor, y la técnica de constelaciones grupales e individuales con supervisión de casos clínicos.",
    originalPrice: 300,
    price: 1,
    modules: ["Bases sistémicas", "Órdenes del amor", "Técnica individual", "Supervición clínica"],
    duration: "10 meses",
    lessons: [
      { id: "intro-sistemica", title: "Introducción a la Sistémica", duration: "12:45", type: "video" },
      { id: "ordenes-amor", title: "Los 3 Órdenes del Amor", duration: "25:30", type: "video" },
      { id: "pertenencia", title: "El Derecho a la Pertenencia", duration: "18:20", type: "video" },
      { id: "jerarquia", title: "Jerarquía y Equilibrio", duration: "22:15", type: "video" },
      { id: "guia-pdf", title: "Guía de Ejercicios Sistémicos", duration: "Material", type: "pdf" },
    ],
    resources: [
      { title: "Manual del Constelador PDF", size: "2.4 MB" },
      { title: "Gráfico de Genograma", size: "1.1 MB" }
    ],
    isComingSoon: true
  },
  {
    id: "biodescodificacion",
    title: "Biodescodificación",
    shortDesc: "Aprende a leer el lenguaje biológico de los síntomas y descubre los conflictos emocionales que los originan.",
    image: course2,
    description: "Curso intensivo donde aprenderás las bases biológicas de la enfermedad, la lectura de conflictos emocionales y el protocolo de acompañamiento terapéutico. Incluye material didáctico completo, casos prácticos reales y acompañamiento post-curso.",
    originalPrice: 300,
    price: 1,
    modules: ["Sentido biológico del síntoma", "Proyecto sentido", "Transgeneracional", "Protocolos de consulta"],
    duration: "8 meses",
    lessons: [
      { id: "bases-biologicas", title: "Las 5 Leyes Biológicas", duration: "35:00", type: "video" },
      { id: "conflicto-emocional", title: "Cómo identificar el Conflicto", duration: "28:10", type: "video" },
      { id: "biodecodage-tecnica", title: "Técnica de Descodificación", duration: "42:00", type: "video" },
      { id: "casos-clinicos", title: "Análisis de Casos Reales", duration: "15:45", type: "video" },
    ],
    resources: [
      { title: "Diccionario de Biodescodificación", size: "5.8 MB" },
      { title: "Protocolo de Consulta", size: "0.5 MB" }
    ],
    isComingSoon: true
  },
  {
    id: "masterclass-terapeuticas",
    title: "Masterclass Terapéuticas",
    shortDesc: "Encuentros temáticos profundos sobre aspectos específicos de la terapia y la conciencia.",
    image: course4,
    description: "Encuentros temáticos profundos que abordan aspectos específicos de la terapia, la conciencia y la práctica clínica. Formato flexible con grabaciones disponibles y material complementario para seguir profundizando.",
    originalPrice: 300,
    price: 1,
    modules: ["Duelo y pérdida", "El niño interior", "Abundancia y dinero", "Pareja y sistemas"],
    duration: "4 encuentros",
    lessons: [
      { id: "duelo-perdida", title: "Duelo y Cierre de Ciclos", duration: "1:20:00", type: "video" },
      { id: "niño-interior", title: "Sanando al Niño Interior", duration: "1:45:00", type: "video" },
      { id: "abundancia", title: "Conciencia de Abundancia", duration: "1:15:00", type: "video" },
    ],
    resources: [
      { title: "Meditación de Sanación MP3", size: "15 MB" }
    ],
    isComingSoon: true
  },
  {
    id: "talleres-conciencia",
    title: "Talleres de Conciencia y Sanación",
    shortDesc: "Espacios vivenciales con herramientas de meditación y procesos de sanación grupal.",
    image: course5,
    description: "Espacios vivenciales donde se trabaja con herramientas de conciencia, meditación y procesos de sanación grupal. Técnicas de meditación, trabajo con emociones y herramientas de sanación personal para una experiencia transformadora.",
    originalPrice: 300,
    price: 1,
    modules: ["Meditación profunda", "Gestión emocional", "Respiración consciente", "Círculo de sanación"],
    duration: "Vivencial",
    lessons: [
      { id: "meditacion-1", title: "Meditación de Arraigo", duration: "20:00", type: "video" },
      { id: "respiracion", title: "Respiración Holotrópica Intro", duration: "15:00", type: "video" },
    ],
    resources: [],
    isComingSoon: true
  },
  {
    id: "tarot-arquetipos",
    title: "Tarot Terapéutico y Arquetipos",
    shortDesc: "Descubre el poder de los arquetipos y el tarot como herramienta de autoconocimiento profundo.",
    image: course6,
    description: "Curso donde explorarás el tarot como herramienta terapéutica y de autoconocimiento. Aprenderás a leer los arquetipos, conectar con la sabiduría simbólica y utilizar estas herramientas en tu práctica terapéutica o proceso personal.",
    originalPrice: 300,
    price: 199,
    modules: ["Arcanos mayores", "Simbología ancestral", "Lectura terapéutica", "Tiradas de conciencia"],
    duration: "6 meses",
    lessons: [
      { id: "arcanos-intro", title: "El Viaje del Loco", duration: "30:00", type: "video" },
      { id: "arquetipos", title: "Los 22 Arquetipos", duration: "55:00", type: "video" },
    ],
    resources: [
      { title: "Significado de Cartas PDF", size: "10 MB" }
    ],
    isComingSoon: true
  }
];
