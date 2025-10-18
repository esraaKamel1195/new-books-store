import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingLaterComponent } from './reading-later.component';

describe('ReadingLaterComponent', () => {
  let component: ReadingLaterComponent;
  let fixture: ComponentFixture<ReadingLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingLaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
