### 1. プロジェクトセットアップ

```bash
# プロジェクトディレクトリの作成と初期化
mkdir -p ~/dev/active/rakuten-travel-mcp/src
cd ~/dev/active/rakuten-travel-mcp
npm init -y

# 必要なパッケージのインストール
npm install typescript @types/node ts-node --save-dev
npm install @modelcontextprotocol/typescript-sdk express dotenv axios zod
npm install @types/express --save-dev

# TypeScript設定ファイルの作成
npx tsc --init
```