import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';
import { SendDialogData } from './send-dialog/send-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class CouchDBService {

  url = environment.couchDb_Url;
  database = environment.couchDb_database;

  constructor(private http: HttpClient) { }

  public send(sendDialogData: SendDialogData) {
    const uuid = UUID.UUID();
    return this.http.put(`${this.url}/${this.database}/${uuid}`, sendDialogData);
  }
}
