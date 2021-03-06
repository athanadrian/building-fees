import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authState;

  constructor(
    public auth: AuthService) {
      auth.user$.subscribe((user)=>console.log(user))
  }

  googleLogin() {
    this.auth.login();
  }

}
