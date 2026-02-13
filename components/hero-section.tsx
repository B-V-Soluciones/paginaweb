import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-40 pb-20 lg:pt-56 lg:pb-32"
    >
      {/* Subtle orange radial glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(236,103,45,0.08),_transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          Agencia B2B de Tecnología
        </span>

        {/* Heading */}
        <h1 className="mx-auto max-w-5xl font-heading text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-7xl">
          Reduzca costos y escale su operación con{" "}
          <span className="text-primary">tecnología inteligente</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
          Transformamos procesos complejos en ventajas competitivas
          mediante automatización de alto rendimiento y arquitectura cloud
          escalable.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#soluciones"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto"
          >
            Explorar Soluciones
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#casos"
            className="w-full rounded-2xl border border-border bg-background px-8 py-4 font-bold text-foreground transition-all hover:bg-secondary sm:w-auto"
          >
            Ver Casos de Éxito
          </Link>
        </div>

        {/* Trusted by - Comentado temporalmente hasta tener clientes reales */}
        {/* <div className="mt-20 border-t border-border pt-10">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Empresas que confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 lg:gap-16">
            {["TECHCORP", "INNOVASYS", "DATALAKE", "CLOUDRUNNER"].map(
              (name) => (
                <span
                  key={name}
                  className="text-2xl font-bold text-foreground"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
}
