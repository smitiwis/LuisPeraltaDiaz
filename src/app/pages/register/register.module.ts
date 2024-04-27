import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRegisterModule } from './routes/RegisterRouting.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RoutesRegisterModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
