import { Component } from '@angular/core';
import { FeesService } from '../services/fees.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Fee } from '../models/fee';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-house-fees',
  templateUrl: './house-fees.component.html',
  styleUrls: ['./house-fees.component.css']
})
export class HouseFeesComponent {

  appUser:AppUser;
  fees//: Fee[] = new Array<Fee>();
  filteredFees: Fee[] = [];
  year:string;
  residenceId;
  uid;
 // showReport=true;

  constructor(
    private route: ActivatedRoute,
    private auth:AuthService,
    private feesService: FeesService
  ) {
    this.auth.AppUser$.subscribe(appUser => {
      this.appUser = appUser
      console.log('uid', this.appUser) 
    })
    this.feesService.getAll()
      .switchMap(fees => {
        this.fees = fees;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.year = params.get('year');
        this.filteredFees = (this.year) ?
          this.fees.filter(f => f.year === this.year) :
          this.fees
      });
  }



}
