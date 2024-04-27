import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBkComponent } from './input-bk.component';

describe('InputBkComponent', () => {
  let component: InputBkComponent;
  let fixture: ComponentFixture<InputBkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputBkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
