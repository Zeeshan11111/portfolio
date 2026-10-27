import { Injectable, signal } from '@angular/core';

/** Lets any "Discuss this project" button preselect a topic in the contact form. */
@Injectable({ providedIn: 'root' })
export class ContactIntentService {
  readonly topic = signal<string | null>(null);

  choose(topic: string): void {
    // Re-set even if unchanged so the form flashes again on a repeat click.
    this.topic.set(null);
    queueMicrotask(() => this.topic.set(topic));
  }
}
