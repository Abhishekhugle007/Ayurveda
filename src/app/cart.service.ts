import { Injectable, computed, signal } from '@angular/core';
import { CONCERNS, FREE_CONSULT_MIN_ITEMS, PAYMENT_METHODS, TIME_SLOTS, UPI_ID, WHATSAPP_NUMBER } from './config';
import { PRODUCTS, Product } from './products';

export interface CartLine { product: Product; qty: number; total: number; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly quantities = signal<Record<number, number>>({});
  readonly isOpen = signal(false);
  readonly concern = signal(CONCERNS[0]);
  readonly slot = signal(TIME_SLOTS[0]);
  readonly paymentMethod = signal(PAYMENT_METHODS[0].id);
  readonly paymentDone = signal(false);
  readonly selectedPayment = computed(() => PAYMENT_METHODS.find(m => m.id === this.paymentMethod()) ?? PAYMENT_METHODS[0]);

  readonly lines = computed<CartLine[]>(() =>
    PRODUCTS.filter(p => this.quantities()[p.id]).map(p => {
      const qty = this.quantities()[p.id];
      return { product: p, qty, total: p.price * qty };
    })
  );
  readonly count = computed(() => this.lines().reduce((n, l) => n + l.qty, 0));
  readonly total = computed(() => this.lines().reduce((t, l) => t + l.total, 0));
  readonly unlocked = computed(() => this.count() >= FREE_CONSULT_MIN_ITEMS);
  readonly progress = computed(() => Math.min(100, (this.count() / FREE_CONSULT_MIN_ITEMS) * 100));
  readonly remaining = computed(() => Math.max(0, FREE_CONSULT_MIN_ITEMS - this.count()));

  readonly whatsappUrl = computed(() => {
    if (!this.count() || !this.paymentDone()) return '';
    let text = 'Hello Sanatan Ayurveda, I would like to order:\n';
    for (const l of this.lines()) text += `- ${l.product.name} x ${l.qty} (${this.inr(l.total)})\n`;
    text += `Total: ${this.inr(this.total())}\nPayment method: ${this.paymentMethod()}\nPayment account: ${this.selectedPayment().account}\nPayment status: Successful\n`;
    if (this.unlocked()) text += `\nFree video consultation:\nConcern: ${this.concern()}\nPreferred time: ${this.slot()}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  });

  inr(n: number): string { return '₹' + n.toLocaleString('en-IN'); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }
  add(id: number): void { this.change(id, 1); this.open(); }
  change(id: number, delta: number): void {
    this.quantities.update(q => {
      const next = { ...q, [id]: (q[id] ?? 0) + delta };
      if (next[id] < 1) delete next[id];
      return next;
    });
  }
}
