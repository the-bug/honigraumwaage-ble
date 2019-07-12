import { Component, OnInit } from '@angular/core';
import { SendSupperMappingService } from '../common/send-supper-mapping.service';
import { CouchDBService } from '../common/couch-db.service';
import { SchleuderungDataService } from '../common/schleuderung-data.service';
import { Schleuderung } from '../common/model/schleuderung';
import { SupperMappingForSaveAndSend } from '../common/model/supper-mapping-for-save-and-send';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  schleuderung: Schleuderung;
  error: any;

  constructor(
    private sendSupperMappingService: SendSupperMappingService,
    private couchDbService: CouchDBService,
    private harvestDataService: SchleuderungDataService
  ) { }

  ngOnInit() {
    this.harvestDataService.schleuderung$.subscribe(s => this.schleuderung = s);
  }

  send() {
    this.sendSupperMappingService.getAll().subscribe((allMapping: Array<SupperMappingForSaveAndSend>) => {
      allMapping.forEach(mapping => {
        this.couchDbService.sendSupperMappingForSaveAndSend(mapping).subscribe(_ => {
          this.sendSupperMappingService.delete(mapping.id).subscribe(_ => {
          }, error => {
            this.error = error
            throwError(error);
          });
        }, error => {
          this.error = error
          throwError(error);
        });
      });
    }, error => {
      this.error = error
      throwError(error);
    });
  }


}


