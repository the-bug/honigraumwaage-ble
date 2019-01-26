import { SendDialogData } from './send-dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CouchDBService } from './../couch-db.service';
import { Component, OnInit, Inject } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {

  countDown: Subscription;
  counter = 5;

  sending = false;
  sendError;

  constructor(
    private couchDBService: CouchDBService,
    public dialogRef: MatDialogRef<SendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SendDialogData
  ) {
    this.countDown = timer(0, 1000)
      .pipe(take(this.counter + 1))
      .subscribe(val => {
        this.counter = 5 - val;
        if (this.counter === 0) {
          this.send();
        }
      });
  }

  ngOnInit() {
  }

  cancel() {
    this.countDown.unsubscribe();
    this.close();
  }

  private close(): void {
    this.dialogRef.close();
  }

  private send() {
    this.sending = true;
    this.couchDBService.send(this.data.weight, this.data.hiveMark).subscribe(_ => {
      this.sending = false;
      this.close();
    }, error => {
      this.sending = false;
      this.sendError = error;
    });
  }

}
