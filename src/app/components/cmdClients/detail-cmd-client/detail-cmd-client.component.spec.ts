import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCmdClientComponent } from './detail-cmd-client.component';

describe('DetailCmdClientComponent', () => {
  let component: DetailCmdClientComponent;
  let fixture: ComponentFixture<DetailCmdClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCmdClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
