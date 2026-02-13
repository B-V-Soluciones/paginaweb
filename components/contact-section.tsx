"use client";

import React from "react";
import { useState } from "react";
import { Send, CheckCircle2, Mail, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el formulario");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", company: "" });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Big CTA card */}
        <div className="relative overflow-hidden rounded-[3rem] bg-primary p-10 text-center lg:p-20">
          {/* Decorative wave */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <svg
              className="h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0,0 C30,40 70,20 100,60 L100,100 L0,100 Z"
                fill="rgba(255,255,255,0.2)"
              />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="font-heading text-4xl font-bold text-primary-foreground lg:text-6xl">
              {"¿Listo para transformar su empresa?"}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              Hable con nuestros expertos y reciba un diagnóstico
              tecnológico sin costo para su operación.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <button
                type="button"
                className="w-full rounded-2xl bg-background px-10 py-4 font-bold text-primary shadow-xl shadow-foreground/10 transition-all hover:bg-secondary sm:w-auto"
                onClick={() => {
                  const el = document.getElementById("contact-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Agendar Llamada
              </button>
              <a
                href="https://wa.me/message/SDRNTDKV43TOM1"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-foreground/60 transition-colors hover:text-primary-foreground underline"
              >
                o contáctenos vía WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Simple form below */}
        <div
          id="contact-form"
          className="mx-auto mt-16 max-w-md"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-background p-12 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Mensaje enviado
              </h3>
              <p className="text-sm text-muted-foreground">
                Nos pondremos en contacto con usted en las próximas 24 horas.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-8 shadow-sm"
            >
              <div className="mb-2">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Solicitar Consulta
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete el formulario y lo contactaremos pronto.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-sm text-muted-foreground">
                  Nombre completo
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm text-muted-foreground">
                  Correo corporativo
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@empresa.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="company"
                  className="text-sm text-muted-foreground"
                >
                  Empresa
                </Label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Mi Empresa S.A."
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="mt-2 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Al enviar, acepta nuestra política de privacidad.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
