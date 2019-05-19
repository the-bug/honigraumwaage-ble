import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';      
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SupperMappingModule } from './supper-mapping/supper-mapping.module';
import { SupperMappingComponent } from './supper-mapping/supper-mapping.component';
import { HomeComponent } from './home/home.component';



const appRoutes: Routes = [
  { path: 'enter', component: SupperMappingComponent },
  { path: '', component: HomeComponent },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
     path: '**',
     redirectTo: '/',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    SupperMappingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }