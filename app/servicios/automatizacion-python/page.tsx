import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Automatización con Python | B&V Soluciones",
  description:
    "Automatizamos procesos repetitivos con Python: web scraping, ETL, procesamiento de datos, integraciones API y bots. Ahorra tiempo y reduce errores humanos.",
  keywords: "automatización, Python, web scraping, ETL, procesamiento datos, bot, RPA, integración API",
};

export default function AutomatizacionPythonPage() {
  const benefits = [
    "Ahorro de hasta 80% del tiempo en tareas repetitivas",
    "Eliminación de errores humanos",
    "Disponibilidad 24/7 sin supervisión",
    "ROI positivo en menos de 3 meses",
    "Escalable sin contratar más personal",
    "Reportes y alertas automáticas",
  ];

  const useCases = [
    {
      title: "Web Scraping",
      description: "Extracción automática de datos de sitios web: precios de competencia, listings, noticias, etc.",
    },
    {
      title: "Procesamiento de Datos (ETL)",
      description: "Limpieza, transformación y carga de datos entre sistemas. Excel, CSV, bases de datos.",
    },
    {
      title: "Integración de APIs",
      description: "Conecta tus sistemas: CRM, ERP, e-commerce, pagos, facturación, y más.",
    },
    {
      title: "Automatización de Reportes",
      description: "Genera y envía reportes automáticamente: ventas, inventario, finanzas, KPIs.",
    },
    {
      title: "Bots de WhatsApp/Telegram",
      description: "Automatiza comunicaciones, notificaciones, alertas y respuestas programadas.",
    },
    {
      title: "Gestión de Archivos",
      description: "Organiza, renombra, convierte y procesa archivos automáticamente.",
    },
  ];

  const techStack = [
    "Python 3.11+ con type hints",
    "Pandas, NumPy para datos",
    "BeautifulSoup, Selenium para scraping",
    "FastAPI para APIs internas",
    "Celery para tareas asíncronas",
    "Docker para portabilidad",
  ];

  const process = [
    {
      step: "1",
      title: "Análisis del proceso",
      description: "Identificamos tareas repetitivas y calculamos ROI",
    },
    {
      step: "2",
      title: "Desarrollo del bot",
      description: "Programamos la automatización con Python",
    },
    {
      step: "3",
      title: "Testing y ajustes",
      description: "Validamos funcionamiento en casos reales",
    },
    {
      step: "4",
      title: "Deploy y monitoreo",
      description: "Ponemos en producción con alertas automáticas",
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
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <Link
              href="/#soluciones"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Volver a Soluciones
            </Link>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Automatización con Python
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Elimina tareas repetitivas y ahorra cientos de horas mensuales. Desarrollamos bots y 
            scripts en Python que trabajan por ti 24/7.
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

      {/* Casos de Uso */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">¿Qué puedes automatizar?</h2>
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
      </section>

      {/* Proceso */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Nuestro Proceso</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {process.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
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
              <h2 className="mb-4 text-3xl font-bold">¿Listo para automatizar?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Cuéntanos qué proceso quieres automatizar y te enviamos una propuesta sin compromiso.
              </p>
              <Button asChild size="lg">
                <Link href="/#contacto">
                  Hablemos de tu proyecto
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
