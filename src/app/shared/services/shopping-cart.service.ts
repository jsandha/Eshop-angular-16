
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

private create(){
    return this.db.list('/shopping-carts').push({// gives the cartId newly created
      dateCreated: new Date().toDateString()
}); }

private async getOrCreateCartId(): Promise<string>{
  const cartId = localStorage.getItem('cartId');
  if (cartId) return cartId;
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return  result.key;
  }

async getCart():Promise<Observable<ShoppingCart>>{
    const cartId = await this.getOrCreateCartId();
   return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map(cart => new ShoppingCart(cart['items'])))
  }

async addToCart(product: Product){
    this.updateItem(product, 1);
  }

async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }



private getItem(cartId: string, productId: string){
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}


async clearCart(){
  const cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
}

private async updateItem(product: Product, change: number){
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, product.$key); //firebase observablle is made with the cartid from firebase and productid from the clicked product.
    itemRef.valueChanges().pipe(take(1)).subscribe(item => {
       const quantity =  (item['quantity'] || 0) + change;
      if (quantity === 0) itemRef.remove();
      else itemRef.update({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: quantity
    });
    });
  }
}
