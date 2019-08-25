import { Component, OnInit } from '@angular/core';
import { WeightCommunicationService } from '../weight-communication.service';

@Component({
  selector: 'app-weight-manuell',
  templateUrl: './weight-manuell.component.html',
  styleUrls: ['./weight-manuell.component.css']
})
export class WeightManuellComponent implements OnInit {

  constructor(private weightCommunicationService: WeightCommunicationService) { }

  ngOnInit() {
    this.weightCommunicationService.announceReady();
  }

  setWeight(value: number) {
    this.weightCommunicationService.announceWeight(value);
  }

}
