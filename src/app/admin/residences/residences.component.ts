import { Component, OnDestroy } from '@angular/core';
import { ResidencesService } from '../../services/residences.service';
import { Residence } from '../../models/residence';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { ActivatedRoute } from '@angular/router';
import { ResidentsService } from '../../services/residents.service';
import { Resident } from '../../models/resident';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnDestroy {

  residences: Residence[] = new Array<Residence>();
  subscription: Subscription;
  tableResource: DataTableResource<Residence>;
  items: Residence[] = [];
  itemCount: number;
  residentId: string;
  resident: Resident;
  residents$;

  constructor(
    private route: ActivatedRoute,
    private residentsService: ResidentsService,
    private residencesService: ResidencesService,
    private userService: UserService) {
    this.subscription = this.residencesService.getAll().subscribe(residences => {
      this.residences = residences;
      console.log(residences);
      this.initializeTable(residences);
    });
    this.subscription = this.userService.getAll().subscribe(appUsers => this.residents$ = appUsers);
    this.residentId = this.route.snapshot.paramMap.get('resident');
    console.log(this.residentId);
    //if (this.residentId) this.residentsService.get(this.residentId).take(1).subscribe(resident => this.resident = resident);
  }

  private initializeTable(fees: Residence[]) {
    this.tableResource = new DataTableResource(fees);
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
    let filteredResidences = (query) ?
      this.residences.filter(r => r.code === query) :
      this.residences;

    this.initializeTable(filteredResidences);
  }

  warning() {
    confirm('Στον κάτοικο έχει ήδη ανατεθεί ακίνητο!')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
