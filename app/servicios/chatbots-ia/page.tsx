import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Chatbots con IA | B&V Soluciones",
  description:
    "Desarrollamos chatbots inteligentes con IA que automatizan atención al cliente, ventas y soporte 24/7. RAG, LangChain, OpenAI y modelos personalizados.",
  keywords: "chatbot, IA, inteligencia artificial, RAG, LangChain, OpenAI, atención al cliente, automatización",
};

export default function ChatbotsIAPage() {
  const benefits = [
    "Atención al cliente 24/7 sin pausas",
    "Reducción de costos operativos hasta 60%",
    "Respuestas instantáneas y precisas",
    "Integración con bases de datos propias (RAG)",
    "Análisis de sentimiento y métricas en tiempo real",
    "Escalable a miles de conversaciones simultáneas",
  ];

  const useCases = [
    {
      title: "Atención al Cliente",
      description: "Responde preguntas frecuentes, resuelve problemas y deriva casos complejos a humanos.",
    },
    {
      title: "Ventas y Calificación de Leads",
      description: "Califica leads, agenda reuniones y guía el proceso de compra automáticamente.",
    },
    {
      title: "Soporte Técnico",
      description: "Diagnóstico automático, tutoriales interactivos y resolución de problemas técnicos.",
    },
    {
      title: "Recursos Humanos",
      description: "Responde dudas de empleados sobre políticas, beneficios y procedimientos internos.",
    },
  ];

  const techStack = [
    "OpenAI GPT-4 / Claude / Gemini",
    "LangChain para orquestación",
    "Vector databases (Pinecone, Weaviate)",
    "RAG (Retrieval Augmented Generation)",
    "Integración con WhatsApp, Telegram, web",
    "Analytics y dashboard de métricas",
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
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <Link
              href="/#soluciones"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Volver a Soluciones
            </Link>
          </div>

          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Chatbots Inteligentes con IA
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Automatiza conversaciones con clientes usando inteligencia artificial avanzada. 
            Atención 24/7, respuestas precisas y escalabilidad ilimitada.
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
          <h2 className="mb-8 text-3xl font-bold">Casos de Uso</h2>
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

      {/* Tecnologías */}
      <section className="border-t border-border bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Stack Tecnológico</h2>
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
              <h2 className="mb-4 text-3xl font-bold">¿Listo para automatizar con IA?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Agenda una consulta gratuita y descubre cómo un chatbot puede transformar tu negocio.
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
