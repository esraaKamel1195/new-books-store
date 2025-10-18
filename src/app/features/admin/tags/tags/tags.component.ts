import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tag } from '@core/interfaces/tag';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  // imports: [ CommonModule, MatPaginatorModule, MatTableModule ],
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit, AfterViewInit {
  tags: Tag[] = [];
  categoryId: string | number = '';
  displayedColumns: string[] = ['name', 'tags', 'actions'];
  // dataSource = new MatTableDataSource<Tag>(this.tags);

  // @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.categoryId = params['categoryId'];
    });

    this.categoryService.getTagsByCategory(this.categoryId).subscribe({
      next: (response) => {
        console.log('response', response);
        this.tags = response.tags;
        // this.dataSource = new MatTableDataSource<Tag>(this.tags);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator ? this.paginator : null;
  }

  addTag() {
    this.router.navigate([`tags/create`]);
  }

  edit(id: number | string = 0) {
    console.log('Editing tag with ID:', id);
    this.router.navigate([`tags/update/${id}`]);
  }

  deleteTag(id: number | string = 0) {
    if (confirm('Are you sure you want to delete this tag?')) {
      this.categoryService.deleteTag(id).subscribe({
        next: () => {
          alert('Tag deleted successfully!');
          this.tags = this.tags.filter((tag) => tag.id !== id);
        },
        error: () => {
          alert('Failed to delete tag. Please try again.');
        },
      });
    }
  }
}
