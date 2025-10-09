import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

// translate
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  value = '';
  title = 'new-books-store';
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  changeLang() {
    if (this.translate.getCurrentLang() === 'en') {
      this.translate.use('ar');
      document.body.dir = 'rtl';
    } else {
      this.translate.use('en');
      document.body.dir = 'ltr';
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}
