import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';
import { UserService } from '../../services/user.service';
import { HouseFeesService } from '../../services/house-fees.service';

@Component({
  selector: 'app-residents-form',
  templateUrl: './residents-form.component.html',
  styleUrls: ['./residents-form.component.css']
})
export class ResidentsFormComponent {

  appUser: AppUser;
  resident: AppUser = new AppUser();
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private houseFeesService: HouseFeesService) {

    auth.AppUser$.subscribe(appUser => {
      this.appUser = appUser
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.userService.get(this.id).take(1).subscribe((resident: AppUser) => this.resident = resident);
  }

  save(resident) {
    if (this.id) this.userService.update(this.id, this.resident);
    else this.userService.create(resident);

    this.router.navigate(['/admin/residents']);
  }

  delete() {
    if (!confirm('Είστε σίγουροι για την διαγραφή?')) return
    this.userService.delete(this.id);
    this.router.navigate(['/admin/residents']);
  }

  deleteUserHouseFees(uid) {
    console.log(uid);
    this.houseFeesService.deleteAll(uid).then(() => confirm('ok'));
  }

}
