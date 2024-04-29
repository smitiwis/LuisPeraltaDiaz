import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { productInterceptor } from '@interceptors/interceptor-product';
import { SHARED_COMPONENTS } from './index';

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module.forRoot()],
  exports: [...SHARED_COMPONENTS],
  providers: [provideHttpClient(withInterceptors([productInterceptor]))],
})
export class SharedModule {}
