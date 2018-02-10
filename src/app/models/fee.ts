export class Fee {
    year:number;
    month:number;
    sewage: number;
    pool: number;
    electric: number;
    water: number;
    garden: number;

    get total() {
        return this.sewage +
            this.electric +
            this.garden +
            this.pool +
            this.water;
    }
}