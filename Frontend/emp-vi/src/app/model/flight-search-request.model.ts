export class FlightSearchRequest{
    sourceCity : string;
    destinationCity : string;
  //  startDate : Date;
  //  returnDate : Date;
  //  return : boolean;

    constructor(sourceCity, destinationCity){
        this.sourceCity = sourceCity;
        this.destinationCity = destinationCity;
       // this.startDate = startDate;
       // this.returnDate = endDate;
        //this.return = isReturn;
    }
}