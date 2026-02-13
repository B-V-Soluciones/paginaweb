"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

const industries = ["Todos", "Retail", "Finanzas", "Salud"];

const caseStudies = [
  {
    industry: "Retail",
    company: "TechRetail S.A.",
    situation:
      "Cadena de retail con más de 200 tiendas enfrentaba tiempos de respuesta de +48h en atención al cliente.",
    solution:
      "Implementamos un chatbot con IA conversacional integrado a su CRM, capaz de resolver el 70% de las consultas sin intervención humana.",
    results: [
      { icon: TrendingUp, value: "40%", label: "Reducción en costos" },
      { icon: Clock, value: "< 30s", label: "Tiempo de respuesta" },
      { icon: DollarSign, value: "$180K", label: "Ahorro anual" },
    ],
  },
  {
    industry: "Finanzas",
    company: "FinaBank Corp.",
    situation:
      "Banco digital procesaba reportes regulatorios manualmente, invirtiendo +200 horas mensuales del equipo de compliance.",
    solution:
      "Automatizamos el pipeline completo de reportes regulatorios con Python, desde la extracción de datos hasta la generación del documento final.",
    results: [
      { icon: Clock, value: "120h", label: "Horas ahorradas/mes" },
      { icon: TrendingUp, value: "99.8%", label: "Precisión en reportes" },
      { icon: DollarSign, value: "$250K", label: "Ahorro anual" },
    ],
  },
  {
    industry: "Salud",
    company: "HealthPlus Network",
    situation:
      "Red de clínicas con sistema de citas que colapsaba en horas pico, causando hasta 30 minutos de espera.",
    solution:
      "Migramos su plataforma de agendamiento a Cloud Run con escalado automático, soportando 10x más tráfico sin degradación.",
    results: [
      { icon: TrendingUp, value: "10x", label: "Capacidad de tráfico" },
      { icon: Clock, value: "99.9%", label: "Uptime garantizado" },
      { icon: DollarSign, value: "50%", label: "Menos costos infra" },
    ],
  },
];

export function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredCases =
    activeFilter === "Todos"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === activeFilter);

  return (
    <section id="casos" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Casos de Éxito
          </p>
          <h2 className="font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Resultados que hablan por sí solos
          </h2>
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
        <div className="grid grid-cols-1 gap-8">
          {filteredCases.map((study) => (
            <div
              key={study.company}
              className="overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left */}
                <div className="flex flex-col justify-between p-8 lg:col-span-3">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {study.industry}
                      </span>
                      <span className="font-heading text-sm font-semibold text-foreground">
                        {study.company}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Situación
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {study.situation}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                          Solución
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {study.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right results */}
                <div className="flex flex-col justify-center gap-6 border-t border-border bg-secondary/50 p-8 lg:col-span-2 lg:border-t-0 lg:border-l">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Resultados
                  </p>
                  {study.results.map((result) => (
                    <div
                      key={result.label}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <result.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading text-2xl font-bold text-foreground">
                          {result.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            Quiero resultados similares
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
