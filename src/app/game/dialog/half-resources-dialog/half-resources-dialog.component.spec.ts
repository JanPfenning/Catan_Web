import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfResourcesDialogComponent } from './half-resources-dialog.component';

describe('HalfResourcesDialogComponent', () => {
  let component: HalfResourcesDialogComponent;
  let fixture: ComponentFixture<HalfResourcesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalfResourcesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfResourcesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
