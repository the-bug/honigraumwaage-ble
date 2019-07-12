import { Component, OnInit } from '@angular/core';
import { SendSupperMappingService } from '../common/send-supper-mapping.service';
import { SupperMapping } from '../common/model/supper-mapping';
import { CouchDBService } from '../common/couch-db.service';
import { HarvestDataService } from '../common/harvest-data.service';
import { Schleuderung } from '../common/model/schleuderung';

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


