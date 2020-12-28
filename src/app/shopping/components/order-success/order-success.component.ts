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
    this.orderId = this.route.url["_value"][1].path
    console.log(this.orderId)
  }

}
