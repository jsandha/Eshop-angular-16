import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

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
    private db: AngularFireDatabase
    ) { }

  ngOnInit() {
    const orderId =this.route.snapshot.params.id
      this.order$ = this.db.list('/orders/' + orderId).valueChanges();
  }
}
