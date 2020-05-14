import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'src/app/models/product';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product) {
   return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(this.documentToDomainObject))
    );
  }
  documentToDomainObject = _ => {
    let object :Product = _.payload.val();
    object.id = _.payload.key;
    return object;
}

  getProductById(productId:string) {
    return this.db.object('/products/'+ productId)
    .snapshotChanges()
    .pipe(
      map(this.documentToDomainObject)
    );
  }

  updateProduct(productId, product) {
    return this.db.object('/products/'+ productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
      
    
  }
}
