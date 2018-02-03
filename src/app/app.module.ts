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
import { ResidentsComponent } from './admin/residents/residents.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HouseFeesComponent,
    AdminFeesComponent,
    LoginComponent,
    ProfileComponent,
    ResidentsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profiles/:id',
        component: ProfileComponent
      },{
        path: 'admin/profiles',
        component: ResidentsComponent
      },
      {
        path: 'house-fees',
        component: HouseFeesComponent
      },
      {
        path: 'admin/admin-fees',
        component: AdminFeesComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
