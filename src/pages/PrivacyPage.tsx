import LegalPageLayout from "@/components/LegalPageLayout";

const PrivacyPage = () => {
  return (
    <LegalPageLayout
      badge="Información Legal"
      title="Política de Privacidad"
      subtitle="Cómo recopilamos, usamos y protegemos tu información personal."
      lastUpdated="29 de marzo de 2026"
      sections={[
        {
          title: "1. Responsable del tratamiento",
          content: `Carina Silvana Lieventan, con domicilio en Luján, Provincia de Buenos Aires, Argentina, es la responsable del tratamiento de los datos personales que se recopilan a través del sitio web carinalieventan.com.\n\nPodés contactarte por cualquier consulta relacionada con esta política escribiendo a cslieventan@hotmail.com o por WhatsApp al +54 2323 318733.`,
        },
        {
          title: "2. Datos que recopilamos",
          content: [
            "Datos de contacto: nombre y dirección de correo electrónico que ingresás en el formulario de contacto.",
            "Datos de cuenta: nombre de usuario, dirección de email y datos de sesión cuando te registrás a través de Clerk para acceder a formaciones.",
            "Datos de pago: las transacciones son procesadas por Mercado Pago. No almacenamos datos de tarjetas de crédito ni débito.",
            "Datos de uso: información técnica como páginas visitadas e interacciones, recopilada de forma anónima y agregada por Vercel Analytics.",
            "Datos de progreso: el avance en los cursos se guarda localmente en tu navegador (localStorage) y en nuestra base de datos para mostrarte tu progreso.",
          ],
        },
        {
          title: "3. Finalidad del tratamiento",
          content: [
            "Gestionar tu acceso a las formaciones adquiridas.",
            "Responderte ante consultas enviadas a través del formulario de contacto.",
            "Procesar pagos y confirmar inscripciones.",
            "Mejorar el funcionamiento y la experiencia del sitio web.",
            "Cumplir con obligaciones legales y fiscales aplicables.",
          ],
        },
        {
          title: "4. Base legal",
          content: `El tratamiento de tus datos se basa en tu consentimiento (al registrarte o completar el formulario de contacto), en la ejecución del contrato de compra de una formación, y en el interés legítimo de mejorar el servicio.\n\nEste sitio cumple con la Ley 25.326 de Protección de los Datos Personales de la República Argentina y su decreto reglamentario 1558/2001.`,
        },
        {
          title: "5. Compartir datos con terceros",
          content: [
            "Clerk (autenticación): procesa los datos de registro y sesión. Política de privacidad disponible en clerk.com.",
            "Mercado Pago (pagos): procesa datos de pago. Política disponible en mercadopago.com.ar.",
            "Supabase (base de datos): almacena datos de inscripción de forma segura en servidores con encriptación.",
            "Vercel (hosting y analytics): recibe datos de visitas de forma anónima. Política disponible en vercel.com.",
            "No vendemos, cedemos ni alquilamos tus datos personales a terceros con fines comerciales.",
          ],
        },
        {
          title: "6. Plazo de conservación",
          content: `Los datos de cuenta y de inscripción se conservan mientras mantengas tu cuenta activa. Podés solicitar la eliminación de tus datos en cualquier momento escribiendo a cslieventan@hotmail.com.\n\nLos datos de contacto se conservan por el tiempo necesario para gestionar tu consulta y hasta 2 años después.`,
        },
        {
          title: "7. Tus derechos",
          content: [
            "Acceso: podés solicitar saber qué datos tuyos tratamos.",
            "Rectificación: podés pedir que corrijamos datos inexactos.",
            "Supresión: podés pedir que eliminemos tus datos personales.",
            "Oposición: podés oponerte al tratamiento de tus datos en determinadas circunstancias.",
            "Para ejercer estos derechos, escribí a cslieventan@hotmail.com indicando tu nombre completo y la solicitud específica. Respondemos dentro de los 30 días hábiles.",
            "Tenés derecho a presentar una reclamación ante la Agencia de Acceso a la Información Pública (AAIP) si considerás que tus derechos han sido vulnerados.",
          ],
        },
        {
          title: "8. Seguridad",
          content: `Implementamos medidas técnicas y organizativas para proteger tus datos contra accesos no autorizados, pérdida o alteración. Las comunicaciones entre tu navegador y el servidor están cifradas mediante HTTPS/TLS.\n\nSi bien adoptamos todas las precauciones razonables, ningún sistema de transmisión por internet es completamente seguro.`,
        },
        {
          title: "9. Cambios a esta política",
          content: `Podemos actualizar esta Política de Privacidad periódicamente. La fecha de última actualización figura al inicio del documento. Te recomendamos revisarla con regularidad. El uso continuado del sitio tras las modificaciones implica la aceptación de la versión actualizada.`,
        },
      ]}
    />
  );
};

export default PrivacyPage;
