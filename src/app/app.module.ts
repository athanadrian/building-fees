import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'
import { DataTableModule } from 'angular-4-data-table-bootstrap-4';

import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HouseFeesComponent } from './house-fees/house-fees.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AllHouseFeesComponent } from './all-house-fees/all-house-fees.component';

import { ResidentsComponent } from './admin/residents/residents.component';
import { ResidencesComponent } from './admin/residences/residences.component';
import { ResidencesFormComponent } from './admin/residences-form/residences-form.component';
import { BuildingFeesComponent } from './admin/building-fees/building-fees.component';
import { BuildingFeesFormComponent } from './admin/building-fees-form/building-fees-form.component';
import { ResidenceFilterComponent } from './admin/residences/residence-filter/residence-filter.component';
import { FeeFilterComponent } from './house-fees/fee-filter/fee-filter.component';
import { FeeCardComponent } from './fee-card/fee-card.component';
import { ResidenceCardComponent } from './residence-card/residence-card.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FeesService } from './services/fees.service';
import { LookupService } from './services/lookup.service';
import { ResidencesService } from './services/residences.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HouseFeesComponent,
    BuildingFeesComponent,
    LoginComponent,
    ProfileComponent,
    ResidentsComponent,
    AllHouseFeesComponent,
    BuildingFeesFormComponent,
    ResidencesComponent,
    ResidencesFormComponent,
    FeeFilterComponent,
    FeeCardComponent,
    ResidenceCardComponent,
    ResidenceFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HouseFeesComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'house-fees/:year/:month', component: HouseFeesComponent },

      { path: 'house-fees', component: HouseFeesComponent, canActivate: [AuthGuard] },
      { path: 'profiles/:id', component: ProfileComponent, canActivate: [AuthGuard] },
     
      { path: 'admin/profiles', component: ResidentsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residences', component: ResidencesComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residences/new', component: ResidencesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residences/:id', component: ResidencesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/building-fees/new', component: BuildingFeesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/building-fees/:id', component: BuildingFeesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/building-fees', component: BuildingFeesComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    FeesService,
    ResidencesService,
    LookupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
