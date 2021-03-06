import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SendSupperMappingService } from '../common/send-supper-mapping.service';
import { SupperMappingForSaveAndSend } from '../common/model/supper-mapping-for-save-and-send';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  form: FormGroup;

  // for reseting validation in UI
  @ViewChild('f', { static: true }) myNgForm;

  constructor(
    private fb: FormBuilder,
    private sendSupperMappingService: SendSupperMappingService
  ) { }

  ngOnInit() {
    this.buildDefaultForm();
    this.loadMappings();
  }

  private loadMappings() {
    this.sendSupperMappingService.getAll().subscribe(i => {
      for (const j of i) {
        this.addSupperMapping(j);
      }
    });
  }

  private buildDefaultForm() {
    this.form = this.fb.group({
      mappings: this.fb.array([
      ])
    });
  }

  get supperMappings() {
    return this.form.get('mappings') as FormArray;
  }

  private addSupperMapping(supperMappingForSendAndSave: SupperMappingForSaveAndSend) {
    this.supperMappings.push(this.fb.control(supperMappingForSendAndSave));
  }

  onSubmit() {
  }

  delete(id: string) {
    this.sendSupperMappingService.delete(id).subscribe(() => {
      this.buildDefaultForm();
      this.myNgForm.resetForm();
      this.loadMappings();
    }, e => {
      console.error('Error: ' + (e.stack || e));
    });
  }

}
