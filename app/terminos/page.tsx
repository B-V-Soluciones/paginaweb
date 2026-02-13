import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | B&V Soluciones",
  description: "Términos y condiciones de uso de los servicios de B&V Soluciones",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-primary hover:underline"
        >
          ← Volver al inicio
        </Link>

        <h1 className="mb-8 font-heading text-4xl font-bold text-foreground">
          Términos y Condiciones
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-foreground/80">
          <p className="text-sm text-muted-foreground">
            Última actualización: Febrero 2026
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar el sitio web de B&V Soluciones, usted acepta
              estar sujeto a estos Términos y Condiciones, así como a todas las
              leyes y regulaciones aplicables. Si no está de acuerdo con alguno
              de estos términos, no debe utilizar este sitio.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              2. Servicios Ofrecidos
            </h2>
            <p>
              B&V Soluciones ofrece servicios de desarrollo de software,
              incluyendo pero no limitado a:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Desarrollo de chatbots con inteligencia artificial</li>
              <li>Automatización de procesos con Python</li>
              <li>Arquitectura y consultoría Cloud Run</li>
              <li>Desarrollo de aplicaciones web personalizadas</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              3. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido, diseño, código fuente y material disponible en
              este sitio web es propiedad de B&V Soluciones o está licenciado
              para su uso. Está prohibida la reproducción, distribución o
              modificación sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              4. Limitación de Responsabilidad
            </h2>
            <p>
              B&V Soluciones no será responsable por daños indirectos,
              incidentales o consecuentes que resulten del uso o la imposibilidad
              de uso de nuestros servicios o sitio web.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              5. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento. Las modificaciones entrarán en vigor inmediatamente después
              de su publicación en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              6. Contacto
            </h2>
            <p>
              Si tiene preguntas sobre estos Términos y Condiciones, puede
              contactarnos a través de:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Email: santiago.byvsoluciones@gmail.com</li>
              <li>WhatsApp: <a href="https://wa.me/message/SDRNTDKV43TOM1" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Contactar</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
