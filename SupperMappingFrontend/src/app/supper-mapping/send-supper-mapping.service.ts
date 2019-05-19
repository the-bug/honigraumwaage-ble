import { Injectable } from '@angular/core';
import { SupperMapping } from './supper-mapping';
import { Observable, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendSupperMappingService {

  constructor() { }

  send(supperMapping: SupperMapping): Observable<any> {
    console.log(supperMapping);
    return timer(1000);
  }

}
