### 8. MCP関数の実装

`src/mcp/functions/hotelSearch.ts`:

```typescript
import * as rakutenAPI from '../../rakuten/client';
import { 
  hotelSearchParamsSchema, 
  hotelDetailParamsSchema, 
  vacantHotelSearchParamsSchema,
  keywordHotelSearchParamsSchema,
  hotelRankingParamsSchema
} from '../schema';
import type { MCPFunction } from '@modelcontextprotocol/typescript-sdk';
import { z } from 'zod';
import { logger } from '../../utils/logger';

// シンプルホテル検索関数
export const simpleHotelSearch: MCPFunction = {
  name: 'simpleHotelSearch',
  description: '楽天トラベルの簡易ホテル検索APIを呼び出し、エリアやキーワードなどの条件に一致するホテル情報を取得します',
  parameters: hotelSearchParamsSchema,
  returns: z.any().describe('ホテル検索結果'),
  execute: async (params) => {
    logger.info('simpleHotelSearch実行:', params);
    const result = await rakutenAPI.simpleHotelSearch(params);
    return result;
  },
};

// ホテル詳細検索関数
export const hotelDetailSearch: MCPFunction = {
  name: 'hotelDetailSearch',
  description: '楽天トラベルのホテル詳細検索APIを呼び出し、指定されたホテルの詳細情報を取得します',
  parameters: hotelDetailParamsSchema,
  returns: z.any().describe('ホテル詳細情報'),
  execute: async (params) => {
    logger.info('hotelDetailSearch実行:', params);
    const result = await rakutenAPI.hotelDetailSearch(params);
    return result;
  },
};

// 空室検索関数
export const vacantHotelSearch: MCPFunction = {
  name: 'vacantHotelSearch',
  description: '楽天トラベルの空室検索APIを呼び出し、指定された条件に一致する空室情報を持つホテルを検索します',
  parameters: vacantHotelSearchParamsSchema,
  returns: z.any().describe('空室検索結果'),
  execute: async (params) => {
    logger.info('vacantHotelSearch実行:', params);
    const result = await rakutenAPI.vacantHotelSearch(params);
    return result;
  },
};

// キーワードホテル検索関数
export const keywordHotelSearch: MCPFunction = {
  name: 'keywordHotelSearch',
  description: '楽天トラベルのキーワードホテル検索APIを呼び出し、指定されたキーワードに一致するホテルを検索します',
  parameters: keywordHotelSearchParamsSchema,
  returns: z.any().describe('キーワード検索結果'),
  execute: async (params) => {
    logger.info('keywordHotelSearch実行:', params);
    const result = await rakutenAPI.keywordHotelSearch(params);
    return result;
  },
};

// ホテルランキング取得関数
export const hotelRanking: MCPFunction = {
  name: 'hotelRanking',
  description: '楽天トラベルのホテルランキングAPIを呼び出し、人気のホテルランキング情報を取得します',
  parameters: hotelRankingParamsSchema,
  returns: z.any().describe('ホテルランキング結果'),
  execute: async (params) => {
    logger.info('hotelRanking実行:', params);
    const result = await rakutenAPI.hotelRanking(params);
    return result;
  },
};
```

`src/mcp/functions/areaSearch.ts`:

```typescript
import * as rakutenAPI from '../../rakuten/client';
import { 
  areaSearchParamsSchema,
  hotelChainListParamsSchema 
} from '../schema';
import type { MCPFunction } from '@modelcontextprotocol/typescript-sdk';
import { z } from 'zod';
import { logger } from '../../utils/logger';

// エリアクラス取得関数
export const getAreaClass: MCPFunction = {
  name: 'getAreaClass',
  description: '楽天トラベルのエリアクラス取得APIを呼び出し、エリア情報を階層的に取得します',
  parameters: areaSearchParamsSchema,
  returns: z.any().describe('エリア情報'),
  execute: async (params) => {
    logger.info('getAreaClass実行:', params);
    const result = await rakutenAPI.getAreaClass(params);
    return result;
  },
};

// ホテルチェーンリスト取得関数
export const getHotelChainList: MCPFunction = {
  name: 'getHotelChainList',
  description: '楽天トラベルのホテルチェーンリスト取得APIを呼び出し、ホテルチェーンの一覧を取得します',
  parameters: hotelChainListParamsSchema,
  returns: z.any().describe('ホテルチェーン一覧'),
  execute: async (params) => {
    logger.info('getHotelChainList実行:', params);
    const result = await rakutenAPI.getHotelChainList(params);
    return result;
  },
};
```

`src/mcp/functions/index.ts`:

```typescript
export * from './hotelSearch';
export * from './areaSearch';
```