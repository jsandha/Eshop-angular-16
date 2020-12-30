
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
products: Product[] = [];
filteredProducts: Product[] = [];
category: string;
cart$: Observable<ShoppingCart>;

  constructor(
          private productService: ProductService,
          private route: ActivatedRoute,
          private cartService: ShoppingCartService) {}

async ngOnInit(){
   this.cart$ = await this.cartService.getCart();
   this.populateProducts();
}

private populateProducts(){
   this.productService
     .getAll().pipe(
     switchMap((products: Product[] )=> {
       this.products = products;
       return this.route.queryParamMap;
      }))
     .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
     });
}
private applyFilter(){
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category.toLowerCase() === this.category.toLowerCase())
        :this.products;
  }
}
