### 9. MCPサーバーの実装

`src/mcp/server.ts`:

```typescript
import { createMCPServer } from '@modelcontextprotocol/typescript-sdk';
import * as functions from './functions';
import config from '../config';
import { logger } from '../utils/logger';

// 全MCP関数を配列に集約
const mcpFunctions = [
  functions.simpleHotelSearch,
  functions.hotelDetailSearch,
  functions.vacantHotelSearch,
  functions.keywordHotelSearch,
  functions.hotelRanking,
  functions.getAreaClass,
  functions.getHotelChainList,
];

// MCPサーバー作成
export const mcpServer = createMCPServer({
  name: config.mcp.serverName,
  version: config.mcp.serverVersion,
  description: config.mcp.serverDescription,
  functions: mcpFunctions,
});

logger.info(`MCPサーバー初期化完了: ${config.mcp.serverName} (v${config.mcp.serverVersion})`);
```