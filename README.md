# B&V Soluciones - Sitio Web Oficial

Sitio web corporativo de B&V Soluciones, agencia B2B de tecnología especializada en IA, automatización con Python y arquitectura Cloud.

## 🚀 Tecnologías

- **Framework**: Next.js 16 con App Router
- **UI**: React 19 + TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Base de datos**: Supabase
- **Email**: Resend
- **Hosting**: Vercel (recomendado)

## 🏃 Desarrollo Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/B-V-Soluciones/paginaweb.git
cd paginaweb
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Resend
RESEND_API_KEY=tu_resend_api_key

# Email de destino
CONTACT_EMAIL=tu@email.com
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Genera build de producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🗄️ Configuración de Supabase

1. Crea una tabla `contacts` con las siguientes columnas:
   - `id` (int8, primary key, identity)
   - `created_at` (timestamp, default: now())
   - `name` (text)
   - `email` (text)
   - `company` (text)

2. Configura Row Level Security (RLS):
```sql
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
ON contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

## 📧 Configuración de Resend

1. Crea una cuenta en [resend.com](https://resend.com)
2. Genera un API key desde el dashboard
3. En desarrollo, solo puedes enviar emails a tu propio email de registro
4. Para producción, verifica tu dominio en Resend

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Configura las variables de entorno en el dashboard de Vercel
3. ¡Deploy automático en cada push!

### Otras Plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js (Netlify, Railway, etc.)

## 📁 Estructura del Proyecto

```
.
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes de shadcn/ui
│   └── *.tsx             # Secciones de la página
├── lib/                   # Utilidades y configuración
│   ├── supabase.ts       # Cliente de Supabase
│   └── utils.ts          # Helpers
└── public/               # Archivos estáticos
```

## 🔐 Seguridad

- `.env.local` está en `.gitignore` - **NUNCA** subas tus credenciales
- Row Level Security habilitado en Supabase
- Validación de formularios en cliente y servidor

## 🤝 Contribuir

Este es un proyecto privado de B&V Soluciones. Para cambios:

1. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
2. Commit: `git commit -m 'Agrega nueva funcionalidad'`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📝 Licencia

© 2026 B&V Soluciones. Todos los derechos reservados.

---

**Desarrollado con ❤️ por B&V Soluciones**
