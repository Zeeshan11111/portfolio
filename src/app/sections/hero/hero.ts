import { Component, afterNextRender, inject, signal, DestroyRef } from '@angular/core';
import { CONTACTS, MARQUEE, PROFILE, STATS } from '../../data/portfolio.data';
import { CountUpDirective } from '../../shared/count-up.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { Icon, IconName } from '../../shared/icon';

/** Bento-grid hero: intro, profile, live project, stats, CTA and a tech marquee. */
@Component({
  selector: 'app-hero',
  imports: [CountUpDirective, SpotlightDirective, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly stats = STATS;
  protected readonly contacts = CONTACTS;
  protected readonly statIcons: IconName[] = ['layers', 'code', 'devices'];
  protected readonly words = ['fast', 'clean', 'scalable', 'delightful'];
  protected readonly wordIndex = signal(0);
  protected readonly prevIndex = signal(-1);
  protected readonly stackA = MARQUEE.slice(0, Math.ceil(MARQUEE.length / 2));
  protected readonly stackB = MARQUEE.slice(Math.ceil(MARQUEE.length / 2));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const id = setInterval(() => {
        this.prevIndex.set(this.wordIndex());
        this.wordIndex.update(i => (i + 1) % this.words.length);
      }, 2200);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }
}
