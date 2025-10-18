import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@core/interfaces/category';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-show-all-categories',
  standalone: true,
  // imports: [ CommonModule, MatPaginatorModule, MatTableModule ],
  imports: [ CommonModule ],
  templateUrl: './show-all-categories.component.html',
  styleUrl: './show-all-categories.component.scss',
})
export class ShowAllCategoriesComponent implements OnInit {
  categories: any[] = [];
  displayedColumns: string[] = [ 'name', 'Actions'];
  // dataSource = new MatTableDataSource<Category>(this.categories);

  // @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data;
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator ? this.paginator : null;
  }

  viewTags(cat_id: number | string) {
    this.router.navigateByUrl(`admin/tags/${cat_id}`);
  }

  addCategory() {
    this.router.navigateByUrl(`admin/category/create`);
  }

  editCategory(cat_id: number) {
    console.log('Editing category with ID:', cat_id);
    this.router.navigateByUrl(`admin/category/update/${cat_id}`);
  }

  deleteCategory(cat_id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(cat_id).subscribe({
        next: () => {
          alert('Category deleted successfully!');
          this.categories = this.categories.filter(
            (category) => category.cat_id !== cat_id
          );
        },
        error: () => {
          alert('Failed to delete category. Please try again.');
        },
      });
    }
  }
}
