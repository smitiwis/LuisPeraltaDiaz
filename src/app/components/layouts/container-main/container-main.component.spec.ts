import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerMainComponent } from './container-main.component';
import { SharedModule } from '@components/shared.module';

describe('ContainerMainComponent', () => {
  let component: ContainerMainComponent;
  let fixture: ComponentFixture<ContainerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule], // Importa el SharedModule que contiene ContainerMainComponent
      declarations: [ContainerMainComponent], // Declara el componente que estás probando
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
