import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit{
orderId;
order$;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    if(this.route.url["_value"][2].path){
      this.orderId = this.route.url["_value"][2].path
      this.order$ = this.getOrdersByUser(this.orderId).valueChanges();
  }}

  getOrdersByUser(orderId: string) {
  return this.db.list('/orders/' + orderId)
  }

}
