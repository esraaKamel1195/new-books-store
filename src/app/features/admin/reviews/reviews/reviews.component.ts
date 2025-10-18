import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReviewsService } from '@core/services/reviews.service';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface Review {
  id: number | string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  // imports: [CommonModule, MatPaginatorModule, MatTableModule],
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  reviews: Review[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  // dataSource = new MatTableDataSource<Review>(this.reviews);
  // @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.reviewsService.getAllReviews(5).subscribe({
      next: (response) => {
        console.log('response', response);
        this.reviews = response;
        // this.dataSource = new MatTableDataSource<Review>(this.reviews);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator ? this.paginator : null;
  }

  edit(id: number | string = 0) {
    console.log('Editing review with ID:', id);
    this.router.navigate([`review/update/${id}`]);
  }

  deleteReview(id: number | string = 0) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewsService.deleteFeedback(id).subscribe({
        next: () => {
          alert('Review deleted successfully!');
          this.reviews = this.reviews.filter((review) => review.id !== id);
        },
        error: () => {
          alert('Failed to delete tag. Please try again.');
        },
      });
    }
  }
}
