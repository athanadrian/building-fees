import { Component } from '@angular/core';
import { FeesService } from '../services/fees.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Fee } from '../models/fee';

@Component({
  selector: 'app-house-fees',
  templateUrl: './house-fees.component.html',
  styleUrls: ['./house-fees.component.css']
})
export class HouseFeesComponent {

  fees: Fee[] = [];
  filteredFees: Fee[] = [];
  year:string;

  constructor(
    private route: ActivatedRoute,
    private feesService: FeesService
  ) {
    
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
