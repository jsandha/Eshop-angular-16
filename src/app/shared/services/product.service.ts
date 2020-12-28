import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
   return this.db.list('/products').push(product);
  }
  get(productId){
    return this.db.object('/products/' + productId);
  }
  getAll(): AngularFireList<Product[]>{
    return this.db.list('/products');
  }
  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
