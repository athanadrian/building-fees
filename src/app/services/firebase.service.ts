import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class FirebaseService {

  sdkDb: any;

  constructor(
    @Inject(FirebaseApp) fb) {

      this.sdkDb = fb.database().ref();
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
      val => {
        subject.next(val);
        subject.complete();

      },
      err => {
        subject.error(err);
        subject.complete();
      }
      );

    return subject.asObservable();
  }

}
