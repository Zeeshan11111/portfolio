import { Component, ElementRef, afterNextRender, inject, viewChild, DestroyRef } from '@angular/core';
import { ABOUT, FACTS, PROFILE, STATEMENT } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, SpotlightDirective, Icon],
  template: `
    <section id="about">
      <div class="wrap layout">
        <div class="side">
          <div appReveal>
            <span class="eyebrow">About me</span>
            <h2 class="h-sec">A developer who sweats the details.</h2>
            <div class="sig">
              <span class="mark">{{ initials }}</span>
              <div><b>{{ name }}</b><span>{{ role }}</span></div>
            </div>
            @if (cv) {
              <a [href]="cv" [attr.download]="cv" class="btn btn-ghost cv">
                <app-icon name="file" [size]="17" [stroke]="1.9" /> Download my CV
                <app-icon class="dl" name="download" [size]="15" [stroke]="2.2" />
              </a>
            }
          </div>
        </div>

        <div class="main">
          <!-- Words light up as you scroll -->
          <p class="statement" #st [style.--n]="words.length">
            @for (w of words; track $index) {
              <span class="w" [class.hl]="w.hl" [style.--i]="$index">{{ w.t }} </span>
            }
          </p>

          <div class="paras" appReveal>
            @for (p of paragraphs; track $index) { <p [innerHTML]="p"></p> }
          </div>

          <div class="facts">
            @for (f of facts; track f.title; let i = $index) {
              <div class="tile fact lift" appReveal appSpot [style.--d]="(i % 2) * 0.1 + 's'">
                <span class="ic"><app-icon [name]="f.icon" [size]="22" [stroke]="1.8" /></span>
                <h3>{{ f.title }}</h3>
                <p>{{ f.text }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
    .side { position: sticky; top: 120px; }
    .sig { display: flex; align-items: center; gap: 14px; margin-top: 32px; }
    .mark {
      width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center;
      background: var(--text); color: var(--bg); font-weight: 700; font-size: 15px;
    }
    .sig b { display: block; font-size: 16px; }
    .sig div span { color: var(--muted); font-size: 14px; }
    .cv { margin-top: 28px; }
    .cv .dl { color: var(--link); }
    .cv:hover app-icon.dl { transform: translateY(2px); }

    .statement { font-size: clamp(26px, 3.2vw, 40px); line-height: 1.2; font-weight: 600; letter-spacing: -.02em; }
    .w { opacity: clamp(.16, calc(var(--p, 0) * (var(--n) + 5) - var(--i)), 1); transition: opacity .15s linear; }
    .w.hl { color: var(--link); }

    .paras { margin: 40px 0 48px; }
    .paras p { color: var(--muted); font-size: 17px; line-height: 1.65; margin-bottom: 16px; }
    .paras p ::ng-deep strong { color: var(--text); font-weight: 600; }

    .facts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .fact { padding: 28px; }
    .fact h3 { font-size: 19px; font-weight: 600; margin: 20px 0 6px; letter-spacing: -.015em; }
    .fact p { color: var(--muted); font-size: 15px; line-height: 1.5; }

    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; gap: 32px; }
      .side { position: static; }
    }
    @media (max-width: 560px) { .facts { grid-template-columns: 1fr; } }
  `,
})
export class About {
  private readonly st = viewChild.required<ElementRef<HTMLElement>>('st');
  protected readonly paragraphs = ABOUT;
  protected readonly facts = FACTS;
  protected readonly name = PROFILE.name;
  protected readonly initials = PROFILE.initials;
  protected readonly role = PROFILE.role;
  protected readonly cv = PROFILE.cv;
  protected readonly words = STATEMENT.split(' ').map(t =>
    t.includes('*') ? { t: t.replace(/\*/g, ''), hl: true } : { t, hl: false });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.st().nativeElement;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '1'); return; }
      let raf = 0;
      const update = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const p = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.4);
          el.style.setProperty('--p', Math.min(Math.max(p, 0), 1).toFixed(3));
        });
      };
      update();
      addEventListener('scroll', update, { passive: true });
      destroyRef.onDestroy(() => { cancelAnimationFrame(raf); removeEventListener('scroll', update); });
    });
  }
}
