import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Arquitectura Cloud Run | B&V Soluciones",
  description:
    "Desplegamos aplicaciones serverless en Google Cloud Run. Escalado automático, pago por uso real, alta disponibilidad y cero mantenimiento de infraestructura.",
  keywords: "Cloud Run, serverless, Google Cloud, escalado automático, arquitectura cloud, microservicios",
};

export default function CloudRunPage() {
  const benefits = [
    "Pago solo por el tiempo de ejecución real",
    "Escalado automático de 0 a miles de instancias",
    "Deployment en segundos con Docker",
    "Alta disponibilidad y tolerancia a fallos",
    "Reducción de costos hasta 40% vs servidores tradicionales",
    "Cero mantenimiento de infraestructura",
  ];

  const useCases = [
    {
      title: "APIs y Microservicios",
      description: "Backend escalable para aplicaciones web y móviles con FastAPI o Node.js.",
    },
    {
      title: "Procesamiento de Datos",
      description: "ETL, análisis y transformación de datos con escalado automático según demanda.",
    },
    {
      title: "Webhooks e Integraciones",
      description: "Recibe y procesa eventos de terceros: pagos, notificaciones, sincronizaciones.",
    },
    {
      title: "Aplicaciones Web",
      description: "Frontend y backend serverless con Next.js, React, o aplicaciones full-stack.",
    },
  ];

  const techStack = [
    "Google Cloud Run (GCP)",
    "Docker & containerización",
    "FastAPI / Node.js / Next.js",
    "Cloud SQL / Firestore",
    "Cloud Storage para archivos",
    "CI/CD con GitHub Actions",
  ];

  const vsTraditional = [
    {
      aspect: "Costo",
      traditional: "Servidor 24/7: $100-500/mes",
      cloudRun: "Solo cuando se usa: $10-50/mes",
    },
    {
      aspect: "Escalado",
      traditional: "Manual, requiere planificación",
      cloudRun: "Automático e instantáneo",
    },
    {
      aspect: "Mantenimiento",
      traditional: "Actualizaciones, parches, seguridad",
      cloudRun: "Cero mantenimiento",
    },
    {
      aspect: "Disponibilidad",
      traditional: "Depende de tu configuración",
      cloudRun: "99.95% SLA garantizado",
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
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
            <Link
              href="/#soluciones"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Volver a Soluciones
            </Link>
          </div>

          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Arquitectura Serverless con Cloud Run
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Desplegamos tu aplicación en Google Cloud Run: escalado automático, alta disponibilidad 
            y pago solo por uso real. Olvídate de administrar servidores.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#contacto">
                Solicitar consulta gratuita
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

      {/* Beneficios */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Beneficios Clave</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparación */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">Cloud Run vs Servidores Tradicionales</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4 text-left font-semibold">Aspecto</th>
                  <th className="p-4 text-left font-semibold">Servidores Tradicionales</th>
                  <th className="p-4 text-left font-semibold text-primary">Cloud Run</th>
                </tr>
              </thead>
              <tbody>
                {vsTraditional.map((item, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-4 font-medium">{item.aspect}</td>
                    <td className="p-4 text-muted-foreground">{item.traditional}</td>
                    <td className="p-4 text-foreground font-medium">{item.cloudRun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Casos de Uso Ideales</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">Stack Tecnológico</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">¿Listo para migrar a la nube?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Analizamos tu aplicación actual y te mostramos cuánto puedes ahorrar con Cloud Run.
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
