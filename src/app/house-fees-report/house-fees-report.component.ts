import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calculations } from '../common/helpers/helpers';
import { ResidencesService } from '../services/residences.service';
import { Subscription } from 'rxjs';
import { HouseFeesService } from '../services/house-fees.service';
import { ResidenceFee } from '../models/fee';

@Component({
  selector: 'app-house-fees-report',
  templateUrl: './house-fees-report.component.html',
  styleUrls: ['./house-fees-report.component.css']
})
export class HouseFeesReportComponent {

  fee;
  year;
  month;
  feeId: string;
  houseFee: ResidenceFee;
  subscription: Subscription;
  isPaid:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseFeesService) {

    // const params = this.route.snapshot.paramMap;
    // this.year = +params.get('year');
    // this.month = +params.get('month');
    // let searchKey = `${this.year}${this.month}`;
    // console.log(this.year, this.month);
    // console.log(searchKey);

    this.feeId = this.route.snapshot.paramMap.get('feeId');
    console.log(this.feeId);
    this.subscription = this.houseService.get(this.feeId)
      .subscribe((fee) => {
        this.houseFee = fee
        console.log(this.houseFee)
      });

    // this.feeService.findHouseFee(searchKey)
    //   .subscribe(fee => {
    //     this.residencesService.findResidence('-L58rhu9jaF-SIRKoqfi').subscribe(residence => {
    //       this.residence = residence
    //       this.fee = Calculations.doResidenceFeeCalculation(fee, this.residence);

    //       console.log('residence ', this.residence)
    //       console.log('fee ', this.fee);
    //     });
    //   });
  }

}
