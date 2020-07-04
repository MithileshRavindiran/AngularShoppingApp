import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Shipping } from 'shared/models/shipping';
import { OrderService } from 'shared/common/service/order.service';
import { AuthService } from 'shared/common/service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css']
})
export class ShoppingFormComponent implements OnInit,OnDestroy {

  shipping : Shipping = {
    name: '',
    line1: '',
    line2: '',
    city:''

  };
  @Input('cart') cart: ShoppingCart;

  userId: string;
  subscripionUser: Subscription;
  constructor(private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscripionUser = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {

    let order = new Order(this.userId, this.shipping,  this.cart);
    console.log(order);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    this.subscripionUser.unsubscribe();
  }


}
