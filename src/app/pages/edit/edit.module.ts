import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { RoutesEditModule } from './routes/EditRouting.module';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    RoutesEditModule
  ]
})
export class EditModule { }
