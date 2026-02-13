"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Bot, Code2, Cloud } from "lucide-react";

const solutions = [
  {
    title: "Chatbots e IA",
    description: "IA conversacional avanzada para soporte y ventas",
    icon: Bot,
    href: "#soluciones",
  },
  {
    title: "Automatización Python",
    description: "Automatización de procesos y ETL de datos",
    icon: Code2,
    href: "#soluciones",
  },
  {
    title: "Arquitectura Cloud Run",
    description: "Infraestructura serverless escalable",
    icon: Cloud,
    href: "#soluciones",
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.svg"
            alt="B&V Soluciones"
            width={44}
            height={44}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="#inicio"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Inicio
          </Link>

          {/* Solutions Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              onBlur={() => setTimeout(() => setSolutionsOpen(false), 200)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Soluciones
              <ChevronDown
                className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {solutionsOpen && (
              <div className="absolute top-full left-1/2 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-border bg-background p-2 shadow-xl">
                {solutions.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="#casos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Casos de Éxito
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="#contacto"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
          >
            Agendar
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            <Link
              href="#inicio"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Inicio
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Soluciones
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {solutionsOpen && (
                <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                  {solutions.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      onClick={() => {
                        setMobileOpen(false);
                        setSolutionsOpen(false);
                      }}
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#casos"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Casos de Éxito
            </Link>

            <div className="mt-3 border-t border-border pt-4">
              <Link
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Agendar
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
