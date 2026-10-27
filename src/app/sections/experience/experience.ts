import { Component, ElementRef, afterNextRender, inject, viewChild, DestroyRef } from '@angular/core';
import { EXPERIENCE } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { Icon } from '../../shared/icon';

/** Timeline whose line fills as you scroll; each node lights up when reached. */
@Component({
  selector: 'app-experience',
  imports: [RevealDirective, SpotlightDirective, Icon],
  template: `
    <section id="experience">
      <div class="wrap">
        <div class="sec-head" appReveal>
          <span class="eyebrow">Experience</span>
          <h2 class="h-sec">Where I've worked.</h2>
        </div>

        <div class="tl" #tl>
          <div class="rail" aria-hidden="true"><i #fill></i></div>
          @for (job of jobs; track job.role; let i = $index) {
            <div class="item">
              <span class="node" aria-hidden="true"><app-icon name="briefcase" [size]="16" [stroke]="2" /></span>
              <article class="tile job lift" appReveal appSpot>
                <div class="j-top">
                  <div>
                    <h3>{{ job.role }}</h3>
                    <p class="co">{{ job.company }}</p>
                  </div>
                  <span class="period" [class.now]="i === 0">@if (i === 0) {<i></i>}{{ job.period }}</span>
                </div>
                <p class="sum">{{ job.summary }}</p>
                <ul>
                  @for (pt of job.points; track pt) {
                    <li><app-icon name="check" [size]="15" [stroke]="2.4" />{{ pt }}</li>
                  }
                </ul>
              </article>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .tl { position: relative; padding-left: 64px; display: flex; flex-direction: column; gap: 24px; max-width: 900px; }
    .rail { position: absolute; left: 21px; top: 10px; bottom: 10px; width: 2px; border-radius: 2px; background: var(--surface-3); overflow: hidden; }
    .rail i { position: absolute; inset: 0; background: linear-gradient(#0071E3, #8E5CFF); transform-origin: 50% 0; transform: scaleY(var(--p, 0)); }
    .item { position: relative; }
    .node {
      position: absolute; left: -64px; top: 28px; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center;
      background: var(--surface); border: 2px solid var(--surface-3); color: var(--faint);
      transition: background .5s, border-color .5s, color .5s, transform .5s var(--spring);
    }
    .item.lit .node { background: var(--blue); border-color: var(--blue); color: #fff; transform: scale(1.08); box-shadow: 0 0 0 6px var(--soft-blue); }

    .job { padding: clamp(26px, 3.5vw, 40px); }
    .j-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
    h3 { font-size: clamp(22px, 2.6vw, 28px); font-weight: 600; letter-spacing: -.02em; line-height: 1.15; }
    .co { color: var(--muted); margin-top: 2px; }
    .period {
      display: inline-flex; align-items: center; gap: 7px; padding: 6px 13px; border-radius: 980px; flex-shrink: 0;
      font-size: 13px; font-weight: 600; background: var(--surface-2); color: var(--muted);
    }
    .period.now { background: var(--soft-blue); color: var(--link); }
    .period i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; animation: blink 1.6s infinite; }
    @keyframes blink { 50% { opacity: .3; } }
    .sum { font-weight: 600; margin: 22px 0 14px; }
    ul { list-style: none; display: grid; gap: 10px; }
    li { display: flex; gap: 12px; color: var(--muted); line-height: 1.5; font-size: 16px; }
    li app-icon { color: var(--ok); margin-top: 4px; }

    @media (max-width: 600px) {
      .tl { padding-left: 44px; }
      .rail { left: 15px; }
      .node { left: -44px; width: 32px; height: 32px; }
      .node app-icon { transform: scale(.8); }
      .j-top { flex-direction: column-reverse; }
    }
  `,
})
export class Experience {
  private readonly tlRef = viewChild.required<ElementRef<HTMLElement>>('tl');
  private readonly fillRef = viewChild.required<ElementRef<HTMLElement>>('fill');
  protected readonly jobs = EXPERIENCE;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const tl = this.tlRef().nativeElement, fill = this.fillRef().nativeElement;
      const items = Array.from(tl.querySelectorAll<HTMLElement>('.item'));
      let raf = 0;
      const update = () => {
        const mark = innerHeight * 0.6;
        const r = tl.getBoundingClientRect();
        fill.style.setProperty('--p', Math.min(Math.max((mark - r.top) / r.height, 0), 1).toFixed(3));
        items.forEach(it => it.classList.toggle('lit', it.getBoundingClientRect().top + 40 < mark));
      };
      const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
      update();
      addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => { cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); });
    });
  }
}
