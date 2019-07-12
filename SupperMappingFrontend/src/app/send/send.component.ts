import { Component, OnInit } from '@angular/core';
import { SendSupperMappingService } from '../common/send-supper-mapping.service';
import { SupperMapping, Schleuderung } from '../common/supper-mapping';
import { CouchDBService } from './couch-db.service';
import { HarvestDataService } from '../common/harvest-data.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  schleuderung: Schleuderung;

  constructor(
    private sendSupperMappingService: SendSupperMappingService,
    private couchDbService: CouchDBService,
    private harvestDataService: HarvestDataService
  ) { }

  ngOnInit() {
    this.harvestDataService.schleuderung$.subscribe(s => this.schleuderung = s);
  }

  send() {

    this.sendSupperMappingService.getAll().subscribe((allMapping: Array<SupperMapping>) => {
      allMapping.forEach(mapping => {
        const dataToSend = {
          ...mapping,
          type: 'ernte',
          schleuderung: this.schleuderung
        };
        this.couchDbService.send(dataToSend).subscribe(_ => {
          // this.sendSupperMappingService.delete(mapping['id']).subscribe(__ => { });
        });

      })

    })

  };


}


