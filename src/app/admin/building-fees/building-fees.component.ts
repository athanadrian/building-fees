import { Component, OnDestroy } from '@angular/core';
import { FeesService } from '../../services/fees.service';
import { Fee } from '../../models/fee';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { UserService } from '../../services/user.service';
import { ResidencesService } from '../../services/residences.service';
import { Calculations } from '../../common/helpers/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-fees',
  templateUrl: './building-fees.component.html',
  styleUrls: ['./building-fees.component.css']
})
export class BuildingFeesComponent implements OnDestroy {

  fees: Fee[] = new Array<Fee>();
  subscription: Subscription;
  tableResource: DataTableResource<Fee>;
  items: Fee[] = [];
  itemCount: number;

  constructor(
    private route: Router,
    private feesService: FeesService,
    private usersService: UserService,
    private residencesService: ResidencesService) {

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

  doFeesReports(feeId: string) {
    this.feesService.get(feeId)
      .subscribe(fee => {
        if (fee.hasReported) {
          return confirm(`Έχουν εκδοθεί τα κοινόχρηστα για την ${fee.month}/${fee.year}`)
        } else {
          this.usersService.getAll()
            .subscribe(users => {
              users.forEach(user => {
                this.residencesService.get(user.residenceId)
                  .subscribe(residence => {
                    let calculatedFee = Calculations.doResidenceFeeCalculation(fee, residence);
                    calculatedFee.residenceId = residence.$key;
                    this.feesService.stageReports(user.$key, calculatedFee).subscribe(() => {
                      fee.hasReported = true;
                      this.feesService.update(fee.$key, fee);
                      confirm(user.name);
                      //notification
                    });
                  });
              });
              confirm('ok');
              return;
            });
        }
      })
    // this.usersService.getAll()
    //   .subscribe(users => {
    //     users.forEach(user => {
    //       this.residencesService.get(user.residenceId)
    //         .subscribe(residence => {
    //           this.feesService.get(feeId)
    //             .subscribe(fee => {
    //               if (fee.hasReported) {
    //                 return confirm(`Έχουν εκδοθεί τα κοινόχρηστα για την ${fee.month}/${fee.year}`)
    //               } else {
    //                 let calculatedFee = Calculations.doResidenceFeeCalculation(fee, residence);
    //                 this.feesService.stageReports(user.$key, calculatedFee).then(() => {
    //                   fee.hasReported = true;
    //                   this.feesService.update(fee.$key, fee);
    //                   //notification
    //                   confirm('ok')
    //                 });
    //               }
    //               this.route.navigate([`all-house-fees/${user.$key}`])
    //             });
    //         });
    //     });
    //   });
  }

  makeFeesReportsForResidences(feeId: string) {
    this.feesService.get(feeId)
      .subscribe(fee => {
        if (fee && fee.hasReported) {
          //fee.hasReported = false;
          //this.feesService.update(fee.$key, fee)
            //.then(() => {
              return confirm(`Έχουν εκδοθεί τα κοινόχρηστα για την ${fee.month}/${fee.year}`);
            //});
        } else {
          return this.residencesService.getAll()
            .subscribe(residences => {
              residences.forEach(residence => {
                let calculatedFee = Calculations.doResidenceFeeCalculation(fee, residence);
                calculatedFee.residenceId = residence.$key;
                residence.payerId ? calculatedFee.payerId = residence.payerId : null;
                this.feesService.stageReports(residence.$key, calculatedFee)
                  .subscribe(() => {
                    //confirm(residence.code);
                    //notification
                  });
              });
              fee.hasReported = true;
              this.feesService.update(fee.$key, fee);
              confirm('ok');
              return;
            });
        }
      })
    // this.usersService.getAll()
    //   .subscribe(users => {
    //     users.forEach(user => {
    //       this.residencesService.get(user.residenceId)
    //         .subscribe(residence => {
    //           this.feesService.get(feeId)
    //             .subscribe(fee => {
    //               if (fee.hasReported) {
    //                 return confirm(`Έχουν εκδοθεί τα κοινόχρηστα για την ${fee.month}/${fee.year}`)
    //               } else {
    //                 let calculatedFee = Calculations.doResidenceFeeCalculation(fee, residence);
    //                 this.feesService.stageReports(user.$key, calculatedFee).then(() => {
    //                   fee.hasReported = true;
    //                   this.feesService.update(fee.$key, fee);
    //                   //notification
    //                   confirm('ok')
    //                 });
    //               }
    //               this.route.navigate([`all-house-fees/${user.$key}`])
    //             });
    //         });
    //     });
    //   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
