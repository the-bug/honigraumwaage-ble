import { Component, OnInit } from '@angular/core';
import { SendSupperMappingService } from '../common/send-supper-mapping.service';
import { SupperMapping } from '../common/model/supper-mapping';
import { CouchDBService } from '../common/couch-db.service';
import { SchleuderungDataService } from '../common/schleuderung-data.service';
import { Schleuderung } from '../common/model/schleuderung';
import { SupperMappingForSaveAndSend } from '../common/model/supper-mapping-for-save-and-send';
import { SupperMappingForSave } from '../common/model/supper-mapping-for-save';

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
    private harvestDataService: SchleuderungDataService
  ) { }

  ngOnInit() {
    this.harvestDataService.schleuderung$.subscribe(s => this.schleuderung = s);
  }

  send() {

    this.sendSupperMappingService.getAll().subscribe((allMapping: Array<SupperMappingForSave>) => {
      allMapping.forEach(mapping => {
        const supperMappingForSaveAndSend: SupperMappingForSaveAndSend = {
          ...mapping,
          type: 'ernte',
          schleuderung: this.schleuderung
        };
        this.couchDbService.sendSupperMappingForSaveAndSend(supperMappingForSaveAndSend).subscribe(_ => {
          // this.sendSupperMappingService.delete(mapping.id).subscribe( _ => { });
        });

      });

    });

  }


}


