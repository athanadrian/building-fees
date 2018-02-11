import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';

@Injectable()
export class LookupService {

  constructor(private db: AngularFireDatabase) { }

  getYears() {
    return this.db.list('/years/');
  }

  getMonths() {
    return this.db.list('/months/');
  }

}
