import { Directive, ElementRef, inject } from '@angular/core';

/** Tracks the pointer inside the element as `--mx` / `--my` for a soft hover glow. */
@Directive({
  selector: '[appSpot]',
  host: { class: 'spot', '(pointermove)': 'move($event)' },
})
export class SpotlightDirective {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  protected move(e: PointerEvent): void {
    const r = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    this.el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
}
