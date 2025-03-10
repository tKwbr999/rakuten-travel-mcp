### 5. 設定ファイルの実装

`src/config.ts`:

```typescript
import dotenv from 'dotenv';
import { logger } from './utils/logger';

// 環境変数の読み込み
dotenv.config();

// 設定オブジェクト
export const config = {
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  rakuten: {
    appId: process.env.RAKUTEN_APP_ID || '',
    affiliateId: process.env.RAKUTEN_AFFILIATE_ID || '',
    baseUrl: 'https://app.rakuten.co.jp/services/api/Travel',
    apiVersion: '20170426',
  },
  mcp: {
    serverName: process.env.MCP_SERVER_NAME || 'rakuten-travel-mcp',
    serverVersion: process.env.MCP_SERVER_VERSION || '0.1.0',
    serverDescription: process.env.MCP_SERVER_DESCRIPTION || 'A Model Context Protocol server for Rakuten Travel API',
  },
};

// 必須の環境変数のチェック
if (!config.rakuten.appId) {
  logger.error('RAKUTEN_APP_ID環境変数が設定されていません。');
  process.exit(1);
}

export default config;
```