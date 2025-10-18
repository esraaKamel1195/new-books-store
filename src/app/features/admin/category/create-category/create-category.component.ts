import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    RouterModule,
    // MatSelectModule,
    // MatInputModule,
    // MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({}); //form data and validation
  category: Category = { cat_id: 0, category_name: '' };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      cat_id: new FormControl(
        this.activatedRoute.snapshot.params['id']
          ? this.activatedRoute.snapshot.params['id']
          : null,
        []
      ),
      category_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    if (this.activatedRoute.snapshot.params['id']) {
      this.categoryService
        .showCategory(this.activatedRoute.snapshot.params['id'])
        .subscribe({
          next: (category: any) => {
            this.category = category.data;
            this.categoryForm.patchValue({
              category_name: this.category.category_name,
            });
          },
          error: (error) => {
            console.log('error', error);

          },
        });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.activatedRoute.snapshot.params['id']) {
        this.categoryService
          .updateCategory(
            this.categoryForm.value.cat_id,
            this.categoryForm.value.category_name
          )
          .subscribe({
            next: (response) => {
              alert('Updated successfully');
              this.categoryForm.reset();
              this.router.navigateByUrl(`admin/categories`);
            },
            error: (error) => {
              alert('Failed to add category. Please try again.');
            },
          });
      } else {
        this.categoryService
          .addCategory(this.categoryForm.value.category_name)
          .subscribe({
            next: (response) => {
              alert('added successfully');
              this.categoryForm.reset();
              this.router.navigateByUrl(`admin/categories`);
            },
            error: (error) => {
              alert('Failed to add category. Please try again.');
            },
          });
      }
    } else {
      alert('Please enter a valid category name.');
    }
  }
}
