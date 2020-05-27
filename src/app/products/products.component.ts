import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../common/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../common/service/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,  OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  filteringCategory;
  cart: ShoppingCart;
  cart$: Observable<ShoppingCart>;
  subscription:Subscription;

  constructor(
    private productsService: ProductService, 
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
    
    
    
    
    //Old Way to subscribe
    // productsService.getAllProducts().subscribe(p => {
    //   this.products = p;

    //   this.activatedRoute.queryParamMap
    //     .subscribe(params => {
    //       this.filteringCategory = params.get('category');
    //       this.filteredProducts = (this.filteringCategory) ? this.products.filter(p => p.category === this.filteringCategory) : this.products;
    //     });
    // });
    

  }

  async ngOnInit() {
     this.subscription = (await this.shoppingCartService.getCart()).subscribe((cart) => {
       this.cart = cart;
      }); 
      this.populateProducts();
      
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private populateProducts() {
    let x: ShoppingCart;
    
    this.productsService.getAllProducts().pipe(
      switchMap(products => {
        this.products = products;
        return this.activatedRoute.queryParamMap;
      })
    ).subscribe(params => {
      this.filteringCategory = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter()  {
    this.filteredProducts = (this.filteringCategory) ? this.products.filter(p => p.category === this.filteringCategory) : this.products;
  }

}
