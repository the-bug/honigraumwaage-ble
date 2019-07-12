import { Injectable } from '@angular/core';
import Dexie from 'dexie';
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

  send(supperMapping: SupperMappingForSave): Observable<any> {
    return from(this.addToIndexedDb(supperMapping));
  }

  delete(id: string) {
    return from(this.db.supperMapping.delete(id));
  }

  private addToIndexedDb(supperMapping: SupperMappingForSave) {
    return this.db.supperMapping.add(supperMapping);
  }

  private createDatabase() {
    this.db = new Dexie('SupperMappingDatabase');
    this.db.version(1).stores({
      supperMapping: 'id,hiveMark,supperMarks'
    });
  }


}
