import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  /** The theme currently shown on the page. */
  readonly current = signal<Theme>('light');

  constructor() {
    if (this.isBrowser) {
      this.current.set(this.doc.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    }
  }

  /** Switches theme with a circular reveal that grows from the clicked point. */
  toggle(e?: MouseEvent): void {
    const next: Theme = this.current() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      this.doc.documentElement.setAttribute('data-theme', next);
      this.current.set(next);
      try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    };

    const vt = (this.doc as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition;
    if (!vt || matchMedia('(prefers-reduced-motion: reduce)').matches) { apply(); return; }

    const x = e?.clientX ?? innerWidth - 40, y = e?.clientY ?? 40;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    vt.call(this.doc, apply).ready.then(() => {
      this.doc.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.4, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }
}
