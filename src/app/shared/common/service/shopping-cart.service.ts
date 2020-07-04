import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireDatabase, SnapshotAction, AngularFireList } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async addOrRemoveToCart(product: Product, add: boolean) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);
    item$.snapshotChanges().pipe(
      take(1)
    ).subscribe(item => {
      let currentQuantity = ((item.key != null) ? item.payload.val()['quantity'] : 0);
      let quantityToBeUpdated = ((add) ? (currentQuantity + 1) : (currentQuantity - 1))
      if (quantityToBeUpdated === 0) {
        item$.remove();
      } else {
        item$.update({
          product: product,
          quantity: quantityToBeUpdated
        });
      }
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map(x => {
          if (x.length > 1) {
            return new ShoppingCart(x[1].payload.val() as any);
          } else {
            return new ShoppingCart();
          }
        })
      );
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }



  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }



  documentToDomainShoppingCartOld = _ => {
    let object: ShoppingCart = _.payload.val();
    return object;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      //for async calling of  a promise
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

    return cartId;
  }






}
