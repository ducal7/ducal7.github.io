# ducal7 · portfolio

A cinematic, production-grade portfolio for Aditya Singh Rathore — Data Analyst / Data Engineer.
Clean editorial design, buttery scroll motion, and real data visualization of the work — built
for craft, not gimmicks.

**Live:** https://ducal7.github.io

## Design

- **Dark cinematic editorial** in the tier of Linear / Vercel / Stripe marketing sites.
- One restrained accent (indigo → cyan); Space Grotesk display, Inter body, JetBrains Mono for data.
- A lightweight **Canvas data-skyline** hero (no WebGL), animated SVG sparklines per project, and
  count-up KPIs — motion that earns the wow through polish.
- Fully accessible: native cursor, semantic HTML, and every animation respects
  `prefers-reduced-motion`.

## Stack

- **React + TypeScript + Vite**
- **Framer Motion** — scroll reveals, count-up, magnetic buttons, scroll-progress
- Hand-rolled Canvas 2D + SVG for the data visuals (no charting/3D dependency)
- Deployed to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)

Production bundle ≈ 285 KB raw / 93 KB gzipped.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the built dist/ on :4173
```

## Structure

```
src/
  data.ts                  # projects, metrics, experience, profile (single source of truth)
  App.tsx                  # section composition
  index.css                # design system
  hooks/
    useCountUp.ts          # numeric count-up for metric strings (₹1.5 Cr, +12%, …)
  components/
    Nav.tsx                # sticky nav + scroll-progress bar
    Hero.tsx / HeroVisual.tsx   # headline + Canvas data-skyline
    MagneticButton.tsx     # cursor-magnetic CTA
    Impact.tsx             # count-up KPI strip
    Work.tsx / WorkRow.tsx / Sparkline.tsx   # selected work, expandable rows + sparklines
    Experience.tsx         # timeline
    Skills.tsx             # toolkit grid
    About.tsx              # summary + education
    Contact.tsx            # contact + footer
    Reveal.tsx             # scroll-reveal primitive
```

Content is data-driven from `src/data.ts`.
