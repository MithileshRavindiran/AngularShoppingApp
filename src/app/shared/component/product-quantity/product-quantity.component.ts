import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/common/service/shopping-cart.service';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product : Product;
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

  

}
