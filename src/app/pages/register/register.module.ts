import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRegisterModule } from './routes/RegisterRouting.module';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RoutesRegisterModule
  ]
})
export class RegisterModule { }
