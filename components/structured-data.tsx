export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "B&V Soluciones",
    description:
      "Agencia B2B de tecnología especializada en IA, automatización con Python y arquitectura Cloud Run",
    url: "https://www.byvsolucioes.com",
    logo: "https://www.byvsolucioes.com/Logo.svg",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Latinoamérica",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Ventas",
      availableLanguage: ["es", "en"],
    },
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
      // "https://www.linkedin.com/company/byvsolucioes",
      // "https://twitter.com/byvsolucioes",
    ],
    areaServed: {
      "@type": "Place",
      name: "Latinoamérica",
    },
    serviceType: [
      "Desarrollo de Chatbots con IA",
      "Automatización con Python",
      "Arquitectura Cloud Run",
      "Consultoría Cloud",
      "Análisis de Datos",
    ],
  };

  const serviciosData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "Chatbots Inteligentes",
        description:
          "IA conversacional avanzada para soporte al cliente y ventas, reduciendo tiempos de respuesta en un 80%",
        provider: {
          "@type": "Organization",
          name: "B&V Soluciones",
        },
      },
      {
        "@type": "Service",
        position: 2,
        name: "Automatización Python",
        description:
          "Scripts personalizados y arquitectura backend robusta para automatizar procesos manuales y ETL de datos",
        provider: {
          "@type": "Organization",
          name: "B&V Soluciones",
        },
      },
      {
        "@type": "Service",
        position: 3,
        name: "Arquitectura Cloud Run",
        description:
          "Infraestructura serverless escalable que optimiza el consumo de recursos y garantiza disponibilidad total",
        provider: {
          "@type": "Organization",
          name: "B&V Soluciones",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviciosData) }}
      />
    </>
  );
}
