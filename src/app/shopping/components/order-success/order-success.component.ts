import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  orderId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params.id
  }

}
