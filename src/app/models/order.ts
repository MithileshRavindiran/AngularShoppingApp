import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';
import { Shipping } from './shipping';

export class Order {
    datePalced: number;
    items: any[];
    constructor(public userId: string, public shipping : Shipping, shoppingCart: ShoppingCart) {
        this.datePalced = new  Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.product.title,
                imageUrl: i.product.imageUrl,
                price: i.product.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
    }
}