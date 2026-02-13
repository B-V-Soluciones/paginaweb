"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al suscribirse");
      }

      setSuccess(true);
      setEmail("");
      setName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al suscribirse");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="newsletter" className="border-t border-border bg-muted/30 py-16">
        <div className="container">
          <Card className="mx-auto max-w-3xl border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-bold">¡Gracias por suscribirte!</h3>
              <p className="text-muted-foreground">
                Recibirás contenido exclusivo sobre IA, automatización y Cloud en tu inbox.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="border-t border-border bg-muted/30 py-16">
      <div className="container">
        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>

            <h2 className="mb-3 text-center text-3xl font-bold">
              Recibe contenido exclusivo
            </h2>
            <p className="mb-8 text-center text-lg text-muted-foreground">
              Tips prácticos de IA, automatización y Cloud directo en tu email. 
              Sin spam, solo valor. Cancelar cuando quieras.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Suscribirme gratis
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Al suscribirte, aceptas nuestra{" "}
                <a href="/privacidad" className="underline hover:text-primary">
                  Política de Privacidad
                </a>
                . Puedes cancelar en cualquier momento.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
