import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexSvgComponent } from './hex-svg.component';

describe('HexSvgComponent', () => {
  let component: HexSvgComponent;
  let fixture: ComponentFixture<HexSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HexSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HexSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
