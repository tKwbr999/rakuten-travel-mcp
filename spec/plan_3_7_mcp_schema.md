### 7. MCPスキーマの実装

`src/mcp/schema/common.ts`:

```typescript
import { z } from 'zod';

// 共通のパラメータスキーマ
export const commonParamsSchema = z.object({
  applicationId: z.string().optional().describe('楽天APIアプリケーションID（未設定時は環境変数から自動設定）'),
  affiliateId: z.string().optional().describe('楽天アフィリエイトID（未設定時は環境変数から自動設定）'),
});
```

`src/mcp/schema/hotel.ts`:

```typescript
import { z } from 'zod';
import { commonParamsSchema } from './common';

// ホテル検索パラメータスキーマ
export const hotelSearchParamsSchema = commonParamsSchema.extend({
  largeClassCode: z.string().optional().describe('大エリアコード'),
  middleClassCode: z.string().optional().describe('中エリアコード'),
  smallClassCode: z.string().optional().describe('小エリアコード'),
  detailClassCode: z.string().optional().describe('詳細エリアコード'),
  hotelNo: z.string().optional().describe('ホテル番号'),
  latitude: z.number().optional().describe('緯度'),
  longitude: z.number().optional().describe('経度'),
  searchRadius: z.number().optional().describe('検索範囲'),
  page: z.number().optional().default(1).describe('ページ番号'),
  hits: z.number().optional().default(30).describe('1ページあたりの取得件数'),
  minCharge: z.number().optional().describe('最低料金'),
  maxCharge: z.number().optional().describe('最高料金'),
});

// ホテル詳細検索パラメータスキーマ
export const hotelDetailParamsSchema = commonParamsSchema.extend({
  hotelNo: z.string().describe('ホテル番号（必須）'),
});

// 空室検索パラメータスキーマ
export const vacantHotelSearchParamsSchema = commonParamsSchema.extend({
  checkinDate: z.string().describe('チェックイン日(YYYY-MM-DD)'),
  checkoutDate: z.string().describe('チェックアウト日(YYYY-MM-DD)'),
  adultNum: z.number().default(1).describe('大人人数'),
  roomNum: z.number().default(1).describe('部屋数'),
  hotelNo: z.string().optional().describe('ホテル番号'),
  largeClassCode: z.string().optional().describe('大エリアコード'),
  middleClassCode: z.string().optional().describe('中エリアコード'),
  smallClassCode: z.string().optional().describe('小エリアコード'),
  detailClassCode: z.string().optional().describe('詳細エリアコード'),
  maxCharge: z.number().optional().describe('最高料金'),
  minCharge: z.number().optional().describe('最低料金'),
  page: z.number().optional().default(1).describe('ページ番号'),
  hits: z.number().optional().default(30).describe('1ページあたりの取得件数'),
});

// キーワードホテル検索パラメータスキーマ
export const keywordHotelSearchParamsSchema = commonParamsSchema.extend({
  keyword: z.string().describe('検索キーワード（必須）'),
  page: z.number().optional().default(1).describe('ページ番号'),
  hits: z.number().optional().default(30).describe('1ページあたりの取得件数'),
});

// ホテルランキングパラメータスキーマ
export const hotelRankingParamsSchema = commonParamsSchema.extend({
  genre: z.string().optional().describe('ジャンル'),
  page: z.number().optional().default(1).describe('ページ番号'),
  hits: z.number().optional().default(30).describe('1ページあたりの取得件数'),
});
```

`src/mcp/schema/area.ts`:

```typescript
import { z } from 'zod';
import { commonParamsSchema } from './common';

// エリア検索パラメータスキーマ
export const areaSearchParamsSchema = commonParamsSchema.extend({
  largeClassCode: z.string().optional().describe('大エリアコード'),
  middleClassCode: z.string().optional().describe('中エリアコード'),
  smallClassCode: z.string().optional().describe('小エリアコード'),
  detailClassCode: z.string().optional().describe('詳細エリアコード'),
  allReturnFlag: z.number().optional().describe('全情報取得フラグ'),
});

// ホテルチェーンリスト取得パラメータスキーマ
export const hotelChainListParamsSchema = commonParamsSchema;
```

`src/mcp/schema/index.ts`:

```typescript
export * from './common';
export * from './hotel';
export * from './area';
```