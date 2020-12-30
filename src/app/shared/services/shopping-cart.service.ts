
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

private create(){
    return this.db.list('/shopping-carts').push({// gives the cartId newly created
      dateCreated: new Date().toDateString().replace(/^\S+\s/,''),
}); }

private getItem(cartId: string, productId: string){
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}

private async getOrCreateCartId(): Promise<string>{
  const cartId = localStorage.getItem('cartId');
  if (cartId) return cartId;
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return  result.key;
  }

private async updateItem(product: Product, change: number){
    const cartId: string = await this.getOrCreateCartId();// get the id
    const itemRef: AngularFireObject<unknown> = this.getItem(cartId, product.$key); //get iteRef to the product
    const item$: Observable<unknown> = itemRef.valueChanges(); // get observable of item
    item$.pipe(take(1)).subscribe(item => {
      console.log(item)
       const quantity =  (item['quantity'] || 0) + change;
      if (quantity === 0)
        itemRef.remove();
      else
        itemRef.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity});
    });
  }
// :Promise<Observable<ShoppingCart>>
async getCart(){
    const cartId: string = await this.getOrCreateCartId();
   return this.db.list('shopping-carts/' + cartId).valueChanges().pipe(
     map(cart => new ShoppingCart(cart['items'])))

  }

async addToCart(product: Product){
    this.updateItem(product, 1);
  }

async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

async clearCart(){
  const cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
}
