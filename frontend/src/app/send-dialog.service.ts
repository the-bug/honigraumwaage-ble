import { SendDialogComponent } from './send-dialog/send-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SendDialogData } from './send-dialog/send-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class SendDialogService {

  dialogRef: MatDialogRef<SendDialogComponent>;

  constructor(
    private dialog: MatDialog
  ) { }

  public send(data: SendDialogData) {
    this.dialogRef = this.dialog.open(SendDialogComponent, {
      width: '250px',
      data: data
    });
  }
}