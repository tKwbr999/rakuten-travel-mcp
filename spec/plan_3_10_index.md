### 10. メインエントリーポイントの実装

`src/index.ts`:

```typescript
import express from 'express';
import { mcpServer } from './mcp/server';
import config from './config';
import { logger } from './utils/logger';

// Expressアプリケーションの作成
const app = express();

// JSONミドルウェアの設定
app.use(express.json());

// MCPエンドポイントの設定
app.use('/mcp', mcpServer.createExpressEndpoint());

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', version: config.mcp.serverVersion });
});

// 404ハンドラー
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// エラーハンドラー
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('サーバーエラー:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    code: err.code || 'SERVER_ERROR'
  });
});

// サーバー起動
const port = config.server.port;
app.listen(port, () => {
  logger.info(`MCPサーバーを起動しました。ポート: ${port}`);
  logger.info(`MCPエンドポイント: http://localhost:${port}/mcp`);
  logger.info(`ヘルスチェック: http://localhost:${port}/health`);
});
```