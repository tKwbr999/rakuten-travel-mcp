// src/rakuten/mappers.ts
import { HotelSearchResponse } from "./types";

export const hotelSearchResponseMapper = (data: any): HotelSearchResponse => {
  return {
    hotels: data.hotels.map((hotel: any) => ({
      hotelBasicInfo: {
        hotelNo: hotel.hotelBasicInfo.hotelNo,
        hotelName: hotel.hotelBasicInfo.hotelName,
        hotelKanaName: hotel.hotelBasicInfo.hotelKanaName,
        hotelSpecial: hotel.hotelBasicInfo.hotelSpecial,
        hotelMinPrice: hotel.hotelBasicInfo.hotelMinPrice,
        hotelMaxPrice: hotel.hotelBasicInfo.hotelMaxPrice,
        latitude: hotel.hotelBasicInfo.latitude,
        longitude: hotel.hotelBasicInfo.longitude,
        postalCode: hotel.hotelBasicInfo.postalCode,
        address1: hotel.hotelBasicInfo.address1,
        address2: hotel.hotelBasicInfo.address2,
        telephoneNo: hotel.hotelBasicInfo.telephoneNo,
        faxNo: hotel.hotelBasicInfo.faxNo,
        access: hotel.hotelBasicInfo.access,
        parkingInformation: hotel.hotelBasicInfo.parkingInformation,
        hotelImageUrl: hotel.hotelBasicInfo.hotelImageUrl,
        hotelThumbnailUrl: hotel.hotelBasicInfo.hotelThumbnailUrl,
        roomImageUrl: hotel.hotelBasicInfo.roomImageUrl,
        roomThumbnailUrl: hotel.hotelBasicInfo.roomThumbnailUrl,
        hotelMapImageUrl: hotel.hotelBasicInfo.hotelMapImageUrl,
        reviewCount: hotel.hotelBasicInfo.reviewCount,
        reviewAverage: hotel.hotelBasicInfo.reviewAverage,
        userReview: hotel.hotelBasicInfo.userReview,
      },
    })),
    pagingInfo: {
      recordCount: data.pagingInfo.recordCount,
      pageCount: data.pagingInfo.pageCount,
      page: data.pagingInfo.page,
      first: data.pagingInfo.first,
      last: data.pagingInfo.last,
    },
  };
};
