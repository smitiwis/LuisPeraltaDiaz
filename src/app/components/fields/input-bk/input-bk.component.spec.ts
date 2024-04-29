import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputBkComponent } from './input-bk.component'; // Importa el componente que vas a probar
import { SharedModule } from '@components/shared.module';

describe('InputBkComponent', () => {
  let component: InputBkComponent;
  let fixture: ComponentFixture<InputBkComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule], // Importa los módulos necesarios
      declarations: [InputBkComponent], // Declara el componente en el arreglo de declaraciones
    }).compileComponents(); // En Angular actual, no es necesario usar compileComponents

    fixture = TestBed.createComponent(InputBkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
