import { Component, OnInit, OnDestroy } from '@angular/core';
import { Schleuderung } from './send-dialog/send-dialog-data';
import { SendDialogService } from './send-dialog.service';
import { WeightCommunicationService } from './weight-communication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weighing-module',
  templateUrl: './weighing-module.component.html',
  styleUrls: ['./weighing-module.component.css']
})
export class WeighingModuleComponent implements OnInit, OnDestroy {

  selectionMode: SelectionMode;
  selectionModeReady = false;

  weight: number;
  number: number;
  wirrbaunote: number;

  schleuderung: Schleuderung;

  weightSubscription: Subscription;

  constructor(
    private sendDialogService: SendDialogService,
    private weightCommunicationService: WeightCommunicationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.weightSubscription = this.weightCommunicationService.weightAnnounced$.subscribe(w => this.weight = w);
  }

  ngOnDestroy(): void {
    this.weightSubscription.unsubscribe();
  }

  manuel() {
    this.router.navigate(['manuell'], { 
      relativeTo: this.route,
      skipLocationChange: true 
    });
    this.selectionModeReady = true;
    this.selectionMode = SelectionMode.Manuel;
  }

  connectBLE() {
    this.router.navigate(['ble'], { 
      relativeTo: this.route,
      skipLocationChange: true 
    });
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