import { RouterLink, RouterModule } from '@angular/router';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatRadioModule } from '@angular/material/radio';
import {
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
// import {
//   FloatLabelType,
//   MatFormFieldModule,
// } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
// import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-create-story',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    // MatSelectModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRadioModule,
    CommonModule,
    // MatChipsModule,
    // MatIconModule,
  ],
  templateUrl: './create-story.component.html',
  styleUrl: './create-story.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateStoryComponent {
  form: FormGroup;
  readonly reactiveKeywords = signal<string[]>([]);
  readonly reactiveCharacter = signal<string[]>([]);
  readonly formControl = new FormControl([]);

  // announcer = inject(LiveAnnouncer);

  constructor(
    private readonly fb: FormBuilder,
    private readonly announcer: LiveAnnouncer
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      language: ['', Validators.required],
      mature: ['', Validators.required],
      image: [''],
      characters: this.fb.array([]),
      tags: this.fb.array([]),
    });
  }

  get characters() {
    return this.form.get('characters') as FormArray;
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  //for tags

  removeReactiveKeyword(tag: string) {
    this.reactiveKeywords.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`removed ${tag} from reactive form`);
      return [...tags];
    });
  }

  addReactiveKeyword(event: any): void {
    const value = (event.value || '').trim();
    //adding
    if (value) {
      this.reactiveKeywords.update((tags) => [...tags, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }
    //clear
    event.chipInput!.clear();
  }

  //for main character

  removeReactiveCharacter(character: string) {
    this.reactiveCharacter.update((characters) => {
      const index = characters.indexOf(character);
      if (index < 0) {
        return characters;
      }

      characters.splice(index, 1);
      this.announcer.announce(`removed ${character} from reactive form`);
      return [...characters];
    });
  }

  addReactiveCharacter(event: any): void {
    const value = (event.value || '').trim();
    //adding
    if (value) {
      this.reactiveCharacter.update((characters) => [...characters, value]);
      // this.announcer.announce(`added ${value} to reactive form`);
    }
    //clear
    event.chipInput!.clear();
  }

  trackByCharacter(index: number, item: string): string {
    return item;
  }
}
