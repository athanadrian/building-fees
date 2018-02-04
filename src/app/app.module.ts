import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HouseFeesComponent } from './house-fees/house-fees.component';
import { AdminFeesComponent } from './admin/admin-fees/admin-fees.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminResidentsComponent } from './admin/admin-residents/admin-residents.component';
import { AllHouseFeesComponent } from './all-house-fees/all-house-fees.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HouseFeesComponent,
    AdminFeesComponent,
    LoginComponent,
    ProfileComponent,
    AdminResidentsComponent,
    AllHouseFeesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'house-fees/:year/:month', component: HouseFeesComponent },

      { path: 'house-fees', component: AllHouseFeesComponent, canActivate: [AuthGuard] },
      { path: 'profiles/:id', component: ProfileComponent, canActivate: [AuthGuard] },
     
      { path: 'admin/profiles', component: AdminResidentsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/admin-fees', component: AdminFeesComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
