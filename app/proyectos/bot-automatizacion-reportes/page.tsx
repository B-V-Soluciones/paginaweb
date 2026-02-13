import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Bot de Automatización de Reportes | B&V Soluciones",
  description:
    "Bot en Python que genera y envía reportes automáticos diarios. Extrae datos de múltiples fuentes, genera PDFs y distribuye por email. Ahorro de 15h semanales.",
  keywords: "bot automatización, reportes automáticos, Python, PDF, email automation, web scraping",
};

export default function ProyectoBotReportesPage() {
  const challenges = [
    "Equipo dedicaba 3 horas diarias a generar reportes manualmente",
    "Datos recopilados de 5 sistemas diferentes (Google Sheets, CRM, base de datos, APIs)",
    "Errores humanos en cálculos y consolidación de datos",
    "Retrasos en la entrega de información a gerencia",
    "Formato inconsistente entre reportes",
  ];

  const solution = [
    {
      title: "Extracción automatizada",
      description: "El bot consulta automáticamente todas las fuentes de datos: APIs REST, Google Sheets API, bases de datos PostgreSQL",
    },
    {
      title: "Procesamiento con Pandas",
      description: "Limpieza, transformación y agregación de datos con Python. Cálculos automáticos de KPIs y métricas",
    },
    {
      title: "Generación de PDFs",
      description: "Reportes profesionales con gráficos, tablas y branding de la empresa usando ReportLab",
    },
    {
      title: "Distribución automática",
      description: "Envío programado por email a lista de destinatarios segmentada por áreas",
    },
    {
      title: "Alertas inteligentes",
      description: "Notificaciones automáticas vía WhatsApp cuando se detectan anomalías en los datos",
    },
    {
      title: "Logs y monitoreo",
      description: "Sistema de logging para rastrear ejecuciones y recibir alertas en caso de fallos",
    },
  ];

  const results = [
    {
      metric: "15h/semana",
      description: "Ahorro de tiempo del equipo",
    },
    {
      metric: "7:00 AM",
      description: "Reportes listos cada mañana",
    },
    {
      metric: "100%",
      description: "Precisión en cálculos",
    },
    {
      metric: "$2,400/mes",
      description: "Ahorro en costos operativos",
    },
  ];

  const techStack = [
    "Python 3.11 para lógica del bot",
    "Pandas para procesamiento de datos",
    "ReportLab para generación de PDFs",
    "Google Sheets API",
    "Requests para APIs REST",
    "PostgreSQL para datos transaccionales",
    "Resend API para emails",
    "GitHub Actions para scheduling",
    "Docker para portabilidad",
  ];

  const workflow = [
    {
      step: "1",
      title: "Recopilación",
      description: "Cada día a las 6:00 AM, el bot se ejecuta y consulta todas las fuentes de datos",
    },
    {
      step: "2",
      title: "Procesamiento",
      description: "Limpia, transforma y calcula métricas usando Pandas. Detecta anomalías automáticamente",
    },
    {
      step: "3",
      title: "Generación",
      description: "Crea PDFs personalizados para cada área: ventas, operaciones, finanzas, gerencia",
    },
    {
      step: "4",
      title: "Distribución",
      description: "Envía reportes por email a destinatarios correspondientes. WhatsApp para alertas urgentes",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header simple */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">B&V Soluciones</span>
          </Link>
          <Button asChild variant="outline">
            <Link href="/#contacto">Contactar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#ejemplos"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Volver a Ejemplos
          </Link>

          <div className="mb-6">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Automatización
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Bot de Automatización de Reportes
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Un bot en Python que genera y distribuye reportes diarios automáticamente, 
            ahorrando 15 horas semanales y eliminando errores humanos.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#contacto">
                Automatizar mis reportes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://wa.me/message/SDRNTDKV43TOM1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* El Desafío */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">El Desafío</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Una empresa B2B con 50 empleados necesitaba consolidar datos de ventas, operaciones y 
              finanzas de múltiples sistemas. El equipo dedicaba 3 horas diarias a recopilar datos 
              manualmente, consolidarlos en Excel y generar reportes.
            </p>
            <div className="space-y-3">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-xs text-destructive">✕</span>
                  </div>
                  <p className="text-muted-foreground">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* La Solución */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">La Solución</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {solution.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flujo de trabajo */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Flujo de Trabajo Automatizado</h2>
            <div className="space-y-6">
              {workflow.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">Resultados Medibles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((result, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="mb-2 text-4xl font-bold text-primary">{result.metric}</div>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Tecnológico */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Tecnologías Utilizadas</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg bg-background p-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <ExternalLink className="h-4 w-4" />
                ¿Hospedaje del Bot?
              </h3>
              <p className="text-sm text-muted-foreground">
                El bot se ejecuta en Google Cloud Run con GitHub Actions para scheduling. 
                Costo mensual: ~$5 USD. Una fracción del costo de hacerlo manualmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">¿Quieres automatizar tus reportes?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Analizamos tus procesos actuales y diseñamos un bot a medida. 
                Consulta inicial gratuita.
              </p>
              <Button asChild size="lg">
                <Link href="/#contacto">
                  Solicitar análisis gratuito
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="border-t border-border py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} B&V Soluciones · IA, Automatización y Cloud
          </p>
        </div>
      </footer>
    </div>
  );
}
