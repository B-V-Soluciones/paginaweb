import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'B&V Soluciones - IA, Automatización y Cloud',
    short_name: 'B&V Soluciones',
    description: 'Transforma tu empresa con Inteligencia Artificial, automatización con Python y arquitectura Cloud Run',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ec672d',
    icons: [
      {
        src: '/Logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
