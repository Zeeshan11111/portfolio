import { Component, effect, inject, signal } from '@angular/core';
import { CONTACTS, CONTACT_TOPICS, PROFILE } from '../../data/portfolio.data';
import { ContactIntentService } from '../../core/contact-intent.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, Icon],
  template: `
    <section id="contact">
      <div class="wrap">
        <div class="tile box" appReveal>
          <div class="blob b1" aria-hidden="true"></div>
          <div class="blob b2" aria-hidden="true"></div>

          <div class="info">
            <span class="eyebrow">Contact</span>
            <h2 class="h-sec">Let's build something <span class="grad">great</span> together.</h2>
            <p class="lead">Whether it's a new Angular app, a dashboard that needs fixing, or a complete web product from scratch, I'd be glad to hear about it.</p>

            <button type="button" class="mail" (click)="copy()">
              <span class="ic"><app-icon name="mail" [size]="20" [stroke]="1.8" /></span>
              <span class="addr"><small>{{ copied() ? 'Copied to clipboard' : 'Click to copy' }}</small>{{ email }}</span>
              <span class="cp" [class.ok]="copied()"><app-icon [name]="copied() ? 'check' : 'copy'" [size]="16" [stroke]="2" /></span>
            </button>

            <div class="socials">
              @for (c of socials; track c.label) {
                <a [href]="c.href" target="_blank" rel="noopener">
                  <app-icon [name]="c.icon" [size]="17" /> {{ c.label }}
                </a>
              }
              @if (cv) {
                <a [href]="cv" [attr.download]="cv" class="cv">
                  <app-icon name="download" [size]="17" [stroke]="2" /> CV
                </a>
              }
            </div>
          </div>

          <form class="form" (submit)="send($event)">
            <div class="row2">
              <label><span>Your name</span>
                <input name="name" autocomplete="name" placeholder="Your name" required [value]="name()" (input)="name.set(val($event))">
              </label>
              <label><span>Your email</span>
                <input name="email" type="email" autocomplete="email" placeholder="you@company.com" required [value]="from()" (input)="from.set(val($event))">
              </label>
            </div>
            <div class="field">
              <span>I'm interested in</span>
              <div class="topics" role="group" aria-label="Project type" [class.flash]="flash()">
                @for (t of topics; track t) {
                  <button type="button" [class.on]="topic() === t" [attr.aria-pressed]="topic() === t" (click)="topic.set(t)">{{ t }}</button>
                }
              </div>
            </div>
            <label><span>Message</span>
              <textarea name="message" rows="4" placeholder="Tell me about your project…" required [value]="message()" (input)="message.set(val($event))"></textarea>
            </label>
            <!-- Honeypot: hidden from people, bots fill it and get ignored -->
            <input class="hp" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
            <button class="btn send" type="submit" [class.ok]="status() === 'sent'" [disabled]="status() === 'sending'">
              @switch (status()) {
                @case ('sending') { <span class="spin" aria-hidden="true"></span> Sending… }
                @case ('sent') { <app-icon name="check" [size]="17" [stroke]="2.4" /> Message sent }
                @default { Send message <app-icon name="send" [size]="16" [stroke]="2" /> }
              }
            </button>
            <p class="note" [class.err]="status() === 'error'" [class.warn]="status() === 'activate'" aria-live="polite">
              @switch (status()) {
                @case ('sent') { Thanks! Your message is in my inbox — I'll get back to you soon. }
                @case ('activate') { One-time setup: open the "Activate Form" email sent to {{ email }} (check Spam too), click Activate, then send again. }
                @case ('error') { Couldn't send right now. Please email me directly at <a [href]="'mailto:' + email">{{ email }}</a>. }
              }
            </p>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: `
    .box { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 72px); padding: clamp(28px, 5vw, 64px); }
    .box > * { min-width: 0; }
    .blob { position: absolute; z-index: -1; width: 420px; height: 420px; border-radius: 50%; filter: blur(80px); opacity: .22; pointer-events: none; }
    .b1 { background: #0071E3; top: -180px; left: -120px; animation: float 14s ease-in-out infinite; }
    .b2 { background: #8E5CFF; bottom: -200px; right: 10%; animation: float 18s ease-in-out infinite reverse; }
    @keyframes float { 50% { transform: translate(60px, 40px) scale(1.1); } }

    .info { display: flex; flex-direction: column; min-width: 0; }
    .lead { margin: 18px 0 32px; }
    .mail {
      display: flex; align-items: center; gap: 14px; width: 100%; min-width: 0; padding: 10px; border-radius: 18px; text-align: left;
      background: var(--surface-2); border: 1px solid var(--line); transition: border-color .3s, transform .4s var(--spring);
    }
    .mail:hover { border-color: var(--blue); transform: translateY(-2px); }
    .addr { flex: 1; min-width: 0; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .addr small { display: block; font-size: 12px; font-weight: 500; color: var(--muted); }
    .cp { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; background: var(--surface); color: var(--muted); }
    .cp.ok { color: var(--ok); }
    .socials { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }
    .socials a {
      display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 980px; text-decoration: none;
      font-size: 14px; font-weight: 500; background: var(--surface-2); transition: background .3s, color .3s;
    }
    .socials a:hover { background: var(--text); color: var(--bg); }
    .socials a.cv { background: var(--soft-blue); color: var(--link); }
    .socials a.cv:hover { background: var(--blue); color: #fff; }

    .form { display: flex; flex-direction: column; gap: 16px; }
    .row2 { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; }
    label, .field { display: flex; flex-direction: column; gap: 8px; }
    label > span, .field > span { font-size: 13px; font-weight: 600; color: var(--muted); }
    input, textarea {
      width: 100%; padding: 13px 16px; border-radius: 14px; border: 1px solid var(--line-2); background: var(--surface-2);
      outline: none; font-size: 16px; resize: vertical; transition: border-color .2s, box-shadow .2s, background .2s;
    }
    input::placeholder, textarea::placeholder { color: var(--faint); }
    input:focus, textarea:focus { border-color: var(--blue); background: var(--surface); box-shadow: 0 0 0 4px var(--soft-blue); }
    .topics { display: flex; flex-wrap: wrap; gap: 8px; }
    .topics button {
      padding: 8px 15px; border-radius: 980px; font-size: 14px; font-weight: 500; border: 1px solid var(--line-2);
      color: var(--muted); transition: all .25s var(--ease);
    }
    .topics button:hover { color: var(--text); border-color: var(--text); }
    .topics button.on { background: var(--text); color: var(--bg); border-color: var(--text); }
    .topics.flash button.on { animation: picked .9s var(--spring); }
    @keyframes picked { 0% { transform: scale(.9); box-shadow: 0 0 0 0 rgba(0, 113, 227, .5); } 50% { transform: scale(1.06); } 100% { transform: none; box-shadow: 0 0 0 12px transparent; } }
    .send { margin-top: 4px; min-height: 52px; }
    .send:disabled { opacity: .8; cursor: progress; transform: none; }
    .send.ok, .send.ok:hover { background: #1F9D55; box-shadow: 0 10px 24px -10px rgba(31, 157, 85, .6); }
    .spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, .35); border-top-color: #fff; animation: rot .7s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
    .note { min-height: 1.4em; font-size: 14px; color: var(--ok); text-align: center; }
    .note.err { color: #E5484D; }
    .note.warn { color: var(--warn); }
    .note a { color: var(--link); font-weight: 600; }

    @media (max-width: 900px) { .box { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 560px) {
      .box { padding: 26px 20px; border-radius: 24px; gap: 36px; }
      .row2 { grid-template-columns: minmax(0, 1fr); }
      .mail { gap: 10px; padding: 8px; }
      .mail .ic { width: 40px; height: 40px; }
      .addr { font-size: 15px; }
      .socials a { flex: 1 1 0; justify-content: center; }
      .topics { display: grid; grid-template-columns: 1fr 1fr; }
      .topics button:last-child:nth-child(odd) { grid-column: span 2; }
    }
  `,
})
export class Contact {
  protected readonly email = PROFILE.email;
  protected readonly cv = PROFILE.cv;
  protected readonly socials = CONTACTS.filter(c => c.href.startsWith('http'));
  protected readonly topics = CONTACT_TOPICS;
  protected readonly flash = signal(false);
  protected readonly name = signal('');
  protected readonly from = signal('');
  protected readonly topic = signal(this.topics[0]);
  protected readonly message = signal('');
  protected readonly copied = signal(false);
  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error' | 'activate'>('idle');

  constructor() {
    // A "Discuss this project" click elsewhere preselects the matching topic.
    const intent = inject(ContactIntentService);
    effect(() => {
      const t = intent.topic();
      if (!t) return;
      this.topic.set(t);
      this.flash.set(false);
      setTimeout(() => this.flash.set(true), 700);
      setTimeout(() => this.flash.set(false), 1700);
    });
  }

  protected val(e: Event): string {
    return (e.target as HTMLInputElement).value;
  }

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    } catch {
      location.href = `mailto:${this.email}`;
    }
  }

  /**
   * Emails the message straight to PROFILE.email through FormSubmit (no API key or backend needed).
   * The very first submission makes FormSubmit send a one-time "Activate form" email to that inbox.
   */
  protected async send(e: Event): Promise<void> {
    e.preventDefault();
    if (this.status() === 'sending') return;
    const form = e.target as HTMLFormElement;
    if ((form.elements.namedItem('botcheck') as HTMLInputElement)?.checked) return;

    this.status.set('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${this.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `${this.topic()} enquiry from ${this.name()} — portfolio`,
          _template: 'table',
          _captcha: 'false',
          _replyto: this.from(),
          name: this.name(),
          email: this.from(),
          topic: this.topic(),
          message: this.message(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      // Until the inbox owner clicks FormSubmit's one-time "Activate Form" email, every submission is held back.
      if (/activat/i.test(data.message ?? '')) { this.status.set('activate'); return; }
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || res.statusText);
      this.status.set('sent');
      this.name.set(''); this.from.set(''); this.message.set('');
      form.reset();
      setTimeout(() => { if (this.status() === 'sent') this.status.set('idle'); }, 6000);
    } catch {
      this.status.set('error');
    }
  }
}
