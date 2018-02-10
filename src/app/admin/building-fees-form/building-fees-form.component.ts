import { Component, OnInit } from '@angular/core';
import { FeesService } from '../../services/fees.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

import { Fee } from '../../models/fee';



@Component({
  selector: 'app-building-fees-form',
  templateUrl: './building-fees-form.component.html',
  styleUrls: ['./building-fees-form.component.css']
})
export class BuildingFeesFormComponent implements OnInit {

  fee: Fee = new Fee();
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feesService: FeesService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.feesService.get(this.id).take(1).subscribe(fee => this.fee = fee);
  }

  ngOnInit() {
  }


  save(fee) {
    if (this.id) this.feesService.update(this.id, fee);
    else this.feesService.create(fee);

    this.router.navigate(['/admin/building-fees']);
  }

  delete() {
    if (!confirm('Είστε σίγουροι για την διαγραφή?')) return
    this.feesService.delete(this.id);
    this.router.navigate(['/admin/building-fees']);
  }

}
