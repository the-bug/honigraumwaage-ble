import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import Dexie from 'dexie';
import { SupperMapping } from './supper-mapping';
import { Observable, from } from 'rxjs';
import { SupperMappingForSendAndSave } from './supper-mapping-for-send-and-save';

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

  send(supperMapping: SupperMapping): Observable<any> {
    return from(this.addToIndexedDb(supperMapping));
  }

  delete(id: string) {
    return from(this.db.supperMapping.delete(id));
  }

  private addToIndexedDb(supperMapping: SupperMapping) {
    const toAdd = { ...supperMapping, id: UUID.UUID() } as SupperMappingForSendAndSave;
    return this.db.supperMapping.add(toAdd);
  }

  private createDatabase() {
    this.db = new Dexie('SupperMappingDatabase');
    this.db.version(1).stores({
      supperMapping: 'id,hiveMark,supperMarks'
    });
  }


}
