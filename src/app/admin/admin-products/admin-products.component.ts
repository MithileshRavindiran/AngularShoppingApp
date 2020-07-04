import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/common/service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  //products: Product[];
  //filteredProducts: Product[];
  subscription:Subscription;
  displayedColumns: string[] = ['title', 'price', 'edit'];
  products: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private productService:ProductService) {
   this.subscription = productService.getAllProducts().subscribe(x => {
     //this.products = x;
     this.products = new MatTableDataSource(x);
     this.products.paginator  = this.paginator;
     this.products.sort = this.sort;
     
    });
   }
  ngOnInit(): void {
  }

  //Normal Table Filter Query
  // filter(queryValue)  {
  //  this.filteredProducts = (queryValue) ? 
  //  this.products.filter(product => product.title.toLowerCase().includes(queryValue.toLowerCase())) : 
  //  this.products;
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

}
