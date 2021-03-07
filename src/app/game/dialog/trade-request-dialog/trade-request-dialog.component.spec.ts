import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRequestDialogComponent } from './trade-request-dialog.component';

describe('TradeRequestDialogComponent', () => {
  let component: TradeRequestDialogComponent;
  let fixture: ComponentFixture<TradeRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
