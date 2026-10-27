import { Component, afterNextRender, inject, signal, DestroyRef } from '@angular/core';
import { Icon } from '../../shared/icon';

/** Floating back-to-top button with a ring that tracks scroll progress. */
@Component({
  selector: 'app-to-top',
  imports: [Icon],
  template: `
    <a href="#home" class="btt" [class.show]="show()" aria-label="Back to top" [attr.tabindex]="show() ? null : -1">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle class="bg" cx="24" cy="24" r="22" />
        <circle class="fg" cx="24" cy="24" r="22" [style.stroke-dashoffset]="138.2 * (1 - progress())" />
      </svg>
      <app-icon name="arrow-up" [size]="18" [stroke]="2" />
    </a>
  `,
  styles: `
    .btt {
      position: fixed; right: max(18px, env(safe-area-inset-right)); bottom: max(18px, env(safe-area-inset-bottom)); z-index: 40;
      width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; color: var(--text);
      background: var(--glass); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
      box-shadow: 0 10px 30px -12px rgba(0, 0, 0, .35); border: 1px solid var(--line);
      opacity: 0; transform: translateY(16px) scale(.9); pointer-events: none;
      transition: opacity .4s var(--ease), transform .5s var(--spring), background .3s;
    }
    .btt.show { opacity: 1; transform: none; pointer-events: auto; }
    .btt:hover { background: var(--surface); }
    .btt:hover app-icon { transform: translateY(-2px); }
    app-icon { transition: transform .3s var(--ease); }
    svg { position: absolute; inset: 3px; width: calc(100% - 6px); height: calc(100% - 6px); transform: rotate(-90deg); }
    circle { fill: none; stroke-width: 2.5; }
    .bg { stroke: var(--line); }
    .fg { stroke: var(--blue); stroke-linecap: round; stroke-dasharray: 138.2; }
  `,
})
export class ToTop {
  protected readonly show = signal(false);
  protected readonly progress = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let raf = 0;
      const update = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        this.progress.set(max > 0 ? Math.min(scrollY / max, 1) : 0);
        this.show.set(scrollY > innerHeight * 0.8);
      };
      const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
      update();
      addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => { cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); });
    });
  }
}
