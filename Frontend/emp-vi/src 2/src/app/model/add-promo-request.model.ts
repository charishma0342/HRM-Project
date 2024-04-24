export class AddPromoRequest{
    userId : number;
    promoId : number;
    paymentMethod : number;

    constructor(userId, promoId, paymentMethod){
        this.userId = userId;
        this.promoId = promoId;
        this.paymentMethod = paymentMethod;
    }
}