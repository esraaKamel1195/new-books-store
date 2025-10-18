import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartReadingComponent } from './start-reading.component';

describe('StartReadingComponent', () => {
  let component: StartReadingComponent;
  let fixture: ComponentFixture<StartReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
