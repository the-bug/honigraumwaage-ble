import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightCommunicationService {

  private weightAnnouncedSource = new Subject<number>();
  private readyAnnouncedSource = new BehaviorSubject<boolean>(false);

  weightAnnounced$ = this.weightAnnouncedSource.asObservable();
  readyAnnounced$ = this.readyAnnouncedSource.asObservable();

  announceWeight(weight: number) {
    this.weightAnnouncedSource.next(weight);
  }

  announceReady() {
    this.readyAnnouncedSource.next(true);
  }

}
