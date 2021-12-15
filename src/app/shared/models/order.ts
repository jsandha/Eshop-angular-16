import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: string;
    items: any[];
    totalCartPrice: number;
    constructor( public userId: string, public shipping: any, shoppingCart: ShoppingCart){
        this.datePlaced  = new Date().toDateString();
        this.totalCartPrice = shoppingCart.getTotalPriceCart()
        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price,
                productId: i.$key

              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            };
          });
    }
}
