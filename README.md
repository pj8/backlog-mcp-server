## 機能
- [x] [課題情報の取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-issue/)
- [x] [課題コメントの取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-comment-list/)

## Install

- VSCode > CLINE > MCP Servers 設定画面 > Configure MCP Servers
<img width="1064" alt="Screenshot 2025-04-18 at 11 56 28" src="https://github.com/user-attachments/assets/783b72a0-ba0f-4769-8222-d5754d48573d" />

- 下記のようにbacklog-mcp-serverの設定を追加します。
  - BACKLOG_API_TOKENは、https://your-space-here.backlog.jp/EditApiSettings.action
  - BACKLOG_SPACEは、 https://your-space-here.backlog.jp ならば、your-space-here です

```jsonc
{
  "mcpServers": {
    "backlog": {
      "autoApprove": [
        "get_issue",
        "get_issue_comments"
      ],
      "disabled": false,
      "timeout": 60,
      "command": "npx",
      "args": [
        "-y",
        "https://github.com/pj8/backlog-mcp-server"
      ],
      "env": {
        "BACKLOG_API_TOKEN": "****",
        "BACKLOG_SPACE": "your-space-here"
      },
      "transportType": "stdio"
    }
  }
}
```

## 使い方
- CLINEにBacklog課題URLを与えて概要を説明させるなど
