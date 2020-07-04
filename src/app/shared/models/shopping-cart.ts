import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCartService } from 'shared/common/service/shopping-cart.service';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    dateCreated: number;

    constructor(private itemsMap?: { [productId: number]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (const productId in itemsMap) {
           
            const item = itemsMap[productId] as any;
            //flattening the object
            //let x = new ShoppingCartItem({
                //title:  item.title,
                //imageUrl: item.imageUrl,
                //price: item.price,
                //or
                //...item,
                //$key: productId

            //});
            // let x =  new ShoppingCartItem();
            // Object.assign(x, item);
            //x.$key = productId

            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalItemsCount(): number {
        console.log("Inside Total items cout");
        let shoppingCartItemCount = 0;
        this.items.forEach(item => {
            shoppingCartItemCount += item.quantity;
        });
        return shoppingCartItemCount;
    }

    get totalPrice():number {
        let totalPrice = 0;
        let sum = 0;
        this.items.forEach(item => {
            totalPrice += item.totalPrice;
        });
        return totalPrice;
    }

    getQuantity(product: Product) {
    
         let matchedItem : ShoppingCartItem;
          this.items.forEach(x => {
           if (x.product.id === product.id) {
             matchedItem = x;
           }
          });
         
         
        return matchedItem ? matchedItem.quantity : 0;
      }
    
}