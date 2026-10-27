import { Component, signal } from '@angular/core';
import { SKILL_GROUPS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { Icon } from '../../shared/icon';

const C = 2 * Math.PI * 42;

/** Tabbed skills with animated progress rings. */
@Component({
  selector: 'app-skills',
  imports: [RevealDirective, Icon],
  template: `
    <section id="skills">
      <div class="wrap">
        <div class="head" appReveal>
          <div class="sec-head">
            <span class="eyebrow">Tech stack</span>
            <h2 class="h-sec">The tools I build with.</h2>
            <p class="lead">Everything I need to design, build and ship production Angular applications.</p>
          </div>

          <div class="tabs" role="tablist" aria-label="Skill groups" [style.--n]="groups.length" (keydown)="onTabKey($event)">
            <span class="ind" [style.transform]="'translateX(' + tab() * 100 + '%)'" aria-hidden="true"></span>
            @for (g of groups; track g.title; let i = $index) {
              <button type="button" role="tab" [attr.aria-selected]="tab() === i" [attr.tabindex]="tab() === i ? 0 : -1" [class.on]="tab() === i" (click)="tab.set(i)">
                <app-icon [name]="g.icon" [size]="16" [stroke]="2" /><span>{{ g.title }}</span>
              </button>
            }
          </div>
        </div>

        <div class="tile panel" appReveal role="tabpanel">
          @for (g of [groups[tab()]]; track tab()) {
            <div class="pane">
              <p class="sub">{{ g.text }}</p>
              @if (g.bars) {
                <div class="rings">
                  @for (b of g.bars; track b.name; let i = $index) {
                    <div class="ring" [style.--d]="i * 0.08 + 's'">
                      <svg viewBox="0 0 100 100" aria-hidden="true">
                        <circle class="bg" cx="50" cy="50" r="42" />
                        <circle class="fg" cx="50" cy="50" r="42" [style.--o]="offset(b.level)" />
                      </svg>
                      <b>{{ b.level }}<small>%</small></b>
                      <span>{{ b.name }}</span>
                    </div>
                  }
                </div>
              }
              @if (g.chips) {
                <div class="tools">
                  @for (c of g.chips; track c; let i = $index) {
                    <span class="tool" [style.--d]="i * 0.03 + 's'"><i>{{ c.charAt(0) }}</i>{{ c }}</span>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; margin-bottom: 32px; }
    .sec-head { margin-bottom: 0; }

    .tabs {
      position: relative; display: grid; grid-template-columns: repeat(var(--n), 1fr); padding: 4px; border-radius: 980px;
      background: var(--surface-3);
    }
    .ind {
      position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / var(--n)); border-radius: 980px;
      background: var(--surface); box-shadow: 0 2px 8px rgba(0, 0, 0, .12); transition: transform .5s var(--spring);
    }
    .tabs button {
      position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 10px 18px; border-radius: 980px; font-size: 14px; font-weight: 500; color: var(--muted); white-space: nowrap; transition: color .3s;
    }
    .tabs button.on { color: var(--text); }

    .panel { padding: clamp(28px, 4vw, 52px); min-height: 330px; }
    .pane { animation: pane-in .6s var(--ease); }
    @keyframes pane-in { from { opacity: 0; transform: translateY(14px); } }
    .sub { color: var(--muted); margin-bottom: 36px; font-size: 17px; }

    .rings { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .ring { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .ring svg { width: min(150px, 100%); transform: rotate(-90deg); }
    .ring circle { fill: none; stroke-width: 7; }
    .ring .bg { stroke: var(--surface-3); }
    .ring .fg {
      stroke: var(--blue); stroke-linecap: round; stroke-dasharray: 263.9; stroke-dashoffset: 263.9;
    }
    .in .fg { stroke-dashoffset: var(--o); animation: ring 1.6s var(--ease) backwards; animation-delay: var(--d, 0s); }
    @keyframes ring { from { stroke-dashoffset: 263.9; } }
    .ring b {
      position: absolute; top: 0; left: 0; right: 0; aspect-ratio: 1; max-width: 150px; margin: 0 auto;
      display: flex; align-items: center; justify-content: center; gap: 1px; font-size: 28px; font-weight: 700; letter-spacing: -.03em;
    }
    .ring small { font-size: 15px; color: var(--muted); margin-top: 6px; }
    .ring span { margin-top: 14px; font-weight: 600; }

    .tools { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .tool {
      display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: var(--r-md); background: var(--surface-2);
      font-weight: 500; font-size: 15px; animation: pane-in .6s var(--ease) backwards; animation-delay: var(--d);
      transition: transform .4s var(--spring), background .3s;
    }
    .tool:hover { transform: translateY(-3px); background: var(--soft-blue); }
    .tool i {
      width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; font-style: normal; font-weight: 700;
      background: var(--surface); color: var(--link); flex-shrink: 0;
    }

    @media (max-width: 900px) {
      .rings, .tools { grid-template-columns: repeat(2, 1fr); }
      .tabs { width: 100%; }
    }
    @media (max-width: 560px) {
      .tabs button span { display: none; }
      .tabs button.on span { display: inline; }
      .tabs { grid-template-columns: repeat(var(--n), auto); }
      .ind { display: none; }
      .tabs button.on { background: var(--surface); box-shadow: 0 2px 8px rgba(0, 0, 0, .12); }
      .tools { grid-template-columns: 1fr; }
    }
  `,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly tab = signal(0);

  /** Arrow keys move between tabs (WAI-ARIA tabs pattern). */
  protected onTabKey(e: KeyboardEvent): void {
    const n = this.groups.length;
    const next = e.key === 'ArrowRight' ? (this.tab() + 1) % n : e.key === 'ArrowLeft' ? (this.tab() - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    this.tab.set(next);
    (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  protected offset(level: number): string {
    return (C * (1 - level / 100)).toFixed(1);
  }
}
