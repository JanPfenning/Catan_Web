import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearOfPlentyDialogComponent } from './year-of-plenty-dialog.component';

describe('YearOfPlentyDialogComponent', () => {
  let component: YearOfPlentyDialogComponent;
  let fixture: ComponentFixture<YearOfPlentyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearOfPlentyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearOfPlentyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
