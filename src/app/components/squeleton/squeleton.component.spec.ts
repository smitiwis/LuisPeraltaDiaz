import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqueletonComponent } from './squeleton.component';
import { SharedModule } from '@components/shared.module';

describe('SqueletonComponent', () => {
  let component: SqueletonComponent;
  let fixture: ComponentFixture<SqueletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SqueletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqueletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
