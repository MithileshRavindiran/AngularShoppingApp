import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/common/service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;
  filteredProducts;
  constructor(private productService:ProductService) {
    this.products$ = productService.getAllProducts();
    productService.getAllProducts().subscribe(x => {
       this.filteredProducts=x;
       console.log(x);
       console.log(this.filteredProducts);
     });
    
   }

  ngOnInit(): void {
  }

}
