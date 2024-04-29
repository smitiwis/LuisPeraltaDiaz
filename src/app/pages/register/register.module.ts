import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { SharedModule } from '@components/shared.module';
import { productInterceptor } from '@interceptors/interceptor-product';

import { RegisterComponent } from './register.component';
import { RoutesRegisterModule } from './routes/RegisterRouting.module';



@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    AsyncPipe,
    CommonModule,
    RoutesRegisterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withInterceptors([productInterceptor]))],

})
export class RegisterModule { }
