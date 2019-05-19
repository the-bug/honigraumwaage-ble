import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SendSupperMappingService } from '../common/send-supper-mapping.service';

@Component({
  selector: 'app-supper-mapping',
  templateUrl: './supper-mapping.component.html',
  styleUrls: ['./supper-mapping.component.css']
})
export class SupperMappingComponent implements OnInit {

  form: FormGroup;

  // for reseting validation in UI
  @ViewChild('f') myNgForm;

  constructor(private fb: FormBuilder,
    private sendSupperMappingService: SendSupperMappingService
  ) { }

  ngOnInit() {
    this.buildDefaultForm();
  }

  addSupperMark() {
    this.supperMarks.push(this.fb.control(''));
  }

  get supperMarks() {
    return this.form.get('supperMarks') as FormArray;
  }

  private get hiveMark() {
    return this.form.get('hiveMark') as FormControl;
  }

  onSubmit() {
    // Maybe handle async behavior with spinner?
    // but as the resolving is fast it may be better without
    this.sendSupperMappingService.send({
      hiveMark: this.hiveMark.value,
      supperMarks: this.supperMarks.value
    }).subscribe(i => {
      this.buildDefaultForm();
      this.myNgForm.resetForm();
    }, e => {
      console.error('Error: ' + (e.stack || e));
    });
  }

  private buildDefaultForm() {
    this.form = this.fb.group({
      hiveMark: ['', Validators.required],
      supperMarks: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }

}
