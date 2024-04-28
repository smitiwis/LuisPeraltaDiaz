import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRegisterModule } from './routes/RegisterRouting.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProductComponent } from './components/form-product/form-product.component';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    RegisterComponent,
    FormProductComponent
  ],
  imports: [
    CommonModule,
    RoutesRegisterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class RegisterModule { }
