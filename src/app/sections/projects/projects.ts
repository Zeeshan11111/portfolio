import { Component, ElementRef, afterNextRender, inject, viewChild, DestroyRef } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { Icon } from '../../shared/icon';

/** Sticky project cards: each one shrinks and dims slightly as the next slides over it. */
@Component({
  selector: 'app-projects',
  imports: [RevealDirective, Icon],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly stackRef = viewChild.required<ElementRef<HTMLElement>>('stack');
  protected readonly projects = PROJECTS;

  /** Illustrative content for the API mockup (routes mirror the shoe-store-api project). */
  protected readonly endpoints = [
    { m: 'GET', p: '/api/products', c: '#30D158' },
    { m: 'POST', p: '/api/auth/login', c: '#0A84FF' },
    { m: 'POST', p: '/api/cart', c: '#0A84FF' },
    { m: 'GET', p: '/api/orders/track', c: '#30D158' },
    { m: 'PATCH', p: '/api/orders/:id/status', c: '#FF9F0A' },
    { m: 'DELETE', p: '/api/wishlist/:id', c: '#FF453A' },
  ];
  protected readonly jsonLines = [
    { i: 0, k: '{', v: '' },
    { i: 1, k: '"id": ', v: '"stryde-01",' },
    { i: 1, k: '"name": ', v: '"Vector Runner",' },
    { i: 1, k: '"price": ', v: '129,' },
    { i: 1, k: '"sizes": ', v: '[40, 41, 42],' },
    { i: 1, k: '"inStock": ', v: 'true' },
    { i: 0, k: '}', v: '' },
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const cards = Array.from(this.stackRef().nativeElement.querySelectorAll<HTMLElement>('.card'));
      let raf = 0;
      const update = () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const a = card.getBoundingClientRect(), b = next.getBoundingClientRect();
          const t = Math.min(Math.max(1 - (b.top - a.top) / a.height, 0), 1);
          card.style.setProperty('--s', (1 - t * 0.06).toFixed(4));
          card.style.setProperty('--shade', (t * 0.18).toFixed(3));
        });
      };
      const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
      update();
      addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => { cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); });
    });
  }
}
