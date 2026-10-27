import { Component, ElementRef, afterNextRender, effect, inject, signal, viewChild, DestroyRef } from '@angular/core';
import { ThemeService } from '../../core/theme-switcher';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-navbar',
  imports: [Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
    '(document:click)': 'onDocClick($event)',
  },
})
export class Navbar {
  private readonly linksRef = viewChild.required<ElementRef<HTMLElement>>('linksEl');
  private readonly indicatorRef = viewChild.required<ElementRef<HTMLElement>>('indicator');
  protected readonly theme = inject(ThemeService);
  protected readonly links = NAV_LINKS;
  protected readonly name = PROFILE.name;
  protected readonly first = PROFILE.firstName;
  protected readonly initials = PROFILE.initials;
  protected readonly cv = PROFILE.cv;
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('');
  protected readonly scrolled = signal(false);
  private ready = false;
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Park the sliding pill under the active section's link.
    effect(() => { this.active(); if (this.ready) this.moveIndicator(null); });

    afterNextRender(() => {
      this.ready = true;
      const io = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) this.active.set(e.target.id); }),
        { rootMargin: '-45% 0px -50% 0px' },
      );
      document.querySelectorAll('section[id]').forEach(s => io.observe(s));

      const onScroll = () => {
        this.scrolled.set(scrollY > 10);
        if (this.menuOpen()) this.closeMenu();
        if (scrollY < innerHeight * 0.4) this.active.set('');
      };
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => { io.disconnect(); removeEventListener('scroll', onScroll); });
    });
  }

  /** Slides the indicator to `target`, or back to the active link when null. */
  protected moveIndicator(target: EventTarget | null): void {
    const ind = this.indicatorRef().nativeElement;
    const el = (target as HTMLElement | null)
      ?? this.linksRef().nativeElement.querySelector<HTMLElement>(`a[data-id="${this.active()}"]`);
    if (!el) { ind.style.opacity = '0'; return; }
    ind.style.left = `${el.offsetLeft}px`;
    ind.style.width = `${el.offsetWidth}px`;
    ind.style.opacity = '1';
  }

  /** Passes the click so the theme reveal can grow from the button. */
  protected toggleTheme(e: MouseEvent): void { this.theme.toggle(e); }

  toggleMenu(): void { this.menuOpen.update(v => !v); }

  /** Tapping anywhere outside the nav closes the mobile menu. */
  protected onDocClick(e: MouseEvent): void {
    if (this.menuOpen() && !this.host.contains(e.target as Node)) this.closeMenu();
  }
  closeMenu(): void { this.menuOpen.set(false); }
}
