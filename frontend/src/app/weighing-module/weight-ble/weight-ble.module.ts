import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightBleComponent } from './weight-ble.component';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { MaterialModule } from 'src/app/material.modul';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WeightBleComponent,
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    CommonModule,
    WebBluetoothModule.forRoot({
      enableTracing: false // or false, this will enable logs in the browser's console
    }),
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeightBleComponent]
})
export class WeightBleModule { }
