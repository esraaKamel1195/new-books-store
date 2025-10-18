import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '@core/interfaces/category';
import { Tag } from '@core/interfaces/tag';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-carousel.component.html',
  styleUrl: './category-carousel.component.scss',
})
export class CategoryCarouselComponent implements OnInit {
  currentIndex: number = 0;
  tags_Show: boolean = false;
  categories: Category[] = [];
  tags: Tag[] = [];
  @Output() onCategoryChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onTagChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private readonly route: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  get visibleCategories() {
    const visible: Category[] = [];
    for (let i = 0; i < 6; i++) {
      visible.push(
        this.categories[(this.currentIndex + i) % this.categories.length]
      );
    }
    return visible;
  }

  next() {
    if (this.currentIndex < this.categories.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.categories.length - 1;
    }
  }

  goToCategoryPage(cat_id: number) {
    this.onCategoryChange.emit(cat_id);
    if( !this.route.url.includes(`/stories-by-category`) ) {
      this.route.navigateByUrl(`stories-by-category/${cat_id}`);
    } else {
      this.categoryService.getTagsByCategory(cat_id).subscribe({
        next: (tags) => {
          this.tags_Show = true;
          console.log('tags', tags);
          this.tags = tags;
        }, error: (error) => {
          console.log(error);
        }
      });
    }
  }

  getStoriesByTag(tagId: number) {
    this.onTagChange.emit(tagId);
  }
}
