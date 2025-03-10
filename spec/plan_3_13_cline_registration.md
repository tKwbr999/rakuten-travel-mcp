### 13. cline登録用の情報作成

MCPサーバーをデプロイした後、clineに登録するための情報をまとめます:

1. **サーバー情報**:
   - **名前**: Rakuten Travel API
   - **説明**: 楽天トラベルAPIへのアクセスを提供するMCPサーバー
   - **エンドポイントURL**: https://your-deployed-server.com/mcp (デプロイ後の実際のURLに置き換え)
   - **アイコンURL**: (任意のアイコンURL)

2. **clineの登録手順**:
   - clineの設定画面を開く
   - 「MCP Servers」または「Connect」セクションに移動
   - 「Add new server」などのオプションを選択
   - 上記のサーバー情報を入力
   - 接続をテスト
   - 保存して有効化

3. **利用可能な関数の説明**:
   - `simpleHotelSearch`: エリア、位置情報などによるホテル検索
   - `hotelDetailSearch`: ホテル番号による詳細情報取得
   - `vacantHotelSearch`: 空室のあるホテル検索
   - `keywordHotelSearch`: キーワードによるホテル検索
   - `hotelRanking`: 人気ホテルランキング取得
   - `getAreaClass`: エリア情報の階層的取得
   - `getHotelChainList`: ホテルチェーン一覧取得

4. **利用例**:
   ```
   # 東京のホテルを検索する例
   simpleHotelSearch({"largeClassCode": "japan", "middleClassCode": "tokyo"})
   
   # 特定のホテル詳細を取得する例
   hotelDetailSearch({"hotelNo": "ホテル番号"})
   
   # 空室検索の例
   vacantHotelSearch({
     "checkinDate": "2025-04-01",
     "checkoutDate": "2025-04-02",
     "largeClassCode": "japan"
   })
   ```