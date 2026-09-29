import { AfterViewInit, Component, inject } from '@angular/core';
import { BookingComponent } from './booking.component';
import { CartComponent } from './cart.component';
import { CartService } from './cart.service';
import { ShopComponent } from './shop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShopComponent, CartComponent, BookingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  protected readonly cart = inject(CartService);

  /** Scroll-reveal and drifting leaves. Skipped when the visitor prefers reduced motion. */
  ngAfterViewInit(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    const sel = 'section h2,.lead,.trust,.offer,.steps li,.docs>div,.dr>*,.clinic>*,.tl li,.why>div,.wisdom';
    document.querySelectorAll<HTMLElement>(sel).forEach(el => {
      el.classList.add('rv');
      const index = Array.from(el.parentElement?.children ?? []).indexOf(el);
      el.style.transitionDelay = Math.min(index, 5) * 80 + 'ms';
      io.observe(el);
    });
    const hero = document.querySelector('.hero');
    for (let i = 0; hero && i < 7; i++) {
      const leaf = document.createElement('i');
      leaf.className = 'leaf';
      leaf.style.left = 8 + i * 13 + '%';
      leaf.style.animationDuration = 11 + i * 2 + 's';
      leaf.style.animationDelay = -i * 2.5 + 's';
      leaf.style.width = leaf.style.height = 10 + (i % 3) * 5 + 'px';
      hero.appendChild(leaf);
    }
  }
}
