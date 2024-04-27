import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_COMPONENTS } from './index';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule ],
  exports: [...SHARED_COMPONENTS],
})
export class SharedModule {}
