import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMvtStkComponent } from './page-mvt-stk.component';

describe('PageMvtStkComponent', () => {
  let component: PageMvtStkComponent;
  let fixture: ComponentFixture<PageMvtStkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMvtStkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMvtStkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
