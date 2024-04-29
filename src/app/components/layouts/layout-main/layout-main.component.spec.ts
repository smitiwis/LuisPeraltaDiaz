import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutMainComponent } from './layout-main.component';
import { SharedModule } from '@components/shared.module';

describe('LayoutMainComponent', () => {
  let component: LayoutMainComponent;
  let fixture: ComponentFixture<LayoutMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule], // Importa el SharedModule que contiene LayoutMainComponent
      declarations: [LayoutMainComponent], // Declara el componente que estás probando
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
