import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SchleuderungDataService } from '../common/schleuderung-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-harvest',
  templateUrl: './create-harvest.component.html',
  styleUrls: ['./create-harvest.component.css']
})
export class CreateHarvestComponent implements OnInit, OnDestroy {

  form: FormGroup;
  schleuderungSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private harvestDataService: SchleuderungDataService
  ) { }

  ngOnInit() {
    this.buildDefaultForm();
    this.subscripeToSchleuderung();
  }

  ngOnDestroy() {
    this.schleuderungSubscription.unsubscribe();
  }

  onSubmit() {
    this.harvestDataService.announceSchleuderung(this.form.value);
  }

  private subscripeToSchleuderung() {
    this.schleuderungSubscription = this.harvestDataService.schleuderung$.subscribe(s => {
      this.form.patchValue({
        jahr: s.jahr,
        sorte: s.sorte,
        standort: s.standort
      });
    });
  }

  private buildDefaultForm() {
    this.form = this.fb.group({
      jahr: ['', Validators.required],
      sorte: ['', Validators.required],
      standort: ['', Validators.required],
    });
  }

}
