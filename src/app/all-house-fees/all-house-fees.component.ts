import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fee } from '../models/fee';
import { HouseFeesService } from '../services/house-fees.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-house-fees',
  templateUrl: './all-house-fees.component.html',
  styleUrls: ['./all-house-fees.component.css']
})
export class AllHouseFeesComponent implements OnDestroy {

  fees: Fee[] = new Array<Fee>();
  subscription: Subscription;
  tableResource: DataTableResource<Fee>;
  items: Fee[] = [];
  itemCount: number;
  uid: string;
  houseFees$: FirebaseListObservable<Fee[]>;

  constructor(
    private route: ActivatedRoute,
    private houseFeesService: HouseFeesService,
    private userService: UserService
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log(this.uid);
    this.subscription = this.userService.get(this.uid)
      .subscribe((user) => {
        this.houseFeesService.getFeesForRensidence(user.residenceId)
          .subscribe(fees => {
            this.fees = fees;
            console.log(fees);
            this.initializeTable(fees);
          });
      })


    // console.log(this.uid);
    // this.houseFees$ = this.houseFeesService.getAll(this.uid);
    // console.log(this.houseFees$.subscribe())
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
