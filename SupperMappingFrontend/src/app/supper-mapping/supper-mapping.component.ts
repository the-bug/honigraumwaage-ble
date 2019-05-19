import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-supper-mapping',
  templateUrl: './supper-mapping.component.html',
  styleUrls: ['./supper-mapping.component.css']
})
export class SupperMappingComponent implements OnInit {

  form: FormGroup;

  @ViewChild('f') myNgForm;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildDefaultForm();
  }

  addSupperMark() {
    this.supperMarks.push(this.fb.control(''));
  }

  get supperMarks() {
    return this.form.get('supperMarks') as FormArray;
  }

  onSubmit() {
    console.warn(this.form.value);
    this.buildDefaultForm();
    this.myNgForm.resetForm();
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
