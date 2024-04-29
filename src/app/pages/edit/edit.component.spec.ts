import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { EditModule } from './edit.module';
import { ProductService } from '@services/services.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { productInterceptor } from '@interceptors/interceptor-product';
import { RouterModule } from '@angular/router';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditModule,
        RouterModule.forRoot([{ path: 'edit', component: EditComponent }]),
      ],
      declarations: [EditComponent],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
