import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { SharedModule } from '@components/shared.module';
import { productInterceptor } from '@interceptors/interceptor-product';

import { EditComponent } from './edit.component';
import { RoutesEditModule } from './routes/EditRouting.module';

@NgModule({
  declarations: [EditComponent],
  imports: [CommonModule, RoutesEditModule, SharedModule, ReactiveFormsModule],
  providers: [provideHttpClient(withInterceptors([productInterceptor]))],
})
export class EditModule {}
