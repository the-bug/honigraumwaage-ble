import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Schleuderung } from './model/schleuderung';

@Injectable({
  providedIn: 'root'
})
export class SchleuderungDataService {

  // Maybe the first Input should be stored in an indexedDB....
  private schleuderungSource = new BehaviorSubject<Schleuderung>(
    {
      jahr: (new Date()).getFullYear(),
      sorte: '',
      standort: ''
    }
  );

  schleuderung$ = this.schleuderungSource.asObservable();

  constructor() { }

  announceSchleuderung(schleuderung: Schleuderung) {
    this.schleuderungSource.next(schleuderung);
  }

}
