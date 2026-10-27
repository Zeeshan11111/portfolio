import { Component, inject } from '@angular/core';
import { SERVICES } from '../../data/portfolio.data';
import { ContactIntentService } from '../../core/contact-intent.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { Icon } from '../../shared/icon';

/** What I offer clients, as an alternating-width bento grid. */
@Component({
  selector: 'app-services',
  imports: [RevealDirective, SpotlightDirective, Icon],
  template: `
    <section id="services">
      <div class="wrap">
        <div class="sec-head" appReveal>
          <span class="eyebrow">Services</span>
          <h2 class="h-sec">What I can build for you.</h2>
          <p class="lead">From a brand-new product to polishing the one you already have — clean, fast and built to last.</p>
        </div>

        <div class="grid">
          @for (s of services; track s.title; let i = $index) {
            <article class="tile svc lift" [class.feat]="i === 0" [class.wide]="i === 0 || i === 3"
                     appReveal appSpot [style.--d]="(i % 2) * 0.1 + 's'">
              <div class="s-top">
                <span class="s-ic"><app-icon [name]="s.icon" [size]="22" [stroke]="1.8" /></span>
                <span class="num">0{{ i + 1 }}</span>
              </div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
              <ul>
                @for (pt of s.points; track pt) {
                  <li><app-icon name="check" [size]="15" [stroke]="2.4" />{{ pt }}</li>
                }
              </ul>
              <a href="#contact" class="discuss" (click)="intent.choose(s.topic)">
                Discuss this project <app-icon name="arrow-right" [size]="15" [stroke]="2" />
              </a>

              @if (i === 0) {
                <div class="code" aria-hidden="true">
                  <div class="c-bar"><i></i><i></i><i></i></div>
                  <div class="c-body">
                    <span style="--w:62%; --d2:0s"></span>
                    <span style="--w:44%; --d2:.25s" class="in1"></span>
                    <span style="--w:70%; --d2:.5s" class="in1"></span>
                    <span style="--w:36%; --d2:.75s" class="in2"></span>
                    <span style="--w:52%; --d2:1s" class="in1"></span>
                    <span style="--w:28%; --d2:1.25s"></span>
                  </div>
                </div>
              }
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
    .svc { grid-column: span 5; padding: clamp(28px, 3.5vw, 40px); display: flex; flex-direction: column; }
    .svc.wide { grid-column: span 7; }

    .s-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 26px; }
    .s-ic {
      width: 50px; height: 50px; border-radius: 15px; display: grid; place-items: center;
      background: var(--soft-blue); color: var(--link); transition: transform .5s var(--spring), background .3s, color .3s;
    }
    .svc:hover .s-ic { transform: rotate(-8deg) scale(1.08); background: var(--blue); color: #fff; }
    .num { font-size: 14px; font-weight: 600; color: var(--faint); font-variant-numeric: tabular-nums; }
    h3 { font-size: clamp(22px, 2.3vw, 28px); line-height: 1.15; font-weight: 600; letter-spacing: -.02em; margin-bottom: 10px; }
    p { color: var(--muted); line-height: 1.55; max-width: 46ch; }
    ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 22px 0 26px; }
    li { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 500; }
    li app-icon { color: var(--ok); }
    .discuss {
      margin-top: auto; align-self: flex-start; display: inline-flex; align-items: center; gap: 6px;
      font-size: 15px; font-weight: 600; color: var(--link); text-decoration: none; position: relative; z-index: 1;
    }
    .discuss app-icon { transition: transform .35s var(--ease); }
    .discuss:hover app-icon { transform: translateX(4px); }

    /* Featured card */
    .feat { background: linear-gradient(135deg, #0071E3 0%, #4F46E5 60%, #7C3AED 100%); border-color: transparent; color: #fff; padding-right: min(42%, 340px); }
    .feat .s-ic { background: rgba(255, 255, 255, .18); color: #fff; }
    .feat:hover .s-ic { background: #fff; color: var(--blue); }
    .feat .num, .feat p { color: rgba(255, 255, 255, .78); }
    .feat li app-icon { color: #fff; }
    .feat .discuss { color: #fff; }
    .feat::before { background: radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, .14), transparent 45%); }

    .code {
      position: absolute; right: -24px; bottom: 28px; width: min(40%, 320px); border-radius: 16px; overflow: hidden;
      background: rgba(255, 255, 255, .12); border: 1px solid rgba(255, 255, 255, .22);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 30px 60px -20px rgba(0, 0, 0, .35);
      animation: float 6s ease-in-out infinite; transform: rotate(-4deg);
    }
    @keyframes float { 50% { transform: rotate(-4deg) translateY(-10px); } }
    .c-bar { display: flex; gap: 6px; padding: 12px 14px; border-bottom: 1px solid rgba(255, 255, 255, .15); }
    .c-bar i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, .45); }
    .c-body { padding: 16px; display: flex; flex-direction: column; gap: 11px; }
    .c-body span {
      height: 8px; border-radius: 4px; background: rgba(255, 255, 255, .55); width: var(--w); transform-origin: 0 50%;
      animation: type 4s var(--ease) infinite; animation-delay: var(--d2);
    }
    .c-body .in1 { margin-left: 14px; background: rgba(255, 255, 255, .35); }
    .c-body .in2 { margin-left: 28px; background: #FFD60A; opacity: .85; }
    @keyframes type { 0% { transform: scaleX(0); } 30%, 85% { transform: scaleX(1); } 100% { transform: scaleX(1); opacity: .2; } }

    @media (max-width: 1000px) {
      .svc, .svc.wide { grid-column: span 6; }
      .feat { grid-column: span 12; }
      .svc:last-child { grid-column: span 12; }
    }
    @media (max-width: 734px) {
      .svc, .svc.wide, .svc:last-child { grid-column: span 12; }
      .feat { padding-right: clamp(28px, 3.5vw, 40px); padding-bottom: 200px; }
      .code { width: 230px; right: 20px; bottom: 24px; }
    }
  `,
})
export class Services {
  protected readonly services = SERVICES;
  protected readonly intent = inject(ContactIntentService);
}
