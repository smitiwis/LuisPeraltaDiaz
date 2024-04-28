import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { RoutesRegisterModule } from './routes/RegisterRouting.module';
import { SharedModule } from '../../components/shared.module';

import { FormProductComponent } from './components/form-product/form-product.component';
import { RegisterComponent } from './register.component';

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
    SweetAlert2Module.forRoot()
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class RegisterModule { }
