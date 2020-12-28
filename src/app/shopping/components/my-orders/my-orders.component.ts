
import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,) {

    this.orders$ = authService.user$.pipe(
      switchMap(u => orderService.getOrdersByUser(u.uid).valueChanges()))
  }

  deleteOrder(orderId){
    this.orderService.deleteOrder(orderId);
  }
}
