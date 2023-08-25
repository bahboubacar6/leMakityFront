import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMvtStkProduitComponent } from './detail-mvt-stk-produit.component';

describe('DetailMvtStkProduitComponent', () => {
  let component: DetailMvtStkProduitComponent;
  let fixture: ComponentFixture<DetailMvtStkProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMvtStkProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMvtStkProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
