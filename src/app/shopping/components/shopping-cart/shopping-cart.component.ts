import { Component  } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
cart$;

  constructor(private cartService: ShoppingCartService) { }

clearCart(){
  this.cartService.clearCart();
}

 async ngOnInit() {
   this.cart$ = await this.cartService.getCart()
  }
}
