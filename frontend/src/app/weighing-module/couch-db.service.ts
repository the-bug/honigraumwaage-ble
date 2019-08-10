import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';
import { SendDialogData } from './send-dialog/send-dialog-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouchDBService {

  url = environment.couchDb_Url;
  // TODO remove environment.couchDb_database from enviroments
  database = environment.couchDb_database;
  schleuderungView = '_design/stats/_view/schleuderungen?group=true';

  constructor(private http: HttpClient) { }

  public send(sendDialogData: SendDialogData) {
    const uuid = UUID.UUID();
    return this.http.put(`${this.url}/${this.database}/${uuid}`, sendDialogData);
  }

  public getSchleuderung(): Observable<any> {
    return this.http.get(`${this.url}/${this.database}/${this.schleuderungView}`);
  }
}
