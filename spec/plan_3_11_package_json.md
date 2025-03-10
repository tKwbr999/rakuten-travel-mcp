### 11. package.jsonの設定

`package.json`ファイルの`scripts`セクションを以下のように編集:

```json
{
  "name": "rakuten-travel-mcp",
  "version": "0.1.0",
  "description": "Model Context Protocol server for Rakuten Travel API",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts",
    "lint": "eslint src/**/*.ts",
    "test": "jest"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "rakuten",
    "travel",
    "api"
  ],
  "author": "",
  "license": "MIT"
}
```