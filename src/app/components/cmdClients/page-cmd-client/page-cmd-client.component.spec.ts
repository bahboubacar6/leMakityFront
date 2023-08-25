import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCmdClientComponent } from './page-cmd-client.component';

describe('PageCmdClientComponent', () => {
  let component: PageCmdClientComponent;
  let fixture: ComponentFixture<PageCmdClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCmdClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
