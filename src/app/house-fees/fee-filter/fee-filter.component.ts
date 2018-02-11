import { Component, Input } from '@angular/core';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'fee-filter',
  templateUrl: './fee-filter.component.html',
  styleUrls: ['./fee-filter.component.css']
})
export class FeeFilterComponent {

  years$;
  @Input('year') year;
  
  constructor(
    private lookupService: LookupService
  ) {
    this.years$ = this.lookupService.getYears();
   }

}
