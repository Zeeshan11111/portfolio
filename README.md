# Zeeshan Rasool — Angular Portfolio

Personal portfolio built with **Angular 20** (standalone components, signals, zoneless change detection) and **static prerendering**, so every page ships as ready HTML for fast loading and good SEO.

## Run locally

```bash
npm install
npm start          # http://localhost:4200
```

## Build for production

```bash
npm run build
```

The finished static site is in `dist/zeeshan-portfolio/browser/`. Upload that folder to any static host (Netlify, Vercel, Firebase Hosting, GitHub Pages, cPanel).

## Edit your content

All text, skills, projects, experience and contact links live in one file:

```
src/app/data/portfolio.data.ts
```

## Project structure

```
src/app/
  app.ts                      Root component (page layout)
  data/portfolio.data.ts      All portfolio content
  core/theme.service.ts       Dark / light theme (saved in localStorage)
  shared/
    code-tokens.ts            Mini TypeScript syntax highlighter
    reveal.directive.ts       Scroll reveal animation
    count-up.directive.ts     Animated number counters
  components/
    code-rain/                Animated code background (canvas, moves upward)
    navbar/                   Sticky navbar + mobile menu
    footer/
  sections/
    hero/ about/ skills/ projects/ experience/ contact/
```
