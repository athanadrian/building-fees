import { Component, OnDestroy } from '@angular/core';
import { FeesService } from '../../services/fees.service';
import { Fee } from '../../models/fee';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-building-fees',
  templateUrl: './building-fees.component.html',
  styleUrls: ['./building-fees.component.css']
})
export class BuildingFeesComponent implements OnDestroy {

  fees: Fee[];
  filteredFees: Fee[];
  subscription: Subscription;

  constructor(private feesService: FeesService) {
    this.subscription = this.feesService.getAll().subscribe(fees => this.filteredFees = this.fees = fees);
  }

  filter(query) {
    console.log(query);
    this.filteredFees = (query) ?
      this.fees.filter(f => f.year === query, console.log(this.filteredFees)) :
      this.fees;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
