import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | B&V Soluciones",
  description: "Información sobre el uso de cookies en el sitio web de B&V Soluciones",
};

export default function CookiesPage() {
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
          Política de Cookies
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-foreground/80">
          <p className="text-sm text-muted-foreground">
            Última actualización: Febrero 2026
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              ¿Qué son las Cookies?
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su
              dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar
              su experiencia, recordar sus preferencias y analizar cómo se utiliza
              nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Tipos de Cookies que Utilizamos
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  1. Cookies Esenciales
                </h3>
                <p>
                  Estas cookies son necesarias para el funcionamiento básico del
                  sitio web. Sin ellas, algunas funcionalidades no estarían
                  disponibles.
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1">
                  <li>Gestión de sesión</li>
                  <li>Preferencias de tema (modo claro/oscuro)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  2. Cookies de Análisis
                </h3>
                <p>
                  Utilizamos Vercel Analytics para entender cómo los visitantes
                  interactúan con nuestro sitio web. Esto nos ayuda a mejorar la
                  experiencia del usuario.
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1">
                  <li>Páginas visitadas</li>
                  <li>Tiempo de permanencia</li>
                  <li>Ubicación geográfica (país)</li>
                  <li>Tipo de dispositivo y navegador</li>
                </ul>
                <p className="mt-2 text-sm">
                  <strong>Nota:</strong> Vercel Analytics no utiliza cookies y
                  respeta completamente la privacidad del usuario.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Gestión de Cookies
            </h2>
            <p>
              Puede controlar y gestionar las cookies de las siguientes maneras:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Configuración del navegador:</strong> La mayoría de los
                navegadores permiten controlar las cookies a través de sus
                configuraciones de privacidad.
              </li>
              <li>
                <strong>Eliminar cookies:</strong> Puede eliminar todas las
                cookies almacenadas en su dispositivo en cualquier momento.
              </li>
            </ul>
            <p className="mt-4">
              <strong>Importante:</strong> Si deshabilita las cookies, algunas
              funcionalidades del sitio web podrían no funcionar correctamente.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Cookies de Terceros
            </h2>
            <p>
              Nuestro sitio web puede incluir contenido o servicios de terceros
              que utilizan sus propias cookies:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Vercel:</strong> Hosting y análisis del sitio web
              </li>
            </ul>
            <p className="mt-2">
              Estos terceros tienen sus propias políticas de cookies que
              recomendamos revisar.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Actualizaciones de esta Política
            </h2>
            <p>
              Podemos actualizar esta Política de Cookies ocasionalmente para
              reflejar cambios en nuestras prácticas o por otras razones
              operativas, legales o regulatorias.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Más Información
            </h2>
            <p>
              Si tiene preguntas sobre nuestro uso de cookies, consulte también:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Link href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-primary hover:underline">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Contacto
            </h2>
            <p>
              Si tiene preguntas sobre nuestra Política de Cookies, contáctenos:
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
