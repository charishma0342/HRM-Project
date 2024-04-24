export class ApplyPromoRequest{
    promoCode : string;
    totalPrice : number;
    userId : string;

    constructor(promoCode, totalPrice, userId){
        this.promoCode = promoCode;
        this.totalPrice = totalPrice;
        this.userId = userId;
    }
}