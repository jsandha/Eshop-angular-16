import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
   return this.db.list('/products').push(product);
  }
  get(productId){
    return this.db.object('/products/' + productId);
  }
  getAll(){
    return this.db.list('/products').valueChanges();
  }
  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
