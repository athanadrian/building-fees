import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { ResidentsService } from './residents.service';
import { ResidencesService } from './residences.service';
import { FirebaseService } from './firebase.service';
// import { Subject } from 'rxjs/Subject';
// import { FirebaseApp } from 'angularfire2/app';

@Injectable()
export class UserService {


  constructor(
    private db: AngularFireDatabase,
    private residencesService: ResidencesService,
    //private residentsService: ResidentsService
    private firebaseService: FirebaseService
  ) {
  }

  save(user: firebase.User) {

    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });

  }
  getAll(): FirebaseListObservable<AppUser[]> {
    return this.db.list('/users');
  }

  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }

  create(resident) {
    return this.db.list('/users').push(resident);
  }

  update(uid, appUser: AppUser) {
    return this.db.object('/users/' + uid).update(appUser);
  }

  delete(uid) {
    return this.db.object('/users/' + uid).remove();
  }

  connectUserToResidence(uid: string, residenceId: string) {
    return this.db.object('/residences/' + residenceId).update({ uid: uid, isAvailable: false }).then(() => {
      return this.db.object('/users/' + uid).update({ isResident: true, residenceId: residenceId })
        .then(() => {
          let dataToSave = {};
          dataToSave[`/usersPerResidence/${residenceId}/${uid}`] = true;
          dataToSave[`/residencesPerUser/${uid}/${residenceId}`] = true;
          return this.firebaseService.firebaseUpdate(dataToSave);
        }).then(() => {
          confirm('ok Connected');
        });
    });
  }

  async disconnectUserFromResidence(uid: string, residenceId: string) {
    let user = await this.get(uid)
    return user.subscribe(user => {
      let residenceId = user.residenceId
      if (residenceId) {
        this.db.object('/residences/' + residenceId).update({ isAvailable: true, uid: null })
          .then(() => {
            return this.db.object('/users/' + uid).update({ isResident: false, residenceId: null })
              .then(() => {
                let dataToSave = {};
                dataToSave[`/usersPerResidence/${residenceId}/${uid}`] = false;
                dataToSave[`/residencesPerUser/${uid}/${residenceId}`] = false;
                return this.firebaseService.firebaseUpdate(dataToSave);
              }).then(() => {
                confirm('ok disconnected')
              });
          });
      }
    });
  }

}
