import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGesComponent } from './product-ges.component';

describe('ProductGesComponent', () => {
  let component: ProductGesComponent;
  let fixture: ComponentFixture<ProductGesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
