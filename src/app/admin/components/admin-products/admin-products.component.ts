import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  subscription: Subscription;
  // tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

    constructor(private productService: ProductService) {
      this.subscription = this.productService.getAll()
      .subscribe(products => {
        // this.products = products;

        //  this.initializeTable(products);
      });
      }

  // private initializeTable(products: Product[]){
  //    this.tableResource = new DataTableResource(products);
  //       this.tableResource.query({ offset: 0})// Display the record on page 1
  //       .then(items => this.items = items);
  //       this.tableResource.count() // returns total number of records in a table
  //       .then(count => this.itemCount = count);
  // }

  reloadItems(params){
    // if (!this.tableResource) return;

    // this.tableResource.query(params)
    // .then(items => this.items = items);
  }
  filter(query: string){
    const filteredProducts = (query) ?
     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
     this.products;
    //  this.initializeTable(filteredProducts);
    }

  ngOnDestroy(){
      this.subscription.unsubscribe();
    }
}
