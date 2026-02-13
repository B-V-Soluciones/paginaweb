import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    category: "IA Conversacional",
    title: "Cómo los chatbots con IA reducen costos de soporte en un 40%",
    excerpt:
      "Un análisis de cómo las empresas latinoamericanas están adoptando IA conversacional para transformar su atención al cliente.",
    readTime: "8 min",
    date: "Feb 2026",
  },
  {
    category: "Automatización",
    title: "5 procesos que toda empresa debería automatizar con Python en 2026",
    excerpt:
      "Desde la generación de reportes hasta el scraping de datos de mercado, descubre los flujos que generan mayor ROI.",
    readTime: "6 min",
    date: "Ene 2026",
  },
  {
    category: "Cloud",
    title: "Cloud Run vs. servidores tradicionales: una comparación de costos real",
    excerpt:
      "Analizamos caso por caso cuánto puede ahorrar su empresa migrando a una arquitectura serverless moderna.",
    readTime: "10 min",
    date: "Ene 2026",
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
              href="#blog"
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
