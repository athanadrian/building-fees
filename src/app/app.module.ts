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

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MaintenanceComponent } from './maintenance/maintenance.component';
import { HouseFeesComponent } from './house-fees/house-fees.component';
import { HouseFeesReportComponent } from './house-fees-report/house-fees-report.component';
import { AllHouseFeesComponent } from './all-house-fees/all-house-fees.component';

import { ProfileComponent } from './profile/profile.component';

import { BuildingFeesComponent } from './admin/building-fees/building-fees.component';
import { BuildingFeesFormComponent } from './admin/building-fees-form/building-fees-form.component';
import { FeeFilterComponent } from './house-fees/fee-filter/fee-filter.component';
import { FeeCardComponent } from './fee-card/fee-card.component';

import { ResidenceCardComponent } from './residence-card/residence-card.component';
import { ResidenceFilterComponent } from './admin/residences/residence-filter/residence-filter.component';
import { ResidencesComponent } from './admin/residences/residences.component';
import { ResidencesFormComponent } from './admin/residences-form/residences-form.component';

import { ResidentsComponent } from './admin/residents/residents.component';
import { ResidentFilterComponent } from './admin/residents/resident-filter/resident-filter.component';
import { ResidentCardComponent } from './resident-card/resident-card.component';
import { ResidentsFormComponent } from './admin/residents-form/residents-form.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FeesService } from './services/fees.service';
import { LookupService } from './services/lookup.service';
import { ResidencesService } from './services/residences.service';
import { ResidentsService } from './services/residents.service';
import { HouseFeesService } from './services/house-fees.service';
import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
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
    ResidenceFilterComponent,
    ResidentFilterComponent,
    ResidentCardComponent,
    ResidentsFormComponent,
    MaintenanceComponent,
    HouseFeesReportComponent,
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
      { path: 'login', component: LoginComponent },
      { path: 'maintenance', component: MaintenanceComponent },

      { path: 'all-house-fees/:uid', component: AllHouseFeesComponent , canActivate: [AuthGuard] },
      { path: 'house-fees-report/:feeId', component: HouseFeesReportComponent, canActivate: [AuthGuard] },
      { path: 'house-fees-report/:year/:month', component: HouseFeesReportComponent, canActivate: [AuthGuard] },
      { path: 'profiles/:id', component: ProfileComponent, canActivate: [AuthGuard] },
     
      { path: 'admin/residents', component: ResidentsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residents/new', component: ResidentsFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residents/:id', component: ResidentsFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residences', component: ResidencesComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residences/new', component: ResidencesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/residences/:id', component: ResidencesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/building-fees', component: BuildingFeesComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/building-fees/new', component: BuildingFeesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/building-fees/:id', component: BuildingFeesFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    FeesService,
    ResidencesService,
    ResidentsService,
    HouseFeesService,
    FirebaseService,
    LookupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
