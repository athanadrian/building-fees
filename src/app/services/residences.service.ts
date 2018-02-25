import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';
import { Residence } from '../models/residence';
import { Observable } from 'rxjs/Observable';

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

  findResidence(residenceId: string): Observable<Residence> {
    const residence = this.db.list(`/residences/`, {
      query: {
        orderByKey: true,
        equalTo: residenceId
      }
    })
      .map(results => results[0])
    return residence;
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

  makeResidenceUnavailable(residenceId){
    return this.db.object('/residences/' + residenceId).update({isAvailable:false});
  }
  makeResidenceAvailable(residenceId){
    return this.db.object('/residences/' + residenceId).update({isAvailable:true});
  }

}
