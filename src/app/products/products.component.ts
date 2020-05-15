import { Component, OnInit } from '@angular/core';
import { ProductService } from '../common/service/product.service';
import { CategoryService } from '../common/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  filteringCategory;
  constructor(private productsService: ProductService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {
    
    productsService.getAllProducts().pipe(
      switchMap(products => {
        this.products = products;
        return this.activatedRoute.queryParamMap;
      })
    ).subscribe(params => {
      this.filteringCategory = params.get('category');
      this.filteredProducts = (this.filteringCategory) ? this.products.filter(p => p.category === this.filteringCategory) : this.products;
    });
    
    //Old Way to subscribe
    // productsService.getAllProducts().subscribe(p => {
    //   this.products = p;

    //   this.activatedRoute.queryParamMap
    //     .subscribe(params => {
    //       this.filteringCategory = params.get('category');
    //       this.filteredProducts = (this.filteringCategory) ? this.products.filter(p => p.category === this.filteringCategory) : this.products;
    //     });
    // });
    this.categories$ = categoryService.getCategories().snapshotChanges();

  }

  ngOnInit(): void {
  }

}
