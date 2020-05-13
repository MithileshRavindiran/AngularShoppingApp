import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/service/category.service';
import { ProductService } from 'src/app/common/service/product.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product= {};
  id;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private acitvatedRoute: ActivatedRoute) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges();
    this.categoryService.getCategories().valueChanges().subscribe(x => console.log(x));
    this.id = this.acitvatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProductById(this.id).snapshotChanges()
        .pipe(take(1))
        .subscribe(p => this.product = p.payload.val());
    }
  }

  ngOnInit(): void {
  }

  save(product) {
    console.log("Saving");
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    }
    else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure you  want to delete this product?'))  return


      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    
  }

}
