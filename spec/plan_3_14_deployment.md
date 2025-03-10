### 14. デプロイ計画

#### 開発・テスト環境

1. **ローカル開発環境**:
   ```bash
   # 環境変数を設定
   cp .env.example .env
   # .envファイルを編集して必要な値を設定
   
   # 開発モードでの実行
   npm run dev
   ```

2. **テスト実行**:
   ```bash
   # テストを実行
   npm test
   ```

#### 本番環境へのデプロイ

1. **ビルド**:
   ```bash
   # TypeScriptのコンパイル
   npm run build
   ```

2. **デプロイオプション**:

   a. **クラウドサービス (推奨)**:
   - **Render**: Webサービスとして簡単にデプロイ可能
   - **Railway**: 自動デプロイでGitHub連携が便利
   - **Vercel**: サーバーレス関数としてデプロイ可能
   - **AWS App Runner**: マネージドでコンテナ化不要
   
   b. **コンテナ化デプロイ**:
   ```dockerfile
   # Dockerfile
   FROM node:20-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY dist/ ./dist/
   
   EXPOSE 3000
   
   CMD ["node", "dist/index.js"]
   ```
   
   ```bash
   # ビルドとデプロイ
   docker build -t rakuten-travel-mcp .
   docker run -p 3000:3000 --env-file .env rakuten-travel-mcp
   ```
   
   c. **サーバーへの直接デプロイ**:
   ```bash
   # リモートサーバー上で
   git clone https://your-repo/rakuten-travel-mcp.git
   cd rakuten-travel-mcp
   npm install
   npm run build
   # PM2などでプロセス管理
   pm2 start dist/index.js --name rakuten-travel-mcp
   ```

3. **環境変数の設定**:
   - 本番環境でも必要な環境変数を設定
   - 特に `RAKUTEN_APP_ID` は必須
   - `NODE_ENV=production` に設定

4. **セキュリティ対策**:
   - HTTPS通信の確保
   - レート制限の実装検討
   - アクセス制限の検討（必要に応じて）

5. **監視体制**:
   - ログ監視
   - アップタイム監視
   - エラー通知の設定