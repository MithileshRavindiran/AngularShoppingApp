import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCartService } from '../common/service/shopping-cart.service';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    dateCreated: number;

    constructor(private itemsMap: { [productId: number]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (const productId in itemsMap) {
            const item = itemsMap[productId] as any;
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
          }
    }
}