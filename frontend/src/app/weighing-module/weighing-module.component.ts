import { Component, OnInit } from '@angular/core';
import { Schleuderung } from './send-dialog/send-dialog-data';
import { SendDialogService } from './send-dialog.service';
import { WeightCommunicationService } from './weight-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weighing-module',
  templateUrl: './weighing-module.component.html',
  styleUrls: ['./weighing-module.component.css']
})
export class WeighingModuleComponent implements OnInit {

  selectionMode: SelectionMode;
  selectionModeReady = false;

  weight: number;
  number: number;
  wirrbaunote: number;

  schleuderung: Schleuderung;

  constructor(
    private sendDialogService: SendDialogService,
    private weightCommunicationService: WeightCommunicationService,
    private router: Router,
  ) { }

  ngOnInit() {
    // TODO unsubsribe
    const sub1 = this.weightCommunicationService.weightAnnounced$.subscribe(w => this.weight = w);
  }

  manuel() {
    // TODO fix this strange path
    this.router.navigate(['weighing/manuell']);
    this.selectionModeReady = true;
    this.selectionMode = SelectionMode.Manuel;
  }

  connectBLE() {
    // TODO fix this strange path
    this.router.navigate(['weighing/ble']);
    this.selectionModeReady = true;
    this.selectionMode = SelectionMode.Bluetooth;
  }


  send() {
    this.sendDialogService.send({
      hiveMark: this.number,
      weight: this.weight,
      wirrbau: this.wirrbaunote,
      date: new Date(),
      type: 'wiegung',
      schleuderung: this.schleuderung
    });
    this.number = null;
  }


  schleuderungSelected(event: Schleuderung) {
    this.schleuderung = event;
  }

  isManuell(): boolean {
    if (this.selectionMode === SelectionMode.Manuel) {
      return true;
    }
    return false;
  }
}


enum SelectionMode {
  Manuel = 'Manuel',
  Bluetooth = 'Bluetooth'
}