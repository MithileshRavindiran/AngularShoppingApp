import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/common/service/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/common/service/shopping-cart.service';
import { isNgTemplate } from '@angular/compiler';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser:AppUser;
  cart$:Observable<ShoppingCart>;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) {
    console.log('NavBar Constructor');
    
   }

  async ngOnInit() {
    console.log('Inside Nav Bar Ng On It')
    this.authService.appUser$.subscribe(appUser =>  {
      this.appUser = appUser;
    });

    this.cart$ =(await this.shoppingCartService.getCart());
    // cart$.subscribe(x => {
    //   console.log(x.totalItemsCount)
    //   this.shoppingCartItemCount  = x.totalItemsCount;
    // });
    // cart$.subscribe(cart => {
    //   for (let productId in  cart.items) {
    //     console.log('hello');
    //     console.log(productId);
    //     console.log(cart.items[productId].product.id);
    //     console.log(cart.items[productId].quantity);
    //   }
    // })

    // x.items.forEach(item => {
      //   this.shoppingCartItemCount += item.quantity;
      // })
  }

  logOut() {
    this.authService.logout();
  }

}
