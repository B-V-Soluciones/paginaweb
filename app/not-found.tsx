import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 grande */}
        <h1 className="mb-4 text-9xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          404
        </h1>

        {/* Mensaje */}
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Página no encontrada
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Lo sentimos, no pudimos encontrar la página que buscas. Puede que haya sido movida o ya no exista.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#contacto">
              <Search className="mr-2 h-4 w-4" />
              Contáctanos
            </Link>
          </Button>
        </div>

        {/* Links útiles */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-4 text-sm font-medium text-foreground">Enlaces útiles:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/#soluciones"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Soluciones
            </Link>
            <Link
              href="/#ejemplos"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Ejemplos
            </Link>
            <Link
              href="/#blog"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/privacidad"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacidad
            </Link>
          </div>
        </div>

        {/* Branding sutil */}
        <div className="mt-8">
          <p className="text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              B&V Soluciones
            </Link>
            {" · "}IA, Automatización y Cloud
          </p>
        </div>
      </div>
    </div>
  );
}
