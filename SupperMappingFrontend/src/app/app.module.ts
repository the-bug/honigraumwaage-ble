import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SupperMappingComponent } from './supper-mapping/supper-mapping.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.modul';
import { SendSupperMappingService } from './common/send-supper-mapping.service';
import { OverviewComponent } from './overview/overview.component';



const appRoutes: Routes = [
   { path: 'enter', component: SupperMappingComponent },
   { path: 'overview', component: OverviewComponent },
   { path: '', component: HomeComponent },
   {
      path: '',
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
      HomeComponent,
      SupperMappingComponent,
      OverviewComponent
   ],
   imports: [
      RouterModule.forRoot(appRoutes,
      ),
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule
   ],
   providers: [
      SendSupperMappingService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }