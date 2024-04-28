import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { RoutesEditModule } from './routes/EditRouting.module';
import { SharedModule } from '../../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [EditComponent],
  imports: [CommonModule, RoutesEditModule, SharedModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
})
export class EditModule {}
