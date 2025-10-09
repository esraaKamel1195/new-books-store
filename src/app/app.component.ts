import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
// translate
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';
import { DataViewComponent } from "@shared/components/data-view-components/data-view/data-view.component";

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    TranslatePipe,
    TranslateDirective,
    DataViewComponent
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
