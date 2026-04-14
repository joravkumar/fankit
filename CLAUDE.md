# FanKit

Landing page for [fankit.in](https://fankit.in) — a done-for-you merch platform for Indian creators.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (globals.css), no Tailwind
- **Fonts:** Plus Jakarta Sans (display), DM Sans (body) via next/font
- **OG Images:** @vercel/og (static preview.png used currently)
- **Package Manager:** Bun (bun.lockb)

## Project Structure

```
app/
  layout.tsx       — Root layout, metadata, SEO, fonts
  page.tsx         — Single-page landing (all sections)
  globals.css      — All styles (CSS variables, sections, responsive)
  not-found.tsx    — 404 page
  robots.ts        — robots.txt generation
  sitemap.ts       — sitemap.xml generation
public/
  preview.png      — OG image for social sharing
screenshot.js      — Puppeteer script for OG screenshots
```

## Commands

```bash
bun dev            # Start dev server
bun run build      # Production build (next build)
bun start          # Production server
```

## Architecture

Single-page app with scroll-based sections. All content is in `page.tsx` as a client component (`'use client'`). Animations use IntersectionObserver with `.reveal` / `.visible` CSS classes. FAQ accordion uses vanilla JS event listeners in useEffect.

## CSS Variables

```
--cream: #FFF8F3       --coral: #FF4D6D
--charcoal: #2D2D2D    --green: #1A3C2E
```

## Key Conventions

- No component library or UI framework — everything is hand-rolled CSS
- Section labels use `text-transform: uppercase` in CSS, written lowercase in HTML
- Scroll animations: add `.reveal` class, IntersectionObserver adds `.visible`
- Contact: hello@fankit.in (no WhatsApp)
- Brand: "FanKit" (capital F, capital K)
- Deployed on Vercel at fankit.in
