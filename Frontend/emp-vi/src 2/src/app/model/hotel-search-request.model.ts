export class HotelSearchRequest{
    sourceCity : string;
    franchiseName : string;
    checkInDate : any;
    checkOutDate : any;

    constructor(sourceCity, franchiseName, checkInDate, checkOutDate){
        this.sourceCity = sourceCity;
        this.franchiseName = franchiseName;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }
}