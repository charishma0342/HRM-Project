export class AuthenticationRequest{
    userName : string;
    password : string;

    constructor(username,password){
        this.userName = username
        this.password = password
    }
}