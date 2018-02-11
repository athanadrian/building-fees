import { Component, OnDestroy } from '@angular/core';
import { FeesService } from '../../services/fees.service';
import { Fee } from '../../models/fee';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';

@Component({
  selector: 'app-building-fees',
  templateUrl: './building-fees.component.html',
  styleUrls: ['./building-fees.component.css']
})
export class BuildingFeesComponent implements OnDestroy {

  fees: Fee[]=new Array<Fee>();
  subscription: Subscription;
  tableResource: DataTableResource<Fee>;
  items: Fee[]=[];
  itemCount: number;

  constructor(private feesService: FeesService) {
    this.subscription = this.feesService.getAll().subscribe(fees => {
      this.fees = fees;
      console.log(fees);
      this.initializeTable(fees);
    });
  }

  private initializeTable(fees: Fee[]) {
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
    let filteredFees = (query) ?
      this.fees.filter(f => f.year === query) :
      this.fees;

      this.initializeTable(filteredFees);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
