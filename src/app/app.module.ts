import { CouchDBService } from './couch-db.service';
import { MaterialModule } from './material.modul';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    WebBluetoothModule.forRoot({
      enableTracing: false // or false, this will enable logs in the browser's console
    }),
    HttpClientModule,
  ],
  providers: [
    CouchDBService
  ],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }
