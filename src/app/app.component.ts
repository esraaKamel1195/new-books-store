import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { DataViewComponent } from '@shared/components/data-view-components/data-view/data-view.component';
import { HeaderComponent } from '@shared/layout/header/header.component';
import { FooterComponent } from "@shared/layout/footer/footer.component";

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
    DataViewComponent,
    RouterModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  value = '';
  title = 'new-books-store';
  showCount = signal(false);
  count = signal(0);
  conditionalCount = computed(() => {
    if (this.showCount()) {
      return `The count in conditional countted is from computed ${this.count()}.`;
    } else {
      return 'Nothing to see here!';
    }
  });

  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');

    effect(() => {
      console.log('AppComponent initialized 3 from effect');
      console.log(`The current count is: ${this.count()}`);
    });
  }

  ngOnInit() {
    //console.log('AppComponent initialized 1');
    //console.log(this.conditionalCount());
    this.count.set(this.count() + 1);
    this.showCount.set(true);
    this.count.set(this.count() + 1);
    this.count.set(this.count() + 1);
    this.count.set(this.count() + 1);
    this.count.set(this.count() + 1);
    this.count.set(this.count() + 1);
    this.count.set(this.count() + 1);
    this.count.set(this.count() + 1);
    this.count.set(this.count() + 1);
    //console.log(this.conditionalCount());
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
    this.count.set(this.count() + 1);
  }
}
