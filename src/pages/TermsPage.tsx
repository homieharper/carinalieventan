import LegalPageLayout from "@/components/LegalPageLayout";

const TermsPage = () => {
  return (
    <LegalPageLayout
      badge="Información Legal"
      title="Términos y Condiciones"
      subtitle="Condiciones que rigen el uso del sitio y la adquisición de formaciones."
      lastUpdated="29 de marzo de 2026"
      sections={[
        {
          title: "1. Identificación",
          content: `Estos Términos y Condiciones regulan el acceso y uso del sitio web carinalieventan.com, operado por Carina Silvana Lieventan, con domicilio en Luján, Provincia de Buenos Aires, Argentina.\n\nAl acceder al sitio o adquirir cualquiera de las formaciones ofrecidas, aceptás estos términos en su totalidad.`,
        },
        {
          title: "2. Objeto",
          content: `El sitio tiene como finalidad brindar información sobre los servicios terapéuticos y formativos de Carina Silvana Lieventan, y facilitar la adquisición de formaciones en modalidad online (masterclasses y cursos pregrabados).`,
        },
        {
          title: "3. Acceso a formaciones",
          content: [
            "Para acceder a las formaciones adquiridas, es necesario crear una cuenta a través del sistema de autenticación del sitio.",
            "El acceso es personal e intransferible. No está permitido compartir las credenciales de acceso con terceros.",
            "Una vez confirmado el pago, recibirás acceso inmediato al contenido. El acceso es de por vida para el usuario que realizó la compra.",
            "Los videos y materiales son de uso exclusivo del comprador y no pueden ser reproducidos, distribuidos ni publicados por ningún medio.",
          ],
        },
        {
          title: "4. Precios y pagos",
          content: `Los precios están expresados en pesos argentinos (ARS) e incluyen los impuestos aplicables. Los pagos se procesan a través de Mercado Pago, plataforma segura de procesamiento de pagos.\n\nCarina Silvana Lieventan se reserva el derecho de modificar los precios en cualquier momento, sin que eso afecte las compras ya realizadas.`,
        },
        {
          title: "5. Política de devoluciones",
          content: `Dada la naturaleza digital del producto (acceso inmediato al contenido grabado), no se realizan devoluciones una vez que el acceso ha sido habilitado.\n\nSi por algún motivo técnico no pudieras acceder al contenido, contactate a cslieventan@hotmail.com y resolveremos el inconveniente dentro de las 48 horas hábiles.`,
        },
        {
          title: "6. Propiedad intelectual",
          content: `Todos los contenidos de este sitio web —incluyendo textos, videos, imágenes, logotipos, diseño y materiales descargables— son propiedad exclusiva de Carina Silvana Lieventan y están protegidos por las leyes de propiedad intelectual de la República Argentina.\n\nQueda expresamente prohibida su reproducción total o parcial, distribución, venta o uso con fines comerciales sin autorización previa y por escrito.`,
        },
        {
          title: "7. Disclaimers terapéuticos",
          content: [
            "Los contenidos de las formaciones tienen carácter educativo e informativo.",
            "Las terapias holísticas y los enfoques sistémicos presentados no reemplazan la atención médica, psicológica o psiquiátrica profesional.",
            "Carina Silvana Lieventan no se responsabiliza por decisiones tomadas en base a los contenidos del sitio ni de las formaciones.",
            "Si atravesás una situación de crisis de salud mental o física, consultá a un profesional de la salud habilitado.",
          ],
        },
        {
          title: "8. Limitación de responsabilidad",
          content: `El sitio web se provee «tal como está». Carina Silvana Lieventan no garantiza la disponibilidad ininterrumpida del sitio ni la ausencia de errores.\n\nEn ningún caso la responsabilidad de Carina Silvana Lieventan por daños directos o indirectos superará el monto abonado por el usuario por la formación en cuestión.`,
        },
        {
          title: "9. Ley aplicable y jurisdicción",
          content: `Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Para cualquier controversia, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la ciudad de Luján, Provincia de Buenos Aires, con renuncia expresa a cualquier otro fuero.`,
        },
        {
          title: "10. Contacto",
          content: `Para cualquier consulta relacionada con estos Términos y Condiciones, podés escribir a cslieventan@hotmail.com o comunicarte por WhatsApp al +54 2323 318733.`,
        },
      ]}
    />
  );
};

export default TermsPage;
