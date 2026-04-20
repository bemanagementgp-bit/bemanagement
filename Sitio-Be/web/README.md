# Be Management — Next.js

Versión React (Next.js 15 + App Router) del sitio `Sitio-Be`.

## Requisitos
- Node.js 18.17+ o 20+

## Arranque

```powershell
cd Sitio-Be\web
npm install
npm run dev
```

Abrir http://localhost:3000

## Scripts
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm start` — servir el build
- `npm run lint` — linter

## Estructura
- `app/` — rutas (App Router)
  - `page.jsx` — Home
  - `proyectos/page.jsx` — listado con filtro `?filter=`
  - `proyectos/[slug]/page.jsx` — detalle dinámico
  - `globals.css` — CSS portado del sitio original
- `components/` — Navbar, Footer, Preloader, SiteEffects, HomeGsap
- `lib/projects.js` — datos de los 8 proyectos
- `public/assets/` — imágenes, logos y video

## Notas
- GSAP se carga solo en Home (`<HomeGsap />`) via dynamic `import()`.
- El preloader respeta `sessionStorage('be_loaded')` como en el sitio original.
- El filtro de `/proyectos` lee `?filter=` y permite `todos | redes | desarrollo-web | audiovisual | marketing-360`.
