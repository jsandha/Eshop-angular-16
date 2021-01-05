
import { ActivatedRoute, Router } from '@angular/router';
import { Component  } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss']
})
export class EditOrdersComponent {
  order$;
  orderId;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
    ) {
    this.orderId =this.route.snapshot.params.id
    this.order$ =this.orderService.getOrder(this.orderId).valueChanges()

   }
editOrder(){
  this.router.navigate(['/shopping-cart/'],{queryParams: {orderId: this.orderId}})
}
}
