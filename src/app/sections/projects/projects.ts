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
