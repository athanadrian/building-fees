import { Component, Input, OnDestroy } from '@angular/core';
import { Fee } from '../models/fee';
import { HouseFeesService } from '../services/house-fees.service';
import { Calculations } from '../common/helpers/helpers';
import { ResidencesService } from '../services/residences.service';
import { AuthService } from '../services/auth.service';
import { Residence } from '../models/residence';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';

@Component({
  selector: 'fee-card',
  templateUrl: './fee-card.component.html',
  styleUrls: ['./fee-card.component.css']
})
export class FeeCardComponent implements OnDestroy {

  @Input('fee') fee: Fee;
  @Input('appUser') appUser: AppUser;
  @Input('show-actions') showActions: boolean = true;

  subscription: Subscription;
  residenceId:string;
  uid;
  constructor(
    private route:Router,
    private auth: AuthService,
    private houseFeesService: HouseFeesService,
    private residencesService: ResidencesService) {

  }

  addFeeToHouseFees(fee: Fee) {
    this.subscription = this.residencesService.get(this.appUser.residenceId).subscribe(residence => {
      let calculatedFee = Calculations.doResidenceFeeCalculation(fee, residence);
      this.houseFeesService.create(this.appUser.$key, calculatedFee).then(() => {
        //notification
        confirm('ok')});
        this.route.navigate([`all-house-fees/${this.appUser.$key}`])
    });
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
