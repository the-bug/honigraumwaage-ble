import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupperMappingComponent } from './supper-mapping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.modul';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [SupperMappingComponent],
  exports: [SupperMappingComponent]
})
export class SupperMappingModule { }
