import { Directive, ElementRef, afterNextRender, inject, input, DestroyRef } from '@angular/core';

/** Animates a number from 0 to `appCountUp` the first time it scrolls into view. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  readonly appCountUp = input.required<number>();
  readonly suffix = input('');

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const end = this.appCountUp(), suffix = this.suffix();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        el.textContent = end + suffix;
        return;
      }
      const run = () => {
        const dur = 2000;
        let start = 0;
        const step = (now: number) => {
          if (!start) start = now;
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) { io.disconnect(); run(); }
      }, { threshold: 0.6 });
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
