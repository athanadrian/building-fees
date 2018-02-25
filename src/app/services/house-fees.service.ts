import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { Fee, ResidenceFee } from '../models/fee';
import { ResidencesService } from './residences.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';

@Injectable()
export class HouseFeesService {

  userId: string;

  constructor(
    private residencesService:ResidencesService,
    private db: AngularFireDatabase) {

  }

  create(uid: string, fee: ResidenceFee) {
    return this.db.list(`house-fees/${uid}/`).push(fee);
  }

  getAll(uid: string): FirebaseListObservable<ResidenceFee[]> {
    return this.db.list(`house-fees/${uid}/`);
  }

  get(feeId: string): FirebaseObjectObservable<ResidenceFee> {
    return this.db.object(`house-fees/${feeId}`);
  }

  deleteAll(uid) {
    return this.db.list(`house-fees/${uid}/`).remove();
  }

  getFeesForRensidence(residenceId: string) {
    const rensidence$ = this.residencesService.get(residenceId);

    const feesForRensidence$ = rensidence$
      .switchMap(residence => this.db.list(`/feeReportsPerResidence/` + residenceId))

    return feesForRensidence$
      .map(fspr => fspr.map(fpr => this.db.object(`/house-fees/` + fpr.$key)))
      .flatMap(fbojs => Observable.combineLatest(fbojs))
      .do(console.log);
  }
}
