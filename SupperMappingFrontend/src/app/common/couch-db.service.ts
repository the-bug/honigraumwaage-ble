import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SupperMappingForSaveAndSend } from './model/supper-mapping-for-save-and-send';

@Injectable({
  providedIn: 'root'
})
export class CouchDBService {

  url = environment.couchDb_Url;
  database = environment.couchDb_database;

  constructor(private http: HttpClient) { }

  public sendSupperMappingForSaveAndSend(supperMappingForSaveAndSend: SupperMappingForSaveAndSend): Observable<any> {
    const uuid = UUID.UUID();
    return this.http.put(`${this.url}/${this.database}/${uuid}`, supperMappingForSaveAndSend);
  }
}
