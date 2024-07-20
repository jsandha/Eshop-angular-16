import { Subject, Subscription } from 'rxjs';

import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent {
  orders$;
  dtTrigger: Subject<any> = new Subject<any>();
  subscription: Subscription;

  constructor(private orderService: OrderService) {
    this.subscription = this.orderService.getAllOrders().subscribe((x) => {
      this.orders$ = x;
    });
  }

  deleteOrder(orderId) {
    let toDelete = confirm('Do you really want to delete this order?');

    if (toDelete) {
      this.orderService.deleteOrder(orderId);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
