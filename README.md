# Portfolio · Manu Campos

Portfolio personal construido con **Astro + TypeScript + shadcn/ui**. Bilingüe (ES/EN), dark/light mode, zero-JS por defecto, optimizado para Vercel.

## Stack

- [Astro 6](https://astro.build) + TypeScript strict
- [Tailwind CSS v4](https://tailwindcss.com) (vía `@tailwindcss/vite`)
- [shadcn/ui](https://ui.shadcn.com) (preset `radix-nova`) + `lucide-react`
- React 19 (solo islands para interactividad)
- i18n nativo de Astro (`es` por defecto, `en`)
- View Transitions vía `<ClientRouter />`
- Adapter `@astrojs/vercel` (output static)
- Sitemap + canonical + hreflang

## Comandos

```sh
pnpm install      # instalar deps
pnpm dev          # dev server http://localhost:4321
pnpm build        # build producción a ./dist/
pnpm preview      # servir build local
pnpm astro check  # type-check
```

## Estructura

```
src/
├── content/              # contenido editable (markdown)
│   ├── jobs/             # experiencia laboral
│   ├── education/        # estudios
│   ├── projects/         # proyectos
│   └── uses/             # gadgets agrupados por categoría
├── content.config.ts     # schemas zod de las collections
├── i18n/
│   ├── ui.ts             # strings ES/EN
│   └── utils.ts          # helpers (getLangFromUrl, useTranslations…)
├── layouts/
│   └── BaseLayout.astro  # head, meta OG, theme script, ClientRouter
├── components/
│   ├── ui/               # primitives de shadcn/ui
│   ├── Hero/About/...    # secciones
│   └── ThemeToggle.tsx   # React island
├── pages/
│   ├── index.astro       # redirect → /es/
│   ├── es/               # rutas en español
│   └── en/               # rutas en inglés
├── assets/avatar.svg     # placeholder — reemplaza por foto real
└── styles/global.css     # Tailwind v4 + shadcn vars
```

## Editar contenido

Todo el contenido vive en `src/content/`. Edita los `.md` directamente, no hace falta tocar componentes.

**Añadir un nuevo trabajo** → crea `src/content/jobs/NN-slug.md` con frontmatter:

```yaml
---
company: "Nombre Empresa"
role_es: "Rol en español"
role_en: "Role in English"
location: "Ciudad, País"
start: "YYYY-MM"
end: "YYYY-MM"       # omite si es trabajo actual
url: "https://..."   # opcional
summary_es: "..."
summary_en: "..."
stack: ["TypeScript", "React"]
order: 1             # menor = arriba
---

- Bullet point 1
- Bullet point 2
```

Mismo patrón para `education/`, `projects/`, `uses/` (ver schemas en `src/content.config.ts`).

## Cambiar foto / avatar

1. Sustituye `src/assets/avatar.svg` por tu foto (`avatar.jpg`, `avatar.webp`, etc.).
2. Si cambias la extensión, actualiza la importación en `src/components/Hero.astro`:
   ```ts
   import avatar from '@/assets/avatar.jpg';
   ```

## Cambiar datos personales (nombre, redes, email)

- **Nombre + tagline** → editar `src/i18n/ui.ts` (claves `hero.tagline`, `about.body`) y los `<h1>` en `src/components/Hero.astro`.
- **Redes sociales** → editar URLs en `src/components/SocialLinks.astro` (GitHub, LinkedIn, X, email mailto).
- **Footer copyright** → `src/components/Footer.astro`.
- **Branding header (MC.dev)** → `src/components/Header.astro`.

## Imagen Open Graph para redes

Hay un placeholder en `public/og-image.svg`. Twitter/X y Facebook no aceptan SVG, así que **exporta una PNG 1200×630** y guárdala como `public/og-image.png`. La meta tag en `BaseLayout.astro` ya apunta a esa ruta.

Herramientas rápidas: Figma, [og-image.vercel.app](https://og-image.vercel.app), o exportar el SVG con `rsvg-convert`/Inkscape.

## Cambiar `site` URL

Antes de desplegar, edita `astro.config.mjs`:

```js
site: 'https://tudominio.com',
```

Esto afecta a sitemap, canonical, hreflang y OG URLs.

## Deploy a Vercel

1. Crea repo Git y haz push a GitHub.
2. En [vercel.com](https://vercel.com), "Add New Project" → importa el repo.
3. Vercel detecta Astro automáticamente. Click "Deploy".
4. Auto-deploy en cada push a `main`. PRs reciben preview URL.

Alternativa CLI:
```sh
pnpm dlx vercel
```

## Internacionalización

- Idioma por defecto: `es`. Idiomas: `es`, `en`.
- Strings UI en `src/i18n/ui.ts`. Añadir clave → añadirla en ambos locales.
- Contenido (jobs/projects/etc.) usa campos `*_es` y `*_en` en el frontmatter — no se duplican archivos.
- Switcher entre idiomas en el header preserva la ruta actual.

## Personalizar tema / colores

Variables en `src/styles/global.css` (bloques `:root` y `.dark`). Usa el [shadcn theme editor](https://ui.shadcn.com/themes) para generar nuevos colores y pega las vars.

## Añadir más componentes shadcn

```sh
pnpm dlx shadcn@latest add <componente>
```

p. ej. `accordion`, `dialog`, `command`. Disponibles en `@/components/ui/`.

## Verificación rápida

```sh
pnpm astro check   # 0 errores TS
pnpm build         # build limpio
pnpm preview       # smoke test local
```

Rutas a comprobar:
- `/` → redirige a `/es/`
- `/es/` y `/en/` → home con todas las secciones
- `/es/uses` y `/en/uses` → página /uses
- Toggle tema (esquina superior derecha) → persiste en localStorage
- Switcher idioma → preserva ruta entre locales
- Resize a 375px → layout mobile correcto

## Performance objetivo

Solo se hidrata `ThemeToggle` (React island con `client:load`). El resto es HTML estático puro. Lighthouse target: 100/100/100/100 en producción.

## Licencia

MIT — siéntete libre de bifurcar este portfolio para el tuyo.
