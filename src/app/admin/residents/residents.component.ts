import { Component, OnDestroy } from '@angular/core';
import { ResidentsService } from '../../services/residents.service';
import { Resident } from '../../models/resident';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnDestroy {

  residents: Resident[]=new Array<Resident>();
  subscription: Subscription;
  tableResource: DataTableResource<Resident>;
  items: Resident[]=[];
  itemCount: number;

  constructor(
    private residentsService: ResidentsService) {
    this.subscription = this.residentsService.getAll().subscribe(residents => {
      this.residents = residents;
      console.log(residents);
      this.initializeTable(residents);
    });
  }

  private initializeTable(residents: Resident[]) {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
}
