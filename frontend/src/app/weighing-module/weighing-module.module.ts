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
import { WeightCommunicationService } from './weight-communication.service';

const routes: Routes = [
  {
    path: '',
    component: WeighingModuleComponent,
    children: [
      {
        path: 'manuell',
        loadChildren: () => import('./weight-manuell/weight-manuell.module').then(mod => mod.WeightManuellModule),
      },
      {
        path: 'ble',
        loadChildren: () => import('./weight-ble/weight-ble.module').then(mod => mod.WeightBleModule),
      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CouchDBService,
    SendDialogService,
    WeightCommunicationService
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
