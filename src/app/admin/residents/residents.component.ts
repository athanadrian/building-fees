import { Component, OnDestroy } from '@angular/core';
import { Resident } from '../../models/resident';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidencesService } from '../../services/residences.service';
import { AppUser } from '../../models/app-user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnDestroy {

  residents: AppUser[] = new Array<AppUser>();
  subscription: Subscription;
  tableResource: DataTableResource<AppUser>;
  items: AppUser[] = [];
  itemCount: number;
  residenceId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersSevice: UserService,
    private residencesService: ResidencesService) {
    this.subscription = this.usersSevice.getAll().subscribe(residents => {
      this.residents = residents;
      console.log(residents);
      this.initializeTable(residents);
    });
    this.residenceId = this.route.snapshot.paramMap.get('residence');
    console.log(this.residenceId);
    //if (this.residentId) this.usersSevice.get(this.residentId).take(1).subscribe(resident => this.resident = resident);
  }

  private initializeTable(residents: AppUser[]) {
    this.tableResource = new DataTableResource(residents);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(itemCount => this.itemCount = itemCount)
  }

  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query) {
    console.log(query);
    let filteredResidents = (query) ?
      this.residents.filter(r => r.lastname === query) :
      this.residents;

    this.initializeTable(filteredResidents);
  }

  notAvailable() {
    confirm('Μη διαΘέσιμος!')
  }

  available() {
    confirm('ΔιαΘέσιμος!')
  }

  addDelegation(uid, residenceId) {
    if (!this.residenceId) confirm('Δεν έχεις επιλέξει οίκημα για ανάθεση! Επέλεξε οίκημα από διαχείριση κατοικιών.');
    else {
      this.usersSevice.connectUserToResidence(uid, this.residenceId);
      this.router.navigate(['/admin/residences']);
    }
  }

  removeDelegetion(uid, residenceId) {
    this.usersSevice.disconnectUserFromResidence(uid, this.residenceId);
    this.router.navigate(['/admin/residences']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
