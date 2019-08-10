import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CouchDBService } from '../couch-db.service';
import { Schleuderung } from '../send-dialog/send-dialog-data';

@Component({
  selector: 'app-schleuderung-selection',
  templateUrl: './schleuderung-selection.component.html',
  styleUrls: ['./schleuderung-selection.component.css']
})
export class SchleuderungSelectionComponent implements OnInit {

  schleuderungen: Array<Schleuderung>;
  selected: Schleuderung;

  @Output()
  schleuderungSelected = new EventEmitter<Schleuderung>();

  constructor(
    private couchDBService: CouchDBService
  ) { }

  ngOnInit() {
    this.couchDBService.getSchleuderung().subscribe(x => {
      // TODO move this mapping in the service
      this.schleuderungen = x.rows.map(i => i.key);
    })
  }

  selecteSchleuderung() {
    if (this.selected) {
      this.schleuderungSelected.emit(this.selected);
    }
  }

}
