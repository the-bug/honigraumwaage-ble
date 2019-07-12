import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import Dexie from 'dexie';
import { SupperMapping } from './model/supper-mapping';
import { Observable, from } from 'rxjs';
import { SupperMappingForSave } from './model/supper-mapping-for-save';

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
    const toAdd = { ...supperMapping, id: UUID.UUID() } as SupperMappingForSave;
    return this.db.supperMapping.add(toAdd);
  }

  private createDatabase() {
    this.db = new Dexie('SupperMappingDatabase');
    this.db.version(1).stores({
      supperMapping: 'id,hiveMark,supperMarks'
    });
  }


}
