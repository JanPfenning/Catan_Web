import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnCardsComponent } from './own-cards.component';

describe('OwnCardsComponent', () => {
  let component: OwnCardsComponent;
  let fixture: ComponentFixture<OwnCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
