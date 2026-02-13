import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.byvsoluciones.dev/'),
  title: "B&V Soluciones | IA, Automatización y Cloud para tu Negocio",
  description:
    "B&V Soluciones: Lo hacemos fácil. Transforma tu empresa con Inteligencia Artificial, automatización con Python y arquitectura Cloud Run. Reduce costos y escala sin límites.",
  keywords:
    "IA, chatbots, automatización, Python, Cloud Run, inteligencia artificial, transformación digital, serverless, arquitectura cloud, desarrollo backend, procesamiento de datos, ETL, web scraping, consultoría tecnológica, soluciones B2B, reducción de costos",
  authors: [{ name: "B&V Soluciones" }],
  creator: "B&V Soluciones",
  publisher: "B&V Soluciones",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.byvsoluciones.dev",
    siteName: "B&V Soluciones",
    title: "B&V Soluciones | IA, Automatización y Cloud para tu Negocio",
    description:
      "Transforma tu empresa con Inteligencia Artificial, automatización con Python y arquitectura Cloud Run. Reduce costos hasta 40% y escala sin límites.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "B&V Soluciones - Tecnología que impulsa resultados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B&V Soluciones | IA, Automatización y Cloud para tu Negocio",
    description:
      "Transforma tu empresa con IA, Python y Cloud Run. Reduce costos hasta 40% y escala sin límites.",
    images: ["/twitter-image.svg"],
    creator: "@byvsoluciones",
  },
  alternates: {
    canonical: "https://www.byvsoluciones.dev",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${_inter.variable} ${_spaceGrotesk.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
