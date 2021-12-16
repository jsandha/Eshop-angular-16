import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<any[]> {
    const itemRef: AngularFireList<any> = this.db.list('/orders');
    return itemRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  getOrder(orderId) {
    return this.db.object('/orders/' + orderId);
  }
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', (ref) =>
      ref.orderByChild('userId').equalTo(userId)
    );
  }

  deleteOrder(orderId) {
    return this.db.object('/orders/' + orderId).remove();
  }
}
