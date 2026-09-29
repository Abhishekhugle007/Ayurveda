import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from './cart.service';
import { PRODUCTS } from './products';

@Component({
  selector: 'app-shop',
  standalone: true,
  template: `
    <section id="shop">
      <h2>Shop</h2>
      <div class="filters" role="group" aria-label="Filter by category">
        @for (c of categories; track c) {
          <button class="f" type="button" [attr.aria-pressed]="c === category()" (click)="category.set(c)">{{ c }}</button>
        }
      </div>
      <div class="grid">
        @for (p of visible(); track p.id) {
          <article class="card">
            <div class="img" style="background:#fff"><img class="pimg" [src]="p.image" [alt]="p.name"></div>
            <div class="b">
              <h3>{{ p.name }}</h3>
              <p>{{ p.description }}</p>
              <div class="row">
                <span class="price">{{ cart.inr(p.price) }}</span>
                <button class="add" type="button" (click)="cart.add(p.id)">Add to cart</button>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class ShopComponent {
  protected readonly cart = inject(CartService);
  protected readonly categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  protected readonly category = signal('All');
  protected readonly visible = computed(() =>
    this.category() === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === this.category())
  );
}
