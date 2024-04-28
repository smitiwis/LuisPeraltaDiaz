import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutesRegisterModule } from './routes/RegisterRouting.module';
import { SharedModule } from '../../components/shared.module';

import { RegisterComponent } from './register.component';

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
  providers: [provideHttpClient()],

})
export class RegisterModule { }
