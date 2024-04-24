export class PromoResponse {
    id:                 number;
    promoCodeUsage:     string;
    promoCodeType:      string;
    promoCodeTitle:     string;
    promoCodeName:      string;
    promoCodeValue:     number;
    promoCodeMaxValue:  number;
    termsAndConditions: string;
    startDate:          Date;
    endDate:            Date;
    price:              number;
    mileage:            number;

    constructor(id, promoCodeUsage, promoCodeType, promoCodeTitle, promoCodeName, promoCodeValue, promoCodeMaxValue, termsAndConditions, startDate, endDate, price, mileage){
        this.id = id;
        this.promoCodeUsage = promoCodeUsage;
        this.promoCodeType = promoCodeType;
        this.promoCodeTitle = promoCodeTitle;
        this.promoCodeName = promoCodeName;
        this.promoCodeValue = promoCodeValue;
        this.promoCodeMaxValue = promoCodeMaxValue;
        this.termsAndConditions = termsAndConditions;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.mileage = mileage;
    }
}