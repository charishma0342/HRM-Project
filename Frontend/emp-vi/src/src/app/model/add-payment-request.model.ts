export class AddPaymentRequest{
    paymentName : string;
    cardNumber : string;
    nameOnTheCard : string;
    expiryDate : Date;
    securityCode : string;
    default : boolean;

    constructor(paymentName, cardNumber, nameOntheCard, expiryDate, securityCode, isDefault){
        this.paymentName = paymentName;
        this.cardNumber = cardNumber;
        this.nameOnTheCard = nameOntheCard;
        this.expiryDate = expiryDate;
        this.securityCode = securityCode;
        this.default = isDefault;
    }
}