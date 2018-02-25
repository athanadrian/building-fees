import { Component } from '@angular/core';
import { FeesService } from '../../services/fees.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

import { Fee } from '../../models/fee';
import { LookupService } from '../../services/lookup.service';
import { Calculations } from '../../common/helpers/helpers';



@Component({
  selector: 'app-building-fees-form',
  templateUrl: './building-fees-form.component.html',
  styleUrls: ['./building-fees-form.component.css']
})
export class BuildingFeesFormComponent {

  years$;
  months$;
  fee: Fee = new Fee();
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private feesService: FeesService) {

    this.years$ = this.lookupService.getYears();
    this.months$ = this.lookupService.getMonths();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.feesService.get(this.id).take(1).subscribe((fee:Fee) => this.fee = fee);
  }

  save(fee: Fee) {
    fee.total = Calculations.calculateNewTotal(fee);
    //fee.searchKey=this.fee.searchKey;
    if (this.id) this.feesService.update(this.id, fee).then(() => console.log(fee));
    else this.feesService.create(fee);

    this.router.navigate(['/admin/building-fees']);
  }

  delete() {
    if (!confirm('Είστε σίγουροι για την διαγραφή?')) return
    this.feesService.delete(this.id);
    this.router.navigate(['/admin/building-fees']);
  }

}
