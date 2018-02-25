import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';
import { Resident } from '../models/resident';

@Injectable()
export class ResidentsService {

  constructor(private db: AngularFireDatabase) {

  }

  getAll(): FirebaseListObservable<Resident[]> {
    return this.db.list('/residents');
  }

  get(residentId): FirebaseObjectObservable<Resident> {
    return this.db.object('/residents/' + residentId);
  }

  create(resident) {
    return this.db.list('/residents').push(resident);
  }

  update(residentId, resident) {
    return this.db.object('/residents/' + residentId).update(resident);
  }

  delete(residentId) {
    return this.db.object('/residents/' + residentId).remove();
  }

  delegateResidenceToResident( residenceId:string, residentId:string ){
    return this.db.object('/residents/' + residentId).update({residenceId:residenceId});
  }

}
