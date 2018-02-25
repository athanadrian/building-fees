import { BaseModel } from "./base-model";

export class Residence extends BaseModel{
    code: string;
    sewage: number = 0;
    pool: number = 0;
    electric: number = 0;
    water: number = 0;
    garden: number = 0;
    isAvailable: boolean = false;
    debt: number = 0;
    residentId: string;
    payerId: string;

}