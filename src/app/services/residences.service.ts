import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';
import { Residence } from '../models/residence';

@Injectable()
export class ResidencesService {

  constructor(private db: AngularFireDatabase) {

  }

  getAll(): FirebaseListObservable<Residence[]> {
    return this.db.list('/residences');
  }

  get(residenceId): FirebaseObjectObservable<Residence> {
    return this.db.object('/residences/' + residenceId);
  }

  create(residence) {
    return this.db.list('/residences').push(residence);
  }

  update(residenceId, residence) {
    return this.db.object('/residences/' + residenceId).update(residence);
  }

  delete(residenceId) {
    return this.db.object('/residences/' + residenceId).remove();
  }

}
