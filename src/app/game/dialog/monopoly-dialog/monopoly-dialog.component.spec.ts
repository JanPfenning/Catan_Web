import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonopolyDialogComponent } from './monopoly-dialog.component';

describe('MonopolyDialogComponent', () => {
  let component: MonopolyDialogComponent;
  let fixture: ComponentFixture<MonopolyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonopolyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonopolyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
