import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from './cart.service';
import { CONCERNS, PAYMENT_METHODS, TIME_SLOTS, UPI_ID } from './config';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="veil" [class.on]="cart.isOpen()" (click)="cart.close()"></div>
    <aside [class.on]="cart.isOpen()" aria-label="Shopping cart" [attr.aria-hidden]="!cart.isOpen()">
      <header>
        <h2 style="font-size:1.6rem;margin:0">Your cart</h2>
        <button class="x" type="button" aria-label="Close cart" (click)="cart.close()">×</button>
      </header>
      <div class="items">
        @for (l of cart.lines(); track l.product.id) {
          <div class="it">
            <b>{{ l.product.name }}</b><span>{{ cart.inr(l.total) }}</span>
            <div class="q">
              <button type="button" aria-label="Decrease" (click)="cart.change(l.product.id, -1)">−</button>
              {{ l.qty }}
              <button type="button" aria-label="Increase" (click)="cart.change(l.product.id, 1)">+</button>
            </div>
          </div>
        } @empty {
          <p class="empty">Your cart is empty. Add a product to get started.</p>
        }
      </div>
      <div class="cofr">
        @if (cart.unlocked()) {
          <b>🎉 Free video consultation unlocked</b>
          <label>Health concern
            <select [ngModel]="cart.concern()" (ngModelChange)="cart.concern.set($event)">
              @for (c of concerns; track c) { <option [value]="c">{{ c }}</option> }
            </select>
          </label>
          <label>Preferred time
            <select [ngModel]="cart.slot()" (ngModelChange)="cart.slot.set($event)">
              @for (s of slots; track s) { <option [value]="s">{{ s }}</option> }
            </select>
          </label>
        } @else {
          <b>{{ cart.count() ? 'Add ' + cart.remaining() + ' more product for a free doctor video call' : 'Buy 2 products, get a free doctor video call' }}</b>
          <div class="prog"><i [style.width.%]="cart.progress()"></i></div>
        }
      </div>

      @if (cart.count()) {
        <div class="payment-box">
          <div class="pay-header">
            <strong>Payment before order</strong>
            <span>Pay first, then WhatsApp</span>
          </div>
          <div class="pay-options">
            @for (method of paymentMethods; track method.id) {
              <label class="pay-option">
                <input type="radio" name="paymentMethod" [value]="method.id" [checked]="cart.paymentMethod() === method.id" (change)="cart.paymentMethod.set(method.id)">
                <span>{{ method.label }}</span>
              </label>
            }
          </div>

          @if (cart.selectedPayment().qr) {
            <div class="qr-box">
              <div class="qr-code" aria-label="QR code for payment">
                <div class="qr-grid"></div>
              </div>
              <div class="upi-box">
                <small>UPI ID</small>
                <strong>{{ cart.selectedPayment().account }}</strong>
                <small>{{ cart.selectedPayment().instruction }}</small>
              </div>
            </div>
          } @else {
            <div class="pay-detail-box">
              <small>{{ cart.selectedPayment().label }} details</small>
              <strong>{{ cart.selectedPayment().account }}</strong>
              <p>{{ cart.selectedPayment().instruction }}</p>
            </div>
          }

          <label class="confirm-pay">
            <input type="checkbox" [checked]="cart.paymentDone()" (change)="cart.paymentDone.set($any($event.target).checked)">
            I have paid through {{ cart.paymentMethod() }} and want to place this order.
          </label>
        </div>
      }

      <div class="tot"><span>Total</span><span>{{ cart.inr(cart.total()) }}</span></div>
      <a class="btn" style="text-align:center" [style.opacity]="cart.count() && cart.paymentDone() ? 1 : 0.5"
         [attr.href]="cart.whatsappUrl() || null" target="_blank" rel="noopener">{{ cart.paymentDone() ? 'Order on WhatsApp' : 'Pay to unlock WhatsApp' }}</a>
      <p class="note">We confirm your order on WhatsApp after payment. Payment can be made by GPay, PhonePe, QR code or UPI.</p>
    </aside>
  `,
})
export class CartComponent {
  protected readonly cart = inject(CartService);
  protected readonly concerns = CONCERNS;
  protected readonly paymentMethods = PAYMENT_METHODS;
  protected readonly slots = TIME_SLOTS;
  protected readonly upiId = UPI_ID;

  @HostListener('document:keydown.escape')
  onEscape(): void { this.cart.close(); }
}
