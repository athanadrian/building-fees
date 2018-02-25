import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase';

import { AppUser } from '../models/app-user';


@Injectable()
export class AuthService {

  authState: any = null;

  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
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

  get AppUser$(): Observable<AppUser> {
    return this.user$ //Observable<firebase.user>
      .switchMap(user => { //Observable<appUser>
        if(user) return this.userService.get(user.uid);
        return Observable.of(null);
      }); 
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
    this.router.navigate(['/'])
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
