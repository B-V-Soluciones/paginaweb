import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | B&V Soluciones",
  description: "Política de privacidad y protección de datos de B&V Soluciones",
};

export default function PrivacyPage() {
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
          Política de Privacidad
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-foreground/80">
          <p className="text-sm text-muted-foreground">
            Última actualización: Febrero 2026
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              1. Información que Recopilamos
            </h2>
            <p>
              En B&V Soluciones recopilamos la siguiente información cuando usted
              utiliza nuestro formulario de contacto:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Nombre completo</li>
              <li>Correo electrónico corporativo</li>
              <li>Nombre de la empresa</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              2. Uso de la Información
            </h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Responder a sus consultas y solicitudes de servicios</li>
              <li>Enviar información relevante sobre nuestros servicios</li>
              <li>Mejorar nuestro sitio web y servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              3. Almacenamiento y Seguridad
            </h2>
            <p>
              Sus datos se almacenan de forma segura utilizando Supabase, un
              servicio de base de datos con encriptación y medidas de seguridad
              de nivel empresarial. No compartimos, vendemos ni alquilamos su
              información personal a terceros.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              4. Cookies y Tecnologías Similares
            </h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar su
              experiencia. Para más información, consulte nuestra{" "}
              <Link href="/cookies" className="text-primary hover:underline">
                Política de Cookies
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              5. Sus Derechos
            </h2>
            <p>
              Usted tiene derecho a:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar información incorrecta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              6. Servicios de Terceros
            </h2>
            <p>
              Utilizamos los siguientes servicios de terceros:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li><strong>Supabase:</strong> Almacenamiento seguro de datos</li>
              <li><strong>Resend:</strong> Envío de notificaciones por email</li>
              <li><strong>Vercel Analytics:</strong> Análisis de uso del sitio web</li>
            </ul>
            <p className="mt-2">
              Cada uno de estos servicios tiene sus propias políticas de privacidad
              que recomendamos revisar.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              7. Contacto
            </h2>
            <p>
              Si tiene preguntas sobre nuestra Política de Privacidad o desea
              ejercer sus derechos, contáctenos:
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
