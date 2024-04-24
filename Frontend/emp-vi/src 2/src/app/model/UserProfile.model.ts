export class UserProfile {
    id : BigInteger;
    firstName : string;
    lastName : string;
    phoneNumber : string;
    emailId : string;
    userAddress : string;
    travelMileage : number;
    userName : string;

    constructor(id, username, firstName, lastName, email, password, contactNum, travelMileage){
        this.id = id;
        this.userName = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId =  email;
        this.userAddress = password;
        this.phoneNumber = contactNum;
        this.travelMileage = travelMileage;
    }
}