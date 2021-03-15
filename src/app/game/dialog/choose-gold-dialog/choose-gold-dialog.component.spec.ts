import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGoldDialogComponent } from './choose-gold-dialog.component';

describe('ChooseGoldDialogComponent', () => {
  let component: ChooseGoldDialogComponent;
  let fixture: ComponentFixture<ChooseGoldDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseGoldDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseGoldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
