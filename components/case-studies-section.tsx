"use client";

import { useState } from "react";
import { Code2, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const industries = ["Todos", "Web Apps", "Automatización", "Integraciones"];

const practicalExamples = [
  {
    industry: "Web Apps",
    title: "Sistema de Gestión de Inventario",
    description:
      "MVP funcional desarrollado con Next.js 15, Prisma ORM y PostgreSQL para el control completo de stock y productos.",
    features: [
      "Dashboard en tiempo real con métricas de inventario",
      "Gestión de productos, categorías y movimientos",
      "Sistema de alertas por stock mínimo",
      "Reportes y analytics de entrada/salida",
    ],
    tech: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    demoUrl: null, // Agregar cuando esté desplegado
    githubUrl: null, // Opcional: si decides hacerlo público
  },
  {
    industry: "Automatización",
    title: "Bot de Scraping y Análisis de Datos",
    description:
      "Script Python que automatiza la extracción y procesamiento de datos de múltiples fuentes para análisis competitivo.",
    features: [
      "Extracción automatizada de datos web",
      "Limpieza y normalización de información",
      "Generación de reportes en Excel/PDF",
      "Ejecución programada con cron jobs",
    ],
    tech: ["Python", "BeautifulSoup", "Pandas", "Selenium", "Schedule"],
    demoUrl: null,
    githubUrl: null,
  },
  {
    industry: "Integraciones",
    title: "API de Integración Multi-Plataforma",
    description:
      "Backend escalable que conecta diferentes servicios y herramientas empresariales en un solo punto de acceso.",
    features: [
      "Endpoints REST documentados con Swagger",
      "Integración con servicios de terceros",
      "Sistema de autenticación JWT",
      "Rate limiting y caching inteligente",
    ],
    tech: ["Node.js", "Express", "Redis", "JWT", "Docker"],
    demoUrl: null,
    githubUrl: null,
  },
];

export function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredExamples =
    activeFilter === "Todos"
      ? practicalExamples
      : practicalExamples.filter((ex) => ex.industry === activeFilter);

  return (
    <section id="casos" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Portafolio
          </p>
          <h2 className="font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Ejemplos prácticos de nuestro trabajo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Proyectos reales que demuestran nuestras capacidades técnicas y enfoque en soluciones escalables.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {industries.map((industry) => (
            <button
              type="button"
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === industry
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredExamples.map((example) => (
            <div
              key={example.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Header con categoría */}
              <div className="border-b border-border bg-secondary/30 px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {example.industry}
                  </span>
                  <Code2 className="h-5 w-5 text-primary/60" />
                </div>
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 font-heading text-xl font-bold text-foreground">
                  {example.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {example.description}
                </p>

                {/* Features */}
                <div className="mb-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Características
                  </p>
                  <ul className="space-y-1.5">
                    {example.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-4 mt-auto">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tecnologías
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {example.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(example.demoUrl || example.githubUrl) && (
                  <div className="flex gap-3 border-t border-border pt-4">
                    {example.demoUrl && (
                      <Link
                        href={example.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ver Demo
                      </Link>
                    )}
                    {example.githubUrl && (
                      <Link
                        href={example.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-4 w-4" />
                        Código
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            ¿Tienes un proyecto en mente?
          </p>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            Hablemos de tu proyecto
            <Code2 className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
