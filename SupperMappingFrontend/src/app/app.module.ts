import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.modul';
import { SupperMappingModule } from './supper-mapping/supper-mapping.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    SupperMappingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
