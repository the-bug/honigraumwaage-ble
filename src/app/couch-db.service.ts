import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class CouchDBService {

  url = 'http://localhost:5984';
  database = 'honigraeume';

  constructor(private http: HttpClient) { }

  public send(weight: string, hiveMark: number) {
    const uuid = UUID.UUID();
    return this.http.put(`${this.url}/${this.database}/${uuid}`, { weight, hiveMark });
  }
}
