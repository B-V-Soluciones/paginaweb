import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, CheckCircle2, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Integración API CRM-eCommerce | B&V Soluciones",
  description:
    "Sincronización automática bidireccional entre CRM y tienda online. FastAPI + webhooks para actualizaciones en tiempo real de clientes, pedidos e inventario.",
  keywords: "integración API, CRM, eCommerce, sincronización, FastAPI, webhooks, automatización",
};

export default function ProyectoIntegracionAPIPage() {
  const challenges = [
    "Datos de clientes desincronizados entre CRM y tienda online",
    "Actualización manual de pedidos causaba retrasos de hasta 24 horas",
    "Información de inventario inconsistente",
    "Doble captura de datos en ambos sistemas",
    "Imposibilidad de hacer seguimiento unificado del customer journey",
  ];

  const solution = [
    {
      title: "API middleware con FastAPI",
      description: "Servidor intermedio que orquesta la comunicación entre ambos sistemas con endpoints REST documentados",
    },
    {
      title: "Sincronización bidireccional",
      description: "Actualización automática en ambos sentidos: cambios en CRM se reflejan en eCommerce y viceversa",
    },
    {
      title: "Webhooks en tiempo real",
      description: "Notificaciones instantáneas de eventos: nuevo pedido, cliente actualizado, cambio de inventario",
    },
    {
      title: "Queue system con Celery",
      description: "Procesamiento asíncrono para manejar picos de tráfico sin perder datos",
    },
    {
      title: "Mapeo inteligente de datos",
      description: "Transformación automática de estructuras de datos entre sistemas con validaciones",
    },
    {
      title: "Logs y auditoría",
      description: "Registro completo de todas las sincronizaciones para debugging y compliance",
    },
  ];

  const results = [
    {
      metric: "Real-time",
      description: "Sincronización instantánea",
    },
    {
      metric: "0",
      description: "Captura manual de datos",
    },
    {
      metric: "99.9%",
      description: "Uptime del sistema",
    },
    {
      metric: "20h/sem",
      description: "Ahorro en gestión de datos",
    },
  ];

  const features = [
    "Sincronización de clientes: perfil, contacto, historial",
    "Pedidos: creación, actualización de estados, tracking",
    "Inventario: stock en tiempo real entre sistemas",
    "Campañas de marketing: segmentación automática",
    "Reportes unificados: métricas consolidadas",
    "Webhooks personalizables por evento",
  ];

  const techStack = [
    "Python 3.11 + FastAPI",
    "Celery + Redis para queues",
    "PostgreSQL para logging",
    "Webhooks bidireccionales",
    "OAuth 2.0 para autenticación",
    "Docker + Cloud Run para hosting",
    "Monitoring con Sentry",
    "CI/CD con GitHub Actions",
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
              Integración API
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Integración API CRM-eCommerce
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Sincronización automática bidireccional entre CRM y tienda online en tiempo real. 
            Eliminamos la captura manual de datos y unificamos la información de clientes.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#contacto">
                Integrar mis sistemas
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
              Una empresa de eCommerce B2B usaba HubSpot CRM para gestión de clientes y Shopify para 
              la tienda online. Los datos vivían en silos separados, requiriendo captura manual 
              duplicada y causando inconsistencias constantes.
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

          {/* Diagrama conceptual */}
          <div className="mt-12 rounded-lg border border-border bg-muted/50 p-8">
            <h3 className="mb-6 text-center text-xl font-semibold">Arquitectura de la Integración</h3>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-background">
                  <span className="text-2xl font-bold">CRM</span>
                </div>
                <p className="text-sm text-muted-foreground">HubSpot</p>
              </div>
              <div className="flex flex-col items-center justify-center md:flex-1">
                <div className="text-4xl text-primary">⟷</div>
                <p className="mt-2 text-sm font-medium">FastAPI</p>
              </div>
              <div className="flex-1 text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-background">
                  <span className="text-2xl font-bold">Shop</span>
                </div>
                <p className="text-sm text-muted-foreground">Shopify</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Funcionalidades Implementadas</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-muted-foreground">{feature}</p>
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

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">¿Necesitas integrar sistemas?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Conectamos cualquier sistema con API: CRM, ERP, eCommerce, pagos, y más. 
                Consulta técnica gratuita.
              </p>
              <Button asChild size="lg">
                <Link href="/#contacto">
                  Solicitar consulta
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
