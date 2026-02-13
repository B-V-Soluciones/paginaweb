import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    category: "IA Conversacional",
    title: "Cómo los chatbots con IA están transformando el servicio al cliente",
    excerpt:
      "Empresas implementan chatbots con IA que comprenden contexto y responden de forma natural, reduciendo tiempos de espera y costos operativos significativamente.",
    readTime: "8 min",
    date: "Feb 2025",
    url: "https://www.forbes.com/sites/bernardmarr/2024/01/22/the-amazing-ways-chatgpt-is-transforming-customer-service/",
  },
  {
    category: "Automatización",
    title: "Python para automatización: De tareas simples a flujos empresariales",
    excerpt:
      "Guía completa sobre cómo Python se ha convertido en la herramienta preferida para automatizar procesos empresariales, desde web scraping hasta ETL de datos.",
    readTime: "12 min",
    date: "Ene 2025",
    url: "https://realpython.com/python-automation/",
  },
  {
    category: "Cloud",
    title: "Serverless: La evolución de la arquitectura cloud moderna",
    excerpt:
      "Análisis profundo de cómo las arquitecturas serverless están permitiendo a las empresas escalar sin gestionar infraestructura, reduciendo costos hasta en un 70%.",
    readTime: "10 min",
    date: "Dic 2024",
    url: "https://aws.amazon.com/serverless/",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Centro de Conocimiento
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Artículos y recursos
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Contenido técnico y estratégico para líderes que buscan innovar.
            </p>
          </div>
          <Link
            href="#blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary/60 to-primary/10" />
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime} de lectura</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
