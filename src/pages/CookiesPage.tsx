import LegalPageLayout from "@/components/LegalPageLayout";

const CookiesPage = () => {
  return (
    <LegalPageLayout
      badge="Información Legal"
      title="Política de Cookies"
      subtitle="Qué cookies y tecnologías de almacenamiento usamos y para qué."
      lastUpdated="29 de marzo de 2026"
      sections={[
        {
          title: "1. ¿Qué son las cookies?",
          content: `Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador cuando los visitás. Permiten que el sitio recuerde información sobre tu visita, como tus preferencias o estado de sesión.\n\nAdemás de cookies estrictamente técnicas, este sitio utiliza otras tecnologías de almacenamiento local (localStorage y sessionStorage) que funcionan de manera similar pero solo dentro de tu navegador.`,
        },
        {
          title: "2. Cookies que usamos",
          content: [
            "Cookies de sesión (Clerk): cuando iniciás sesión en el sitio, Clerk almacena cookies de autenticación en tu navegador. Son estrictamente necesarias para que el acceso a las formaciones funcione. Sin ellas, no podés iniciar sesión.",
            "localStorage — progreso de cursos: guardamos tu avance en las lecciones (lecciones completadas, última lección vista) para que puedas retomar donde dejaste.",
            "localStorage — estado de acceso: para no consultar al servidor en cada carga, guardamos temporalmente si tenés acceso activo a un curso.",
            "sessionStorage — preloader: guardamos si ya viste la animación de carga inicial para no mostrártela en cada visita de la misma sesión.",
          ],
        },
        {
          title: "3. Analytics (sin cookies)",
          content: `Usamos Vercel Analytics para entender cómo se usa el sitio (qué páginas se visitan, de dónde vienen los usuarios). Esta herramienta está diseñada con privacidad como prioridad y NO usa cookies de seguimiento.\n\nLos datos que recopila son anónimos y agregados (no podemos identificarte individualmente). No compartimos esta información con redes publicitarias.`,
        },
        {
          title: "4. Lo que NO usamos",
          content: [
            "No usamos Google Analytics ni cookies de Google.",
            "No usamos Facebook Pixel ni cookies de Meta.",
            "No usamos cookies de publicidad ni retargeting.",
            "No usamos ningún servicio de seguimiento de comportamiento individual.",
          ],
        },
        {
          title: "5. ¿Necesitás aceptar las cookies?",
          content: `Las cookies de autenticación (Clerk) son estrictamente necesarias para el funcionamiento del sitio: si querés acceder a una formación, necesitás iniciar sesión, y para eso Clerk necesita guardar tu sesión.\n\nEl localStorage y sessionStorage son igualmente necesarios para que la experiencia del curso funcione correctamente.\n\nPor esta razón, el sitio no muestra un banner de consentimiento de cookies: solo usamos tecnologías estrictamente funcionales y analytics privado sin cookies.`,
        },
        {
          title: "6. Cómo eliminar o bloquear cookies",
          content: `Podés eliminar las cookies y datos de almacenamiento local en cualquier momento desde la configuración de tu navegador:\n\n— Chrome: Configuración → Privacidad y seguridad → Eliminar datos de navegación\n— Firefox: Configuración → Privacidad y seguridad → Cookies y datos del sitio\n— Safari: Configuración → Avanzado → Privacidad → Gestionar datos del sitio web\n— Edge: Configuración → Privacidad → Elegir qué borrar\n\nTené en cuenta que si eliminás las cookies de sesión de Clerk, deberás iniciar sesión nuevamente. Si eliminás los datos de localStorage, perderás el registro de tu progreso en los cursos.`,
        },
        {
          title: "7. Contacto",
          content: `Si tenés preguntas sobre cómo usamos las cookies, escribinos a cslieventan@hotmail.com.`,
        },
      ]}
    />
  );
};

export default CookiesPage;
