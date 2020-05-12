import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/service/category.service';
import { ProductService } from 'src/app/common/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
   }

  ngOnInit(): void {
  }

  save(product) {
    this.productService.create(product);
    console.log(product);
  }

}
