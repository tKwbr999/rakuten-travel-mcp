### 16. テスト計画

#### テストレベル

1. **単体テスト**:
   - APIクライアント関数のテスト
   - MCP関数のテスト
   - ユーティリティ関数のテスト
   
   ```typescript
   // client.test.ts の例
   import { simpleHotelSearch } from '../src/rakuten/client';
   import axios from 'axios';
   
   jest.mock('axios');
   const mockedAxios = axios as jest.Mocked<typeof axios>;
   
   describe('rakuten/client', () => {
     beforeEach(() => {
       jest.clearAllMocks();
     });
     
     it('should call SimpleHotelSearch API with correct parameters', async () => {
       // モックレスポンスの設定
       const mockResponse = { data: { pagingInfo: { recordCount: 10 } } };
       mockedAxios.get.mockResolvedValue(mockResponse);
       
       // 関数の実行
       const result = await simpleHotelSearch({ largeClassCode: 'japan' });
       
       // アサーション
       expect(mockedAxios.get).toHaveBeenCalledTimes(1);
       expect(mockedAxios.get).toHaveBeenCalledWith(
         expect.stringContaining('SimpleHotelSearch'),
         expect.objectContaining({
           params: expect.objectContaining({ largeClassCode: 'japan' })
         })
       );
       expect(result).toEqual(mockResponse.data);
     });
   });
   ```

2. **統合テスト**:
   - MCPサーバーのエンドポイントテスト
   - エラーハンドリングのテスト
   - 実際の楽天APIとの連携テスト（制限付き）
   
   ```typescript
   // server.test.ts の例
   import request from 'supertest';
   import express from 'express';
   import { mcpServer } from '../src/mcp/server';
   
   describe('MCP Server', () => {
     const app = express();
     app.use(express.json());
     app.use('/mcp', mcpServer.createExpressEndpoint());
     
     it('should respond with the schema information', async () => {
       const response = await request(app).get('/mcp');
       
       expect(response.status).toBe(200);
       expect(response.body).toHaveProperty('functions');
       expect(response.body.functions).toContainEqual(
         expect.objectContaining({ name: 'simpleHotelSearch' })
       );
     });
     
     it('should execute a simple hotel search', async () => {
       // MCPリクエストの形式でテスト
       // 注意: このテストは楽天APIをモックするか、実際にAPIにアクセスする必要があります
     });
   });
   ```

3. **エンドツーエンドテスト**:
   - 完全なフロー（リクエストからレスポンスまで）のテスト
   - clineとの接続テスト（可能であれば）

#### テストツール

1. **Jest**: テストフレームワーク
2. **SuperTest**: HTTPリクエストのテスト
3. **Jest Mock**: 外部依存のモック化

#### テスト戦略

1. **モックとスタブ**:
   - 楽天APIのレスポンスをモック化
   - 環境変数の制御
   - エラー条件のシミュレーション

2. **テストデータ**:
   - 各APIに対するサンプルリクエスト/レスポンスのデータセット
   - エッジケースのデータセット

3. **CI/CD統合**:
   - プルリクエスト時の自動テスト実行
   - デプロイ前のテスト実行確認