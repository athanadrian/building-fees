export class Fee {
    year: string;
    month: string;
    sewage: number = 0;
    pool: number = 0;
    electric: number = 0;
    water: number = 0;
    garden: number = 0;

    set total(newTotal) {
        this.total = newTotal;
    }
    get total() {
        return this.sewage +
            this.electric +
            this.garden +
            this.pool +
            this.water;
    }
}