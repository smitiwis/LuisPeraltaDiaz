import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoutesHomeModule } from './routes/HomeRouting.module';
import { TableListComponent } from './components/table-list/table-list.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SharedModule } from '../../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [HomeComponent, TableListComponent],
  imports: [
    CommonModule,
    RoutesHomeModule,
    SharedModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [provideHttpClient()],
})
export class HomeModule {}
