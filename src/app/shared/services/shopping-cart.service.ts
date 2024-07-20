import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { map, mapTo, pluck, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../models/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Injectable()
export class ShoppingCartService {
  quantity: number;

  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db
      .list('shopping-cart/')
      .push({ dateCreated: new Date().toTimeString() });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('shopping-cart/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    const result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  private async updateItem(product: Product, change: number) {
    let quantity;
    const cartId: string = await this.getOrCreateCartId(); // get the id
    const itemRef: AngularFireObject<unknown> = this.getItem(
      cartId,
      product.$key
    ); //get iteRef to the product

    const item$: Observable<unknown> = itemRef.valueChanges(); // get observable of item
    item$.pipe(take(1)).subscribe((item) => {
      item === null
        ? (quantity = 1)
        : (quantity = (item['quantity'] || 0) + change);
      if (quantity === 0) itemRef.remove();
      else
        itemRef.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity,
        });
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId: string = await this.getOrCreateCartId();
    return this.db
      .list('shopping-cart/' + cartId)
      .valueChanges()
      .pipe(map((cart) => new ShoppingCart(cart['1'] as {})));
  }

  // yet to do.. have to return the object new shoppingcart
  async getOrderCart(id) {
    this.db
      .list('orders/' + id)
      .valueChanges()
      .pipe(
        take(1),
        pluck('1'),
        map((x) => console.log(x['product']))

        // map(x=>  new ShoppingCart[x])
      )
      .subscribe((x) => console.log(x));
    // map(cart => { cart['1'].forEach(el => {
    //           (el.product).reduce((acc,obj)=> {
    //             // acc[obj] = obj
    //             return acc
    //           })
    // });

    //  .forEach(el => {
    //    el.reduce((acc,obj)=>  {
    //       acc[obj.product.productId] = obj.product
    //     return acc
    //   })
    //  });
    // })
    // .subscribe(x=>console.log(x))

    // map(cart => new ShoppingCart(cart['1'])))
    // update the cart and the objects related to it
    // updateItems()
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }
}
