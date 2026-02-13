import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Soluciones: [
    { label: "Automatización Python", href: "#soluciones" },
    { label: "Consultoría Cloud", href: "#soluciones" },
    { label: "Chatbots IA", href: "#soluciones" },
    { label: "Análisis de Datos", href: "#soluciones" },
  ],
  Empresa: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Ejemplos", href: "#casos" },
    { label: "Blog Técnico", href: "#blog" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/Logo.svg"
                alt="B&V Soluciones"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Liderando la transformación digital en Latinoamérica con
              ingeniería de precisión y enfoque en resultados B2B.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-6 font-bold text-foreground">{category}</h4>
              <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Trust & Security */}
          <div>
            <h4 className="mb-6 font-bold text-foreground">
              Confianza y Seguridad
            </h4>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-border/50 p-2">
                <span className="text-[10px] font-bold text-muted-foreground">
                  SSL
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-border/50 p-2">
                <span className="text-[10px] font-bold text-muted-foreground">
                  SOC2
                </span>
              </div>
            </div>
            <p className="mt-4 text-[10px] uppercase leading-tight tracking-tight text-muted-foreground">
              Garantizamos los más altos estándares de seguridad en la nube.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-10 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {`© ${new Date().getFullYear()} B&V Soluciones. Todos los derechos reservados.`}
          </p>
          <div className="flex gap-8 text-xs text-muted-foreground">
            <Link href="/terminos" className="hover:text-primary">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-primary">
              Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
