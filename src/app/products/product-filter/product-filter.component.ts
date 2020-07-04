import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/common/service/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input('filteringCategory') filteringCategory;
  categories$;
  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
   }

  ngOnInit(): void {
  }

}
