
export class TransactionRequest{
    userId : number;
    flightId : number;
    flightPassengers : number;
    returnFlightId : number;
    returnFlightPassengers : number;
    hotelRoomId : number;
    numberOfHotelRooms : number;
    checkInDate : Date;
    checkOutDate : Date;
    price : number;
    taxPrice : number;
    promoCode : number;
    paidPrice : number;
    remainingMileage : number;
    discountPrice : number;
    redeemedPrice : number;
    offerPrice : number;
    paymentId : any;

    constructor(userId, flightId, flightPassengers, returnFlightId, returnFlightPassengers, hotelRoomId, numberOfHotelRooms, checkInDate, checkOutDate, price, taxPrice, promoCode, paidPrice, remainingMileage, discountPrice, redeemedPrice, offerPrice, paymentId){
        this.userId = userId;
        this.flightId = flightId;
        this.flightPassengers = flightPassengers;
        this.returnFlightId =  returnFlightId;
        this.returnFlightPassengers = returnFlightPassengers;
        this.hotelRoomId = hotelRoomId;
        this.numberOfHotelRooms = numberOfHotelRooms;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.price = price;
        this.taxPrice =  taxPrice;
        this.promoCode = promoCode;
        this.paidPrice = paidPrice;
        this.remainingMileage = remainingMileage;
        this.discountPrice = discountPrice;
        this.redeemedPrice = redeemedPrice;
        this.offerPrice = offerPrice;
        this.paymentId = paymentId;
    }
}