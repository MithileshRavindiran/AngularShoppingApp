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

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    
  }

}
