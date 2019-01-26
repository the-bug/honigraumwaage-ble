import { SendDialogComponent } from './send-dialog/send-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SendDialogService {

  dialogRef: MatDialogRef<SendDialogComponent>;

  constructor(
    private dialog: MatDialog
  ) { }

  public send(weight: string, hiveMark: number) {
    this.dialogRef = this.dialog.open(SendDialogComponent, {
      width: '250px',
      data: { weight: weight, hiveMark: hiveMark }
    });
  }
}