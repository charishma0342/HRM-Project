export class EmployeeRequest{
    skillDomain : string;
    location : string;


    constructor(skillDomain, location){
        this.skillDomain = skillDomain;
        this.location = location;
       // this.startDate = startDate;
       // this.returnDate = endDate;
        //this.return = isReturn;
    }
}