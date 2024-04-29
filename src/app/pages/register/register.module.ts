import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutesRegisterModule } from './routes/RegisterRouting.module';
import { SharedModule } from '../../components/shared.module';

import { RegisterComponent } from './register.component';
import { productInterceptor } from '../../interceptors/interceptor-product';

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
