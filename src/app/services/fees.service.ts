import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';
import { Fee } from '../models/fee';

@Injectable()
export class FeesService {

  constructor(private db: AngularFireDatabase) {

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

}
