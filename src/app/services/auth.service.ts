import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  authState: any = null;

  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    //private router: Router,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  login() {

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    let provider = new firebase.auth.GoogleAuthProvider()
    this.afAuth.auth.signInWithRedirect(provider);
    // const provider = new firebase.auth.GoogleAuthProvider()
    // return this.socialSignIn(provider);
  }

  logout() {
    this.afAuth.auth.signOut();
    //this.router.navigate(['/'])
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        console.log(this.authState);
      })
      .catch(error => console.log(error));
  }
}
