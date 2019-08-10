import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeighingModuleComponent } from './weighing-module.component';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { MaterialModule } from '../material.modul';
import { FormsModule } from '@angular/forms';
import { SendDialogComponent } from './send-dialog/send-dialog.component';
import { SchleuderungSelectionComponent } from './schleuderung-selection/schleuderung-selection.component';
import { CouchDBService } from './couch-db.service';
import { SendDialogService } from './send-dialog.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WeighingModuleComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    WebBluetoothModule.forRoot({
      enableTracing: true // or false, this will enable logs in the browser's console
    }),
    RouterModule.forChild(routes)
  ],
  providers: [
    CouchDBService,
    SendDialogService
  ],
  declarations: [
    WeighingModuleComponent,
    SendDialogComponent,
    SchleuderungSelectionComponent
  ],
  entryComponents: [
    SendDialogComponent,
  ],
})
export class WeighingModuleModule { }
