import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../common/service/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../common/service/order.service';
import { AuthService } from '../common/service/auth.service';
import { Order } from '../models/order';
import { Shipping } from '../models/shipping';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping : Shipping = {
    name: '',
    line1: '',
    line2: '',
    city:''

  };
  cart: ShoppingCart;
  userId: string;
  subscription:Subscription;
  subscripionUser: Subscription;
  constructor(private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
    this.subscripionUser = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {

    let order = new Order(this.userId, this.shipping,  this.cart);
    console.log(order);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
   this.subscripionUser.unsubscribe();
  }

}
