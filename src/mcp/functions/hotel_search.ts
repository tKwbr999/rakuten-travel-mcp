import { simpleHotelSearch } from "../../rakuten/client";
import { hotelSearchResponseMapper } from "../../rakuten/mappers";
import { HotelSearchResponse } from "../../rakuten/types";
import { logger } from "../../utils/logger";
import { BadRequestError } from "../../utils/errors";

export const hotelSearch = async (args: any): Promise<any> => {
  logger.info("hotelSearch function called", args);

  if (!args.keyword && !args.areaCode && !args.latitude && !args.longitude) {
    throw new BadRequestError(
      "検索キーワード、エリアコード、緯度・経度のいずれかを指定してください。"
    );
  }

  try {
    logger.info("Calling Rakuten API", args);
    const response = await simpleHotelSearch({
      keyword: args.keyword,
      areaCode: args.areaCode,
      latitude: args.latitude,
      longitude: args.longitude,
      searchRadius: args.searchRadius,
      checkInDate: args.checkInDate,
      checkOutDate: args.checkOutDate,
      adultNum: args.adultNum,
      childrenNum: args.childrenNum,
      roomNum: args.roomNum,
      sort: args.sort,
      order: args.order,
      page: args.page,
      pageSize: args.pageSize,
    });

    logger.info("Rakuten API response", response);
    const hotelSearchResponse: HotelSearchResponse =
      hotelSearchResponseMapper(response);

    return {
      content: [
        {
          type: "json",
          json: hotelSearchResponse,
        },
      ],
    };
  } catch (error: any) {
    logger.error("Error calling Rakuten API", error);
    throw new Error(`楽天APIエラー: ${error.message}`);
  }
};
