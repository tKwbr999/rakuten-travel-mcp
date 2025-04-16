# 楽天トラベルMCP

楽天トラベルAPIをModel Context Protocol (MCP)に対応させるサーバーです。LLMアプリケーション（Claude、GPT-4等）から楽天トラベルAPIを利用可能にします。
https://webservice.rakuten.co.jp/documentation/simple-hotel-search
## システム概要

本システムは以下の機能を提供します：
- MCPプロトコルに準拠したAPIインターフェース
- 楽天トラベルAPIとの統合
- エラーハンドリングとロギング機能

## 技術スタック

- **言語**: TypeScript 5.x
- **実行環境**: Node.js 20.x
- **フレームワーク**: Express 4.x
- **MCP実装**: @modelcontextprotocol/typescript-sdk
- **API通信**: Axios
- **バリデーション**: Zod
- **設定管理**: dotenv

## プロジェクト構成

```
src/
├── index.ts                # エントリーポイント
├── config.ts               # 設定管理
├── mcp/                    # MCPプロトコル関連
│   ├── schema/             # MCPスキーマ定義
│   ├── functions/          # MCP関数実装
│   └── server.ts           # MCPサーバー設定
├── rakuten/                # 楽天トラベル連携
│   ├── client.ts           # APIクライアント
│   ├── types.ts            # 型定義
│   └── mappers.ts          # データ変換
└── utils/                  # ユーティリティ
    ├── logger.ts           # ロギング
    └── errors.ts           # エラーハンドリング
```

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 環境変数の設定
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

3. 開発サーバーの起動
```bash
npm run dev
```

## ドキュメント

詳細な設計ドキュメントは`spec`ディレクトリを参照してください：
- [アーキテクチャ設計書](spec/architecture.md)
- [プロジェクト計画](spec/plan_1_main.md)