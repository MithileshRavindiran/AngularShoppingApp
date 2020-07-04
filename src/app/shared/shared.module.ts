import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthService } from './common/service/auth.service';
import { CategoryService } from './common/service/category.service';
import { AuthGuard } from './common/service/guard/auth-guard.service';
import { OrderService } from './common/service/order.service';
import { ProductService } from './common/service/product.service';
import { ShoppingCartService } from './common/service/shopping-cart.service';
import { UserService } from './common/service/user.service';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { ProductQuantityComponent } from './component/product-quantity/product-quantity.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
