export class PromoSearchRequest{
    sourceCity : string;
    destinationCity : string;
    startDate : Date;
    returnDate : Date;
    maximumRange : number;
    minimumRange : number;

    constructor(sourceCity, destinationCity, startDate, endDate, maximumRange, minimumRange){
        this.sourceCity = sourceCity;
        this.destinationCity = destinationCity;
        this.startDate = startDate;
        this.returnDate = endDate;
        this.maximumRange = maximumRange;
        this.minimumRange = minimumRange;
    }
}