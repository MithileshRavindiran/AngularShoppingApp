import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../common/service/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product : Product;
  @Input('show-actions') showActions:true;
  @Input('shopping-cart') shoppingCart;

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
    //console.log(this.shoppingCart)
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.filter(x => x.key === 'items')[0]?.payload.val()[this.product.id];
    return item ? item['quantity'] : 0;
  }

}
