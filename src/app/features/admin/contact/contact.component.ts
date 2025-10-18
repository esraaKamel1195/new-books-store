import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contact } from '@core/interfaces/contact';
import { ContactService } from '@core/services/contact.service';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    // MatPaginatorModule,
    // MatTableModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'Actions'];
  //dataSource = new MatTableDataSource<Contact>(this.contacts);

  //@ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private readonly contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: (response: any) => {
        this.contacts = response.data;
      },
      error: (error: any) => {
        console.error('Error retrieving contacts:', error);
      },
    });
  }

  viewMessage(id: number) {

  }

  deleteMessage(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.contactService.deleteMessage(id).subscribe({
        next: () => {
          alert('Message deleted successfully!');
          this.contacts = this.contacts.filter((contact) => contact.id !== id);
        },
        error: () => {
          alert('Failed to delete message. Please try again.');
        },
      });
    }
  }
}
