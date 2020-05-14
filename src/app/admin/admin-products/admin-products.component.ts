import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/common/service/product.service';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription:Subscription;
  constructor(private productService:ProductService) {
   this.subscription = productService.getAllProducts().subscribe(x => this.filteredProducts = this.products = x);
   }
  ngOnInit(): void {
  }

  filter(queryValue)  {
   this.filteredProducts = (queryValue) ? 
   this.products.filter(product => product.title.toLowerCase().includes(queryValue.toLowerCase())) : 
   this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
