import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_COMPONENTS } from './index';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { productInterceptor } from '../interceptors/interceptor-product';

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module.forRoot()],
  exports: [...SHARED_COMPONENTS],
  providers: [provideHttpClient(withInterceptors([productInterceptor]))],
})
export class SharedModule {}
