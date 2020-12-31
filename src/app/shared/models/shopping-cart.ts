import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
 items: ShoppingCartItem[] = [];

constructor(private itemsMap: {[productId: string]: ShoppingCartItem}){
    this.itemsMap = itemsMap || {}; // initialize item map with empty object or with itemsmap

    for (const productId in itemsMap){
    const item = itemsMap[productId];// itterate over items
    this.items.push(new ShoppingCartItem({...item, $key: productId}));// it pushes item in the array and adds the productid as $key
    }
}

getQuantity(product: Product){
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

get totalPrice(){
    let sum = 0;
    for (const productId in this.items)
     sum += this.items[productId].totalPrice;
    return sum;
}

get totalItemsCount(){
    let count = 0;
    for (const productId in this.itemsMap)// very interesting
        count += this.itemsMap[productId].quantity;
    return count;
    }

  getTotalPriceCart(){
      let sum = 0;
    for (const productId in this.items)// very interesting
        sum += this.items[productId].totalPrice;
    return sum;
    }
}
