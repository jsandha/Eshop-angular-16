import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrdersByUser();
  }

  deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId);
  }
}
