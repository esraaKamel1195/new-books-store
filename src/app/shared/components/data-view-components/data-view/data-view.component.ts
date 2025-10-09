import { Component, signal } from '@angular/core';
//import { Product } from '@/domain/product';
//import { ProductService } from '@/service/productservice';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './interface';
import { MOCK_PRODUCTS } from './data';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-data-view',
  imports: [
    CommonModule,
    FormsModule,
    DataView,
    Tag,
    Rating,
    ButtonModule,
    SelectButton,
    TableModule
  ],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.scss',
})
export class DataViewComponent {
  layout: "list" | "grid" = 'grid';

  products = signal<Product[]>([]);

  options = ['list', 'grid'];

  //constructor(private readonly productService: ProductService) {}

  ngOnInit() {
    // this.productService.getProducts().then((data) => {
    //   this.products.set([...data.slice(0, 12)]);
    // });
    this.products.set([...MOCK_PRODUCTS]);
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warn';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }
}
