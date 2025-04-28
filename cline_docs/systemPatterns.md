# システムパターン - Backlog MCP Server

## アーキテクチャ概要
このプロジェクトは、Model Context Protocol (MCP) フレームワークを利用してBacklog APIと連携するサーバーを実装しています。基本的なアーキテクチャは以下の通りです:

```
[CLINE AI] <---> [MCP Server] <---> [Backlog API]
```

## 主要コンポーネント

### 1. MCPサーバー (index.ts)
- `@modelcontextprotocol/sdk` を使用してMCPサーバーを構築
- ツール定義（get_issue, get_issue_comments）を登録
- StdioServerTransportを使用してCLINEとの通信を確立

### 2. Backlog APIクライアント (client.ts)
- axiosを使用してHTTPリクエストを行う
- 認証情報（APIトークン）を含めてリクエストを送信
- エラーハンドリングとレスポンスの整形

### 3. 型定義システム (types.ts)
- Zodスキーマを使用してツール入力のバリデーション
- TypeScriptインターフェースによるデータ構造の型定義
- APIレスポンスの型安全性を確保

## コードパターン

### エラーハンドリング
```typescript
try {
  // API通信など
} catch (error) {
  if (error instanceof Error) {
    return {
      content: [{ type: "text", text: error.message }],
      isError: true,
    };
  }
  return {
    content: [{ type: "text", text: "Unknown error" }],
    isError: true,
  };
}
```

### APIクライアント構築
```typescript
this.client = axios.create({
  baseURL,
  params: {
    apiKey: apiToken
  },
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### ツール定義パターン
```typescript
server.tool(
  "tool_name",
  {
    // Zodスキーマでパラメータ定義
    param: z.string().describe("パラメータの説明"),
  },
  async ({ param }) => {
    // ツールの実装
    return {
      content: [{ type: "text", text: "結果" }],
    };
  }
);
```

## 設計原則
1. **型安全性の重視**: TypeScriptの型システムを活用して入出力を明確に定義
2. **明確な関心の分離**: サーバー、クライアント、型定義を個別のファイルに分割
3. **エラーの適切な処理**: すべてのAPIコールでエラーをキャッチし、適切にフォーマット
4. **環境変数による設定**: API認証情報は環境変数で注入
5. **明確なインターフェース**: ユーザー向けツールの入力パラメータには説明を付与
