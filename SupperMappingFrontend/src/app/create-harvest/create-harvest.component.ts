import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-harvest',
  templateUrl: './create-harvest.component.html',
  styleUrls: ['./create-harvest.component.css']
})
export class CreateHarvestComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildDefaultForm();
  }


  onSubmit() {
  }

  private buildDefaultForm() {
    this.form = this.fb.group({
      jahr: ['', Validators.required],
      sorte: ['', Validators.required],
      standort: ['', Validators.required],
    });
  }

}
