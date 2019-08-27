import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HarvestMappingComponent } from './harvest-mapping.component';
import { SupperMappingComponent } from './supper-mapping/supper-mapping.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendSupperMappingService } from './common/send-supper-mapping.service';
import { OverviewComponent } from './overview/overview.component';
import { CreateHarvestComponent } from './create-harvest/create-harvest.component';
import { SchleuderungDataService } from './common/schleuderung-data.service';
import { SendComponent } from './send/send.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.modul';
import { CommonModule } from '@angular/common';



const appRoutes: Routes = [
   {
      path: '', children: [
         { path: 'enter', component: SupperMappingComponent },
         { path: 'overview', component: OverviewComponent },
         { path: 'create-harvest', component: CreateHarvestComponent },
         { path: 'send', component: SendComponent },
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
      ]
   }
];

@NgModule({
   declarations: [
      HarvestMappingComponent,
      HomeComponent,
      SupperMappingComponent,
      OverviewComponent,
      CreateHarvestComponent,
      SendComponent
   ],
   imports: [
      RouterModule.forChild(appRoutes,
      ),
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,

   ],
   providers: [
      SendSupperMappingService,
      SchleuderungDataService
   ]
})
export class HarvestMappingModule { }
