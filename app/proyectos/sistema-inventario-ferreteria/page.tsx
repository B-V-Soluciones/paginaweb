import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sistema de Inventario para Ferretería | B&V Soluciones",
  description:
    "Desarrollamos un sistema de inventario completo para ferretería con gestión de stock, alertas automáticas y reportes en tiempo real. Python + FastAPI + PostgreSQL.",
  keywords: "sistema inventario, ferretería, FastAPI, Python, PostgreSQL, gestión stock",
};

export default function ProyectoInventarioPage() {
  const challenges = [
    "Control de inventario manual en Excel con errores frecuentes",
    "Imposibilidad de acceder al inventario desde múltiples sucursales",
    "Falta de alertas de stock bajo",
    "Reportes lentos y desactualizados",
    "Pérdidas por desabastecimiento o sobrestock",
  ];

  const solution = [
    {
      title: "Backend con FastAPI",
      description: "API REST robusta con validación automática y documentación interactiva",
    },
    {
      title: "Base de datos PostgreSQL",
      description: "Almacenamiento confiable con backups automáticos diarios",
    },
    {
      title: "Dashboard en tiempo real",
      description: "Interfaz web responsive para consultar y gestionar inventario",
    },
    {
      title: "Alertas automáticas",
      description: "Notificaciones vía WhatsApp cuando el stock está bajo",
    },
    {
      title: "Sistema multiusuario",
      description: "Diferentes roles: administrador, vendedor, almacenista",
    },
    {
      title: "Reportes automáticos",
      description: "Envío diario de reportes de ventas e inventario por email",
    },
  ];

  const results = [
    {
      metric: "95%",
      description: "Reducción de errores de inventario",
    },
    {
      metric: "10h/semana",
      description: "Ahorro de tiempo en gestión manual",
    },
    {
      metric: "3 meses",
      description: "ROI positivo del sistema",
    },
    {
      metric: "100%",
      description: "Visibilidad en tiempo real del stock",
    },
  ];

  const techStack = [
    "Python 3.11 con type hints",
    "FastAPI para el backend",
    "PostgreSQL como base de datos",
    "SQLAlchemy ORM",
    "React para el frontend",
    "Docker para deployment",
    "Integración WhatsApp Business API",
    "Resend para emails automáticos",
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
              Sistema de Gestión
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Sistema de Inventario para Ferretería
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Un sistema completo de gestión de inventario que eliminó errores manuales, 
            permitió acceso multiusuario y redujo costos operativos en 40%.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#contacto">
                Quiero un sistema similar
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
              Una ferretería con 3 sucursales gestionaba su inventario en hojas de Excel compartidas. 
              Esto causaba errores constantes, pérdidas por desabastecimiento y exceso de stock en 
              productos de baja rotación.
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

      {/* Resultados */}
      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container">
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
        </div>
      </section>

      {/* Stack Tecnológico */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">Tecnologías Utilizadas</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <ExternalLink className="h-4 w-4" />
              Código del Proyecto
            </h3>
            <p className="text-sm text-muted-foreground">
              Este proyecto es privado del cliente, pero puedes ver un sistema similar open-source en nuestro{" "}
              <a
                href="https://github.com/B-V-Soluciones"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">¿Quieres un sistema a medida?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Desarrollamos sistemas de gestión personalizados para tu negocio. 
                Cuéntanos tu caso y te enviamos una propuesta.
              </p>
              <Button asChild size="lg">
                <Link href="/#contacto">
                  Solicitar cotización
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
