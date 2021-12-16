import { Component } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  dtOptions: DataTables.Settings = {};
  products: Product[];
  subscription: Subscription;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
