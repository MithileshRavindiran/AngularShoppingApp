import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product) {
   return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products');
  }

  getProductById(productId:string) {
    return this.db.object('/products/'+ productId);
  }

  updateProduct(productId, product) {
    return this.db.object('/products/'+ productId).update(product);
  }

  deleteProduct(productId) {
    console.log('Inside Delte' + productId);
    return this.db.object('/products/' + productId).remove();
      
    
  }
}
