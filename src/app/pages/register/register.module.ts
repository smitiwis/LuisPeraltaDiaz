import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRegisterModule } from './routes/RegisterRouting.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../components/shared.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RoutesRegisterModule,
    SharedModule
  ]
})
export class RegisterModule { }
