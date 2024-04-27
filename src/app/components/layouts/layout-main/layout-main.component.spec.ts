import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainComponentComponent } from './layout-main.component';

describe('LayoutMainComponentComponent', () => {
  let component: LayoutMainComponentComponent;
  let fixture: ComponentFixture<LayoutMainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutMainComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
