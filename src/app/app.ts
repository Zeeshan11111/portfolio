import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ToTop } from './components/to-top/to-top';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Projects } from './sections/projects/projects';
import { Experience } from './sections/experience/experience';
import { Contact } from './sections/contact/contact';
import { Services } from './sections/services/services';
import { Process } from './sections/process/process';

/** Fine-tunes where a section lands when jumping to it; its own top padding clears the floating nav. */
const NAV_OFFSET = -10;

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, ToTop, Hero, Services, Projects, Process, About, Skills, Experience, Contact],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-services />
      <app-projects />
      <app-process />
      <app-about />
      <app-skills />
      <app-experience />
      <app-contact />
    </main>
    <app-footer />
    <app-to-top />
  `,
})
export class App {
  constructor() {
    const destroyRef = inject(DestroyRef);

    // Inertia-smoothed wheel scrolling (Lenis) plus eased jumps for in-page links.
    afterNextRender(async () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { default: Lenis } = await import('lenis');
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });

      let raf = 0;
      const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);

      const onClick = (e: MouseEvent) => {
        const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const hash = a?.getAttribute('href');
        if (!hash || hash === '#') return;
        const target = hash === '#home' ? 0 : document.querySelector<HTMLElement>(hash);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4) });
      };
      document.addEventListener('click', onClick);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(raf);
        document.removeEventListener('click', onClick);
        lenis.destroy();
      });
    });
  }
}
