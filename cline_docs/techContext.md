# 技術コンテキスト - Backlog MCP Server

## 使用技術
- **言語**: TypeScript
- **ランタイム**: Node.js
- **パッケージ管理**: npm
- **主要ライブラリ**:
  - `@modelcontextprotocol/sdk`: Model Context Protocol実装のコアライブラリ (v1.10.0)
  - `axios`: HTTPクライアントライブラリ (v1.6.0)
  - `zod`: スキーマ検証ライブラリ (v3.22.4)
  - `zod-to-json-schema`: ZodスキーマからJSON Schemaへの変換 (v3.22.3)

## 開発環境セットアップ
1. **依存関係のインストール**:
```bash
npm install
```

2. **ビルド**:
```bash
npm run build
```

3. **実行**:
```bash
npm start
```

## 環境変数
- `BACKLOG_API_TOKEN`: Backlog APIの認証トークン（必須）
- `BACKLOG_SPACE`: BacklogのスペースID（必須）

## ビルド構成
- `tsconfig.json` でTypeScriptのコンパイルオプションを設定
- ESモジュール形式を使用 (`"type": "module"` in package.json)
- ビルド済みコードは `build/` ディレクトリに格納

## デプロイ方法
- npmパッケージとして公開可能
- `npx -y https://github.com/pj8/backlog-mcp-server` コマンドで直接実行可能

## 技術的制約
1. **認証**: BacklogのAPIトークンによる認証のみサポート
2. **通信プロトコル**: HTTPSのみ使用（BacklogのAPIが要求）
3. **データフォーマット**: JSONのみ対応
4. **エラーハンドリング**: 
   - Backlog API独自のエラーコードを解釈する必要あり
   - ネットワークエラーの適切な処理
5. **レート制限**: Backlog APIのレート制限に従う必要あり

## パフォーマンス考慮事項
- Backlog APIへのリクエスト数を最小限に抑える
- レスポンスはキャッシュしない設計（常に最新データを取得）
- 大量のコメントがある課題では、ページネーションパラメータを活用する

## セキュリティ
- APIトークンは環境変数で管理
- 通信は全てHTTPS経由
- トークンの権限は必要最小限に設定することを推奨

## 依存関係管理
- package.jsonでのバージョン指定
- 主要な依存関係はセマンティックバージョニングでアップデート管理
