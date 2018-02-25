import { Component } from '@angular/core';
import { ResidencesService } from '../../services/residences.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

import { Residence } from '../../models/residence';

@Component({
  selector: 'app-residences-form',
  templateUrl: './residences-form.component.html',
  styleUrls: ['./residences-form.component.css']
})
export class ResidencesFormComponent {

  residence: Residence = new Residence();
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private residenceService: ResidencesService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.residenceService.get(this.id).take(1).subscribe(residence => this.residence = residence);
  }

  save(residence: Residence) {
    if (this.id) this.residenceService.update(this.id, residence);
    else {
      residence.isAvailable = true;
      this.residenceService.create(residence);
    }

    this.router.navigate(['/admin/residences']);
  }

  delete() {
    if (!confirm('Είστε σίγουροι για την διαγραφή?')) return
    this.residenceService.delete(this.id);
    this.router.navigate(['/admin/residences']);
  }


}
