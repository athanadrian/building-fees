import { Component } from '@angular/core';
import { ResidentsService } from '../../services/residents.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

import { Resident } from '../../models/resident';

@Component({
  selector: 'app-residents-form',
  templateUrl: './residents-form.component.html',
  styleUrls: ['./residents-form.component.css']
})
export class ResidentsFormComponent {

  resident: Resident = new Resident();
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private residentsService: ResidentsService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.residentsService.get(this.id).take(1).subscribe(resident => this.resident = resident);
  }

  save(resident) {
    if (this.id) this.residentsService.update(this.id, resident);
    else this.residentsService.create(resident);

    this.router.navigate(['/admin/residents']);
  }

  delete() {
    if (!confirm('Είστε σίγουροι για την διαγραφή?')) return
    this.residentsService.delete(this.id);
    this.router.navigate(['/admin/residents']);
  }

}
