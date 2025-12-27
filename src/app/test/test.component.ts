import { Component } from '@angular/core';
import { TableComponent } from '@shared/components/data-view-components/table/table.component';
import { NewTableComponent } from "@shared/components/data-view-components/table/new-table/new-table.component";

@Component({
  selector: 'app-test',
  imports: [TableComponent, NewTableComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {

}
