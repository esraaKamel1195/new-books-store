import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Story } from '@core/interfaces/story';
import { StoryService } from '@core/services/story.service';

@Component({
  selector: 'app-reading-later',
  standalone: true,
  // imports: [CommonModule, MatPaginatorModule, MatTableModule],
  imports: [CommonModule],
  templateUrl: './reading-later.component.html',
  styleUrl: './reading-later.component.css'
})
export class ReadingLaterComponent implements OnInit, AfterViewInit {
  stories: Story[] = [];
  displayedColumns: string[] = ['title', 'category', 'publication_status', 'symbol', 'Actions'];
  // dataSource = new MatTableDataSource<Story>(this.stories);

  // @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly storyService: StoryService
  ) {}

  ngOnInit(): void {
    this.storyService.getAllStories().subscribe({
      next: (response: any) => {
        console.log('stories', response);
        this.stories = response;
      },
      error: (error: any) => {
        console.error('Error retrieving contacts:', error);
      },
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator? this.paginator: null;
  }

  edit(id: number = 0) {
    console.log('Editing category with ID:', id);
    this.router.navigate([`category/update/${id}`]);
  }

  deleteStory(id: number = 0) {
    if (confirm('Are you sure you want to delete this story?')) {
      this.storyService.deleteStory(id).subscribe({
        next: () => {
          alert('Story deleted successfully!');
          this.stories = this.stories.filter(
            (story) => story.id !== id
          );
        },
        error: (error) => {
          console.log(error);
          alert('Failed to delete story. Please try again.');
        },
      });
    }
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
];
