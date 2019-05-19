import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupperMappingComponent } from './supper-mapping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.modul';
import { SendSupperMappingService } from './send-supper-mapping.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    SendSupperMappingService
  ],
  declarations: [SupperMappingComponent],
  exports: [SupperMappingComponent]
})
export class SupperMappingModule { }
