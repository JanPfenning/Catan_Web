import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertexComponent } from './vertex.component';

describe('VertexComponent', () => {
  let component: VertexComponent;
  let fixture: ComponentFixture<VertexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VertexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VertexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
