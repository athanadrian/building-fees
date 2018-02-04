import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AdminAuthGuard {

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.AppUser$
    .map(appUser => appUser.isManager); // we don't subscribe but map to return boolean
  }

}
