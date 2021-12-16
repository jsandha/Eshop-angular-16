import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }

  deleteOrder(orderId) {
    let toDelete = confirm('Do you really want to delete this order?');

    if (toDelete) {
      this.orderService.deleteOrder(orderId);
    }
  }
}
