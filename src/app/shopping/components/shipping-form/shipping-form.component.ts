
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping: any = {};
  Subscription: Subscription;
  userId: string;
  constructor(
    private router: Router,
    private orderService: OrderService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.Subscription = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.Subscription.unsubscribe();
    }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
