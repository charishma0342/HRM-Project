export class HotelRoomResponse{
    hotelRoomId : number;
    price : number;
    amenities : string;
    roomType : string;

    constructor(sourceCity, price, amenities, roomType){
        this.hotelRoomId = sourceCity;
        this.price = price;
        this.amenities = amenities;
        this.roomType = roomType;
    }
}