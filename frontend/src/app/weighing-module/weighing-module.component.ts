import { Component, OnInit } from '@angular/core';
import { Schleuderung } from './send-dialog/send-dialog-data';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { SendDialogService } from './send-dialog.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-weighing-module',
  templateUrl: './weighing-module.component.html',
  styleUrls: ['./weighing-module.component.css']
})
export class WeighingModuleComponent {


  static GATT_CHARACTERISTIC = '0000ffe1-0000-1000-8000-00805f9b34fb';
  static GATT_PRIMARY_SERVICE = '0000ffe0-0000-1000-8000-00805f9b34fb';

  calibrationWeight = 0;
  isCalibrated = false;

  weight: number;
  number: number;
  wirrbaunote: number;

  bleError: any;
  bleConnectionEstablished = false;
  bleIsConnecting = false;

  decoder = new TextDecoder();

  schleuderung: Schleuderung;

  constructor(
    private readonly ble: BluetoothCore,
    private sendDialogService: SendDialogService,
  ) { }

  connectBLE() {
    this.bleIsConnecting = true;
    this.bleError = null;
    this.value().subscribe(v => {
      this.weight = parseFloat(this.decoder.decode(v)) - this.calibrationWeight;
      this.bleConnectionEstablished = true;
      this.bleIsConnecting = false;
    }, error => {
      this.bleError = error
      this.bleConnectionEstablished = false;
      this.bleIsConnecting = false;
    })
  }

  calibrate() {
    this.isCalibrated = true;
    this.calibrationWeight = this.weight;
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

  value() {
    return this.ble

      // 1) call the discover method will trigger the discovery process (by the browser)
      .discover$({
        acceptAllDevices: true,
        optionalServices: [WeighingModuleComponent.GATT_PRIMARY_SERVICE]
      })
      .pipe(

        // 2) get that service
        mergeMap((gatt: BluetoothRemoteGATTServer) => {
          return this.ble.getPrimaryService$(gatt, WeighingModuleComponent.GATT_PRIMARY_SERVICE);
        }),

        // 3) get a specific characteristic on that service
        mergeMap((primaryService: BluetoothRemoteGATTService) => {
          return this.ble.getCharacteristic$(primaryService, WeighingModuleComponent.GATT_CHARACTERISTIC);
        }),

        // 4) ask for the value of that characteristic (will return a DataView)
        mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) => {
          return this.ble.observeValue$(characteristic);
        }),

        // 5) on that DataView, get the right value
        map((value: DataView) => value
        )
      )
  }

  schleuderungSelected(event: Schleuderung) {
    this.schleuderung = event;
  }
}
