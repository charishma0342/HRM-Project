import { HotelRoomResponse } from "./hotel-room-response.model";

export class HotelResponse {
    hotelId: number;
    franchiseName: string;
    hotelAddress: string;
    hotelName: string;
    hotelType: string;
    rating: number;
    location: string;
    hotelRoomsList: Array<HotelRoomResponse>;

    constructor(hotelId, franchiseName, hotelAddress, hotelName, hotelType, rating, location, hotelRoomsList) {
        this.hotelId = hotelId;
        this.franchiseName = franchiseName;
        this.hotelAddress = hotelAddress;
        this.hotelName = hotelName;
        this.hotelType = hotelType;
        this.rating = rating;
        this.location = location;
        this.hotelRoomsList = hotelRoomsList;
    }
}