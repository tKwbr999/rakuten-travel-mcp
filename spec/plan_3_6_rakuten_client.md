### 6. 楽天トラベルAPI クライアントの実装

`src/rakuten/types.ts`:

```typescript
// 共通のリクエストパラメータ
export interface RakutenCommonParams {
  applicationId: string;
  affiliateId?: string;
  format?: string;
  formatVersion?: string;
  callback?: string;
}

// ホテル検索パラメータ
export interface SimpleHotelSearchParams extends RakutenCommonParams {
  largeClassCode?: string;
  middleClassCode?: string;
  smallClassCode?: string;
  detailClassCode?: string;
  hotelNo?: string;
  latitude?: number;
  longitude?: number;
  searchRadius?: number;
  squeezeCondition?: string;
  carrierType?: number;
  datumType?: number;
  page?: number;
  hits?: number;
  sortMethod?: number;
  allReturnFlag?: number;
}

// ホテル詳細検索パラメータ
export interface HotelDetailSearchParams extends RakutenCommonParams {
  hotelNo: string;
  carrier?: number;
  datumType?: number;
  hotelThumbnailSize?: number;
  responseType?: number;
}

// 空室検索パラメータ
export interface VacantHotelSearchParams extends RakutenCommonParams {
  checkinDate: string;
  checkoutDate: string;
  largeClassCode?: string;
  middleClassCode?: string;
  smallClassCode?: string;
  detailClassCode?: string;
  hotelNo?: string;
  roomCount?: number;
  adultNum?: number;
  childNum1?: number;
  childNum2?: number;
  childNum3?: number;
  childNum4?: number;
  childNum5?: number;
  maxCharge?: number;
  minCharge?: number;
  carrier?: number;
  datumType?: number;
  page?: number;
  hits?: number;
  hotelThumbnailSize?: number;
}

// エリアクラス取得パラメータ
export interface GetAreaClassParams extends RakutenCommonParams {
  largeClassCode?: string;
  middleClassCode?: string;
  smallClassCode?: string;
  detailClassCode?: string;
  allReturnFlag?: number;
}

// キーワードホテル検索パラメータ
export interface KeywordHotelSearchParams extends RakutenCommonParams {
  keyword: string;
  page?: number;
  hits?: number;
  carrier?: number;
  datumType?: number;
  hotelThumbnailSize?: number;
}

// ホテルチェーンリスト取得パラメータ
export interface GetHotelChainListParams extends RakutenCommonParams {
  // 追加パラメータなし
}

// ホテルランキングパラメータ
export interface HotelRankingParams extends RakutenCommonParams {
  genre?: string;
  page?: number;
  hits?: number;
  carrier?: number;
  datumType?: number;
  hotelThumbnailSize?: number;
}

// レスポンス型
export interface RakutenResponse<T> {
  pagingInfo?: {
    recordCount: number;
    pageCount: number;
    page: number;
    first: number;
    last: number;
  };
  [key: string]: any;
  error?: string;
}
```

`src/rakuten/client.ts`:

```typescript
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import { logger } from '../utils/logger';
import { RakutenApiError } from '../utils/errors';
import {
  RakutenCommonParams,
  SimpleHotelSearchParams,
  HotelDetailSearchParams,
  VacantHotelSearchParams,
  GetAreaClassParams,
  KeywordHotelSearchParams,
  GetHotelChainListParams,
  HotelRankingParams,
  RakutenResponse
} from './types';

// 楽天API基本URL
const BASE_URL = config.rakuten.baseUrl;
const API_VERSION = config.rakuten.apiVersion;

// 共通パラメータを作成
const getCommonParams = (): RakutenCommonParams => ({
  applicationId: config.rakuten.appId,
  ...(config.rakuten.affiliateId ? { affiliateId: config.rakuten.affiliateId } : {}),
  format: 'json',
  formatVersion: '2',
});

// APIリクエスト送信の共通関数
const sendRequest = async <T, P>(
  endpoint: string, 
  params: P,
  options: AxiosRequestConfig = {}
): Promise<RakutenResponse<T>> => {
  try {
    logger.debug(`楽天API ${endpoint} リクエスト送信:`, params);
    
    const url = `${BASE_URL}/${endpoint}/${API_VERSION}`;
    const response: AxiosResponse<RakutenResponse<T>> = await axios.get(url, {
      params: {
        ...getCommonParams(),
        ...params,
      },
      ...options,
    });

    if (response.data.error) {
      throw new RakutenApiError(`楽天API ${endpoint} エラー`, {
        error: response.data.error,
        params,
      });
    }

    logger.debug(`楽天API ${endpoint} レスポンス:`, {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`楽天API ${endpoint} リクエストエラー:`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        params,
      });
      throw new RakutenApiError(
        `楽天API ${endpoint} リクエストエラー: ${error.message}`,
        {
          status: error.response?.status,
          data: error.response?.data,
          params,
        }
      );
    }
    throw error;
  }
};

// Simple Hotel Search API
export const simpleHotelSearch = (params: Omit<SimpleHotelSearchParams, keyof RakutenCommonParams>) => {
  return sendRequest<any, SimpleHotelSearchParams>('SimpleHotelSearch', params);
};

// Hotel Detail Search API
export const hotelDetailSearch = (params: Omit<HotelDetailSearchParams, keyof RakutenCommonParams>) => {
  return sendRequest<any, HotelDetailSearchParams>('HotelDetailSearch', params);
};

// Vacant Hotel Search API
export const vacantHotelSearch = (params: Omit<VacantHotelSearchParams, keyof RakutenCommonParams>) => {
  return sendRequest<any, VacantHotelSearchParams>('VacantHotelSearch', params);
};

// Get Area Class API
export const getAreaClass = (params: Omit<GetAreaClassParams, keyof RakutenCommonParams>) => {
  return sendRequest<any, GetAreaClassParams>('GetAreaClass', params);
};

// Keyword Hotel Search API
export const keywordHotelSearch = (params: Omit<KeywordHotelSearchParams, keyof RakutenCommonParams>) => {
  return sendRequest<any, KeywordHotelSearchParams>('KeywordHotelSearch', params);
};

// Get Hotel Chain List API
export const getHotelChainList = (params: Omit<GetHotelChainListParams, keyof RakutenCommonParams> = {}) => {
  return sendRequest<any, GetHotelChainListParams>('GetHotelChainList', params);
};

// Hotel Ranking API
export const hotelRanking = (params: Omit<HotelRankingParams, keyof RakutenCommonParams>) => {
  return sendRequest<any, HotelRankingParams>('HotelRanking', params);
};
```