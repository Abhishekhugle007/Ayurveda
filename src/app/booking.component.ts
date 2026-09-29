import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CONCERNS, CONSULT_FEE, TIME_SLOTS, WHATSAPP_NUMBER } from './config';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="book" id="book">
      <h3>Book your consultation now</h3>
      <div class="fields">
        <label>Your name<input [(ngModel)]="name" autocomplete="name" placeholder="Full name"></label>
        <label>Phone or WhatsApp<input [(ngModel)]="phone" type="tel" autocomplete="tel" placeholder="10 digit number"></label>
        <label>Health concern
          <select [(ngModel)]="concern">@for (c of concerns; track c) { <option [value]="c">{{ c }}</option> }</select>
        </label>
        <label>Preferred date<input [(ngModel)]="date" type="date" [min]="today"></label>
        <label>Preferred time
          <select [(ngModel)]="slot">@for (s of slots; track s) { <option [value]="s">{{ s }}</option> }</select>
        </label>
      </div>
      <button class="btn" type="button" (click)="submit()">Book on WhatsApp</button>
      <p class="note" aria-live="polite" [style.color]="error ? '#c0392b' : ''">{{ message }}</p>
    </div>
  `,
})
export class BookingComponent {
  protected readonly concerns = CONCERNS;
  protected readonly slots = TIME_SLOTS;
  protected readonly today = new Date().toISOString().slice(0, 10);
  name = ''; phone = ''; date = '';
  concern = CONCERNS[0]; slot = TIME_SLOTS[0];
  error = false;
  message = `Buy any 2 products and this consultation is free. Otherwise it is ₹${CONSULT_FEE} (placeholder price).`;

  submit(): void {
    if (!this.name.trim() || this.phone.replace(/\D/g, '').length < 10) {
      this.error = true;
      this.message = 'Enter your name and a 10 digit phone number to continue.';
      return;
    }
    this.error = false;
    this.message = 'Opening WhatsApp to send your request.';
    const text = `Hello Sanatan Ayurveda, I would like to book a video consultation with Dr. Vishal Ugale.\nName: ${this.name.trim()}\nPhone: ${this.phone.trim()}\nConcern: ${this.concern}\nPreferred date: ${this.date || 'Any day'}\nPreferred time: ${this.slot}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }
}
