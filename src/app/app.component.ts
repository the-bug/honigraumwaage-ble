import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { map, mergeMap } from 'rxjs/operators';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  static GATT_CHARACTERISTIC = '0000ffe1-0000-1000-8000-00805f9b34fb';
  static GATT_PRIMARY_SERVICE = '0000ffe0-0000-1000-8000-00805f9b34fb';

  bleConnectionEstablished = false;
  weight = '';
  number: number;

  decoder = new TextDecoder();

  constructor(
    private snackBar: MatSnackBar,
    private readonly ble: BluetoothCore
    ) { }

  connectBLE() {
    this.value().subscribe(v => {
      this.weight = this.decoder.decode(v);
      this.bleConnectionEstablished = true;    
    })
  }

  send() {
    this.snackBar.open(`Kasten ${this.number} hat ${this.weight} Kg`, null, {
      duration: 2000,
    });
  }

  value() {
    return this.ble

      // 1) call the discover method will trigger the discovery process (by the browser)
      .discover$({
        acceptAllDevices: true,
        optionalServices: [AppComponent.GATT_PRIMARY_SERVICE]
      })
      .pipe(

        // 2) get that service
        mergeMap((gatt: BluetoothRemoteGATTServer) => {
          return this.ble.getPrimaryService$(gatt, AppComponent.GATT_PRIMARY_SERVICE);
        }),

        // 3) get a specific characteristic on that service
        mergeMap((primaryService: BluetoothRemoteGATTService) => {
          return this.ble.getCharacteristic$(primaryService, AppComponent.GATT_CHARACTERISTIC);
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
