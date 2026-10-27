import { Directive, ElementRef, afterNextRender, inject, DestroyRef } from '@angular/core';

/** Fades the element up when it scrolls into view (once). */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class RevealDirective {
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
      const io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) { el.classList.add('in'); io.disconnect(); }
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
