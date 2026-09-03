# Artimex Bakery Premium — Astro + React

Premium storefront concept for Artimex Artisan Mexican Bakery.

## Stack
- Astro
- React (interactive B2C/B2B product experience)
- Vanilla CSS
- Static build ready for Vercel / Netlify / Cloudflare Pages

## Run locally
```bash
npm install
npm run dev
```
Then open the local URL shown by Astro (usually `http://localhost:4321`).

## Production build
```bash
npm run build
npm run preview
```

## Optional environment
Set `PUBLIC_SITE_URL` to the final public origin (for example `https://www.example.com`) to enable absolute canonical and Open Graph URLs. The site builds without it for local development.

## Deploy to Vercel
1. Push this folder to GitHub, or import the folder in Vercel.
2. Framework preset: **Astro**.
3. Build command: `npm run build`.
4. Output directory: `dist`.

## Main files
- `src/pages/index.astro` — full landing/storefront page
- `src/pages/es/index.astro` — Spanish route using the shared storefront
- `src/components/HomePage.astro` — shared bilingual editorial page
- `src/components/ShopExperience.jsx` — B2C/B2B interactive catalog mockup
- `src/data/products.js` — backend-ready catalog data boundary
- `src/styles/global.css` — full premium visual system
- `public/images/` — bundled bakery visuals

## Brand archive
The assets in `public/images/original/` were recovered from the existing official Artimex website and are served in optimized WebP format where possible. Original source files are retained for brand fidelity.

## Next production step
The shopping buttons are intentionally front-end demo interactions. Connect them to your preferred commerce backend (WooCommerce REST API, Shopify Storefront API, Medusa, Stripe Checkout, etc.) when you are ready.
