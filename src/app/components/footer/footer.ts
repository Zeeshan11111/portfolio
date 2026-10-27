import { Component } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  template: `
    <footer>
      <div class="wrap row">
        <span class="brand"><span class="mark">{{ initials }}</span>© {{ year }} {{ name }}</span>
        <nav aria-label="Footer">
          @for (l of links; track l.id) { <a [href]="'#' + l.id">{{ l.label }}</a> }
        </nav>
        <a href="#home" class="top">Back to top <app-icon name="arrow-up" [size]="14" [stroke]="2" /></a>
      </div>
    </footer>
  `,
  styles: `
    footer { padding: 28px 0 36px; border-top: 1px solid var(--line); font-size: 14px; color: var(--muted); }
    .row { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
    .brand { display: inline-flex; align-items: center; gap: 10px; }
    .mark {
      width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center;
      background: var(--text); color: var(--bg); font-size: 10px; font-weight: 700;
    }
    nav { display: flex; gap: 22px; flex-wrap: wrap; }
    a { color: var(--muted); text-decoration: none; transition: color .2s; }
    a:hover { color: var(--text); }
    .top { display: inline-flex; align-items: center; gap: 6px; }
    .top app-icon { transition: transform .3s var(--ease); }
    .top:hover app-icon { transform: translateY(-3px); }
  `,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly name = PROFILE.name;
  protected readonly initials = PROFILE.initials;
  protected readonly links = NAV_LINKS;
}
