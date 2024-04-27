import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoutesHomeModule } from './routes/HomeRouting.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RoutesHomeModule
  ]
})
export class HomeModule { }
