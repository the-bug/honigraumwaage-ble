import { Component, OnInit } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { map, mergeMap } from 'rxjs/operators';

// ATM this component is not tested. There will be adaption to be made for calibration and maybe the outlet...
@Component({
  selector: 'app-weight-ble',
  templateUrl: './weight-ble.component.html',
  styleUrls: ['./weight-ble.component.css']
})
export class WeightBleComponent implements OnInit {

  selectionModeReady = false;

  static GATT_CHARACTERISTIC = '0000ffe1-0000-1000-8000-00805f9b34fb';
  static GATT_PRIMARY_SERVICE = '0000ffe0-0000-1000-8000-00805f9b34fb';

  bleError: any;
  bleConnectionEstablished = false;
  bleIsConnecting = false;

  calibrationWeight = 0;
  isCalibrated = false;

  decoder = new TextDecoder();
  weight: number;

  constructor(
    private readonly ble: BluetoothCore,
    ) { }

  ngOnInit() {
  }


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
    this.selectionModeReady = true;
  }


  value() {
    return this.ble

      // 1) call the discover method will trigger the discovery process (by the browser)
      .discover$({
        acceptAllDevices: true,
        optionalServices: [WeightBleComponent.GATT_PRIMARY_SERVICE]
      })
      .pipe(

        // 2) get that service
        mergeMap((gatt: BluetoothRemoteGATTServer) => {
          return this.ble.getPrimaryService$(gatt, WeightBleComponent.GATT_PRIMARY_SERVICE);
        }),

        // 3) get a specific characteristic on that service
        mergeMap((primaryService: BluetoothRemoteGATTService) => {
          return this.ble.getCharacteristic$(primaryService, WeightBleComponent.GATT_CHARACTERISTIC);
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

}
