import { Fee, ResidenceFee } from "../../models/fee";
import { Residence } from "../../models/residence";

export class Calculations {
    static doResidenceFeeCalculation(totalfee: Fee, residence: Residence) {
        let residenceFee: ResidenceFee = new ResidenceFee();
        residenceFee.year = totalfee.year;
        residenceFee.month = totalfee.month;
        residenceFee.feeId=totalfee.$key;
        residenceFee.dateReported = (new Date()).toISOString();
        residenceFee.sewage = totalfee.sewage * residence.sewage / 100;
        residenceFee.pool = totalfee.pool * residence.pool / 100;
        residenceFee.electric = totalfee.electric * residence.electric / 100;
        residenceFee.garden = totalfee.garden * residence.garden / 100;
        residenceFee.water = totalfee.water * residence.water / 100;
        residenceFee.total= this.calculateNewTotal(residenceFee);
        return residenceFee;
    }

    static calculateNewTotal(fee: Fee):number {
        let newTotal = fee.electric + fee.garden + fee.pool + fee.sewage + fee.water;
        return newTotal;
    }
}