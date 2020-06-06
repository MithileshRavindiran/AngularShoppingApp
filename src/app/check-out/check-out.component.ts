import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../common/service/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  
  cart$: Observable<ShoppingCart>;
  subscription:Subscription;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
     this.cart$ = await this.shoppingCartService.getCart();
  }

  
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
