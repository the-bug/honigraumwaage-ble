import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Observable, from } from 'rxjs';
import { SupperMappingForSaveAndSend } from './model/supper-mapping-for-save-and-send';

@Injectable({
  providedIn: 'root'
})
export class SendSupperMappingService {

  private db: any;

  constructor() {
    this.createDatabase();
  }

  getAll(): Observable<any> {
    return from(this.db.supperMapping.toArray());
  }

  send(supperMapping: SupperMappingForSaveAndSend): Observable<any> {
    return from(this.addToIndexedDb(supperMapping));
  }

  delete(id: string) {
    return from(this.db.supperMapping.delete(id));
  }

  private addToIndexedDb(supperMapping: SupperMappingForSaveAndSend) {
    return this.db.supperMapping.add(supperMapping);
  }

  private createDatabase() {
    this.db = new Dexie('SupperMappingDatabase');
    this.db.version(1).stores({
      // Only Index DB. Maybe dont needed at all....
      supperMapping: '&id'
    });
  }


}
