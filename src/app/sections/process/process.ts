import { Component } from '@angular/core';
import { PROCESS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { Icon } from '../../shared/icon';

/** Four-step working process with a line that draws itself, ending in a call to action. */
@Component({
  selector: 'app-process',
  imports: [RevealDirective, Icon],
  template: `
    <section id="process">
      <div class="wrap">
        <div class="sec-head" appReveal>
          <span class="eyebrow">How I work</span>
          <h2 class="h-sec">A simple, transparent process.</h2>
          <p class="lead">You always know what's happening, what's next and when it ships.</p>
        </div>

        <ol class="steps" appReveal [style.--n]="steps.length">
          <span class="line" aria-hidden="true"><i></i></span>
          @for (st of steps; track st.title; let i = $index) {
            <li [style.--d]="0.25 + i * 0.22 + 's'">
              <span class="dot"><app-icon [name]="st.icon" [size]="20" [stroke]="1.9" /></span>
              <span class="n">Step {{ i + 1 }}</span>
              <h3>{{ st.title }}</h3>
              <p>{{ st.text }}</p>
            </li>
          }
        </ol>

        <div class="tile cta" appReveal>
          <div class="shine" aria-hidden="true"></div>
          <div>
            <h3>Have an idea? Let's turn it into a product.</h3>
            <p>Tell me what you're building and we'll figure out the next steps together.</p>
          </div>
          <a href="#contact" class="go">Start a project <app-icon name="arrow-right" [size]="17" [stroke]="2" /></a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .steps { position: relative; list-style: none; display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 28px; }
    .line { position: absolute; top: 27px; left: 28px; right: calc((100% - (var(--n) - 1) * 28px) / var(--n) - 28px); height: 2px; border-radius: 2px; background: var(--surface-3); overflow: hidden; }
    .line i {
      position: absolute; inset: 0; background: linear-gradient(90deg, #0071E3, #8E5CFF);
      transform: scaleX(0); transform-origin: 0 50%; transition: transform 1.8s var(--ease) .2s;
    }
    .in .line i { transform: none; }

    li { position: relative; opacity: 0; transform: translateY(20px); transition: opacity .7s var(--ease), transform .7s var(--ease); transition-delay: var(--d); }
    .in li { opacity: 1; transform: none; }
    .dot {
      position: relative; width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center;
      background: var(--surface); border: 1px solid var(--line-2); color: var(--muted); box-shadow: var(--shadow);
      transition: background .5s, color .5s, border-color .5s, transform .6s var(--spring); transition-delay: var(--d);
    }
    .in .dot { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: 0 0 0 7px var(--soft-blue); }
    li:hover .dot { transform: scale(1.1) rotate(-6deg); transition-delay: 0s; }
    .n { display: block; margin: 22px 0 6px; font-size: 13px; font-weight: 600; color: var(--link); }
    h3 { font-size: 21px; font-weight: 600; letter-spacing: -.015em; margin-bottom: 8px; }
    li p { color: var(--muted); font-size: 15px; line-height: 1.55; }

    .cta {
      margin-top: clamp(56px, 7vw, 88px); padding: clamp(32px, 4.5vw, 56px); border: 0;
      display: flex; align-items: center; justify-content: space-between; gap: 32px;
      background: linear-gradient(120deg, #0071E3 0%, #4F46E5 55%, #8E5CFF 100%); color: #fff;
    }
    .shine {
      position: absolute; inset: 0; z-index: -1; pointer-events: none;
      background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, .18) 50%, transparent 70%);
      background-size: 250% 100%; animation: shine 5s ease-in-out infinite;
    }
    @keyframes shine { 0% { background-position: 150% 0; } 60%, 100% { background-position: -100% 0; } }
    .cta h3 { font-size: clamp(26px, 3.2vw, 38px); line-height: 1.12; font-weight: 700; letter-spacing: -.025em; max-width: 20ch; margin: 0; }
    .cta p { color: rgba(255, 255, 255, .82); margin-top: 10px; font-size: 17px; }
    .go {
      flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px; padding: 15px 26px; border-radius: 980px;
      background: #fff; color: #0066CC; font-weight: 600; text-decoration: none;
      transition: transform .4s var(--spring), box-shadow .3s;
    }
    .go app-icon { transition: transform .35s var(--ease); }
    .go:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 14px 30px -12px rgba(0, 0, 0, .45); }
    .go:hover app-icon { transform: translateX(4px); }

    @media (max-width: 900px) {
      .steps { grid-template-columns: 1fr 1fr; row-gap: 40px; }
      .line { display: none; }
      .cta { flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 560px) {
      .steps { grid-template-columns: 1fr; padding-left: 0; }
      li { display: grid; grid-template-columns: 56px 1fr; column-gap: 18px; }
      .dot { grid-row: span 3; }
      .n { margin-top: 2px; }
      .go { width: 100%; justify-content: center; }
    }
  `,
})
export class Process {
  protected readonly steps = PROCESS;
}
