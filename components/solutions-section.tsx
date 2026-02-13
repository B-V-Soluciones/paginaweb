import { Bot, Code2, Cloud, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description:
      "IA conversacional avanzada para soporte al cliente y ventas, reduciendo tiempos de respuesta en un 80%.",
    url: "/servicios/chatbots-ia",
  },
  {
    icon: Code2,
    title: "Automatización Python",
    description:
      "Scripts personalizados y arquitectura backend robusta para automatizar procesos manuales y ETL de datos.",
    url: "/servicios/automatizacion-python",
  },
  {
    icon: Cloud,
    title: "Arquitectura Cloud Run",
    description:
      "Infraestructura serverless escalable que optimiza el consumo de recursos y garantiza disponibilidad total.",
    url: "/servicios/cloud-run",
  },
];

export function SolutionsSection() {
  return (
    <section id="soluciones" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold text-foreground lg:text-5xl">
              Ingeniería de clase mundial para desafíos modernos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Soluciones modulares diseñadas para integrarse perfectamente
              con su flujo de trabajo actual.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-border/50 bg-background/70 p-8 backdrop-blur-sm transition-all hover:border-primary/50"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 font-heading text-2xl font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <Link
                href={service.url}
                className="inline-flex items-center gap-1 font-bold text-primary transition-colors hover:text-primary/80"
              >
                Saber más
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
