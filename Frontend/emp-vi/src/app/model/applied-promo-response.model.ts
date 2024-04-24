export class AppliedPromoResponse{
    valid : boolean;
    offeredDiscount : number;
    promoId : number;
    promoName : string;

    constructor(valid, offeredDiscount, promoId, promoName){
        this.valid = valid;
        this.offeredDiscount = offeredDiscount;
        this.promoId = promoId;
        this.promoName = promoName;
    }
}