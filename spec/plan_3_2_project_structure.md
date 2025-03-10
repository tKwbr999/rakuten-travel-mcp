### 2. プロジェクト構造の設計

```
~/dev/active/rakuten-travel-mcp/
├── src/
│   ├── index.ts                # エントリーポイント
│   ├── config.ts               # 設定ファイル
│   ├── mcp/                    # MCP関連の実装
│   │   ├── schema/             # MCPスキーマ定義
│   │   │   ├── common.ts       # 共通スキーマ
│   │   │   ├── hotel.ts        # ホテル関連スキーマ
│   │   │   ├── area.ts         # エリア関連スキーマ
│   │   │   └── index.ts        # スキーマエクスポート
│   │   ├── functions/          # MCP関数実装
│   │   │   ├── hotelSearch.ts  # ホテル検索関数
│   │   │   ├── areaSearch.ts   # エリア検索関数
│   │   │   └── index.ts        # 関数エクスポート
│   │   └── server.ts           # MCPサーバー設定
│   ├── rakuten/                # 楽天トラベルAPI連携
│   │   ├── client.ts           # API クライアント
│   │   ├── types.ts            # データ型定義
│   │   └── mappers.ts          # データ変換関数
│   └── utils/                  # ユーティリティ関数
│       ├── logger.ts           # ロギング
│       └── errors.ts           # エラーハンドリング
├── .env.example                # 環境変数サンプル
├── .env                        # 環境変数（非コミット）
├── tsconfig.json               # TypeScript設定
├── package.json                # プロジェクト設定
└── README.md                   # プロジェクト説明
```