import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../common/service/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product : Product;
  @Input('show-actions') showActions:true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addOrRemoveToCart(this.product, true);
  }

  removeFromCart() {
    this.cartService.addOrRemoveToCart(this.product, false);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

     console.log('inside get quantity');
     console.log(this.shoppingCart);
     let matchedItem : ShoppingCartItem;
      this.shoppingCart.items.forEach(x => {
       if (x.product.id === this.product.id) {
         matchedItem = x;
       }
      });
     
     
    return matchedItem ? matchedItem.quantity : 0;
  }

}
