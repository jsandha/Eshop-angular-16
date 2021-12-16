import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }
  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
  getAll(): Observable<Product[]> {
    const itemRef: AngularFireList<any> = this.db.list('/products');
    return itemRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
