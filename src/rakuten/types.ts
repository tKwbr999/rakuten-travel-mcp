// src/rakuten/types.ts
export interface HotelSearchResponse {
  hotels: Hotel[];
  pagingInfo: PagingInfo;
}

export interface Hotel {
  hotelBasicInfo: HotelBasicInfo;
}

export interface HotelBasicInfo {
  hotelNo: number;
  hotelName: string;
  hotelKanaName: string;
  hotelSpecial: string;
  hotelMinPrice: number;
  hotelMaxPrice: number;
  latitude: number;
  longitude: number;
  postalCode: string;
  address1: string;
  address2: string;
  telephoneNo: string;
  faxNo: string;
  access: string;
  parkingInformation: string;
  hotelImageUrl: string;
  hotelThumbnailUrl: string;
  roomImageUrl: string;
  roomThumbnailUrl: string;
  hotelMapImageUrl: string;
  reviewCount: number;
  reviewAverage: number;
  userReview: string;
}

export interface PagingInfo {
  recordCount: number;
  pageCount: number;
  page: number;
  first: number;
  last: number;
}
