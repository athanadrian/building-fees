import { BaseModel } from "./base-model";

export class Fee extends BaseModel{
    year: string;
    month: string;
    sewage: number = 0;
    pool: number = 0;
    electric: number = 0;
    water: number = 0;
    garden: number = 0;
    hasReported: boolean = false;
    total:number;
    get searchKey() {
        return this.year + this.month;
    }
    set searchKey(key) {
        this.searchKey = key;
    }
    // set total(newTotal) {
    //     this.total = newTotal;
    // }
    // get total() {
    //     return this.sewage +
    //         this.electric +
    //         this.garden +
    //         this.pool +
    //         this.water;
    // }
}

export class ResidenceFee extends Fee{
    feeId:string;
    residenceId:string;
    payerId:string;
    dateReported:string;
    dateViewed:Date;
}

export class ExtraFee extends BaseModel {
    title: string;
    description: string;
    amount: number;
    isForAll: boolean;
}