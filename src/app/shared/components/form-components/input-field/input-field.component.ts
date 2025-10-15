import { Component, input, InputSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-input-field',
  imports: [FormsModule, InputTextModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  value: InputSignal<string> = input<string>('');
  
}
