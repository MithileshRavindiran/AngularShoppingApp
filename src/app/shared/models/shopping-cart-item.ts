import { Product } from './product';

export class ShoppingCartItem {
  constructor(public product: Product, public quantity: number) {

  }

  //flattened object constructor
  // constructor(init?:Partial<ShoppingCartItem>) {
  //Object.assign(this,init);
  // }


  get totalPrice(): number {
    return this.product.price * this.quantity;
  }
}