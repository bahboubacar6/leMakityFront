import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCmdPanierComponent } from './detail-cmd-panier.component';

describe('DetailCmdPanierComponent', () => {
  let component: DetailCmdPanierComponent;
  let fixture: ComponentFixture<DetailCmdPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCmdPanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCmdPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
