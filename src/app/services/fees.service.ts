import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';
import { Fee, ResidenceFee } from '../models/fee';
import { Residence } from '../models/residence';
import { Resident } from '../models/resident';
import { Calculations } from '../common/helpers/helpers';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { ResidencesService } from './residences.service';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FeesService {

  users$;

  constructor(
    //private residencesService:ResidencesService,
    private firebaseService: FirebaseService,
    private db: AngularFireDatabase) {

  }

  getAll(): FirebaseListObservable<Fee[]> {
    return this.db.list('/fees');
  }

  get(feeId): FirebaseObjectObservable<Fee> {
    return this.db.object('/fees/' + feeId);
  }

  create(fee) {
    return this.db.list('/fees').push(fee);
  }

  update(feeId, fee) {
    return this.db.object('/fees/' + feeId).update(fee);
  }

  delete(feeId) {
    return this.db.object('/fees/' + feeId).remove();
  }

  // getFeesForRensidence(residenceId: string) {
  //   const rensidence$ = this.residencesService.get(residenceId);

  //   const feesForRensidence$ = rensidence$
  //     .switchMap(residence => this.db.list(`/feeReportsPerResidence/` + residenceId))

  //   return feesForRensidence$
  //     .map(fspr => fspr.map(fpr => this.db.object(`/house-fees/` + fpr.$key)))
  //     .flatMap(fbojs => Observable.combineLatest(fbojs))
  //     .do(console.log);
  // }

  // findHouseFee(searchKey: string): Observable<Fee> {
  //   const fee = this.db.list(`/fees/`, {
  //     query: {
  //       orderByChild: 'searchKey',
  //       equalTo: searchKey
  //     }
  //   })
  //     .map(results => results[0])
  //   return fee;
  // }

  // stageReports(uid:string, fee:ResidenceFee) {
  //   return this.db.list(`house-fees/${uid}`).push(fee);
  // }

  stageReports(uid: string, fee: ResidenceFee): Observable<any> {
    const reportToStage = Object.assign({}, fee);
    const newReportKey = this.firebaseService.sdkDb.child(`house-fees/${uid}`).push().key;

    let dataToSave = {};
    dataToSave[`/house-fees/${newReportKey}`] = reportToStage;
    dataToSave[`/feeReportsPerResidence/${fee.residenceId}/${newReportKey}`] = true;
    dataToSave[`housesFeesForBuildingFees/${fee.feeId}/${newReportKey}`] = true;
    if (fee.payerId) {
      dataToSave[`/user/${fee.payerId}/feeReports/${newReportKey}`] = reportToStage;
      dataToSave[`/feeReportsPerPayer/${fee.payerId}/${newReportKey}`] = true;
    }


    return this.firebaseService.firebaseUpdate(dataToSave);
  }

}
