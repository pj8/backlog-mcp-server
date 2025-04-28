# プロダクトコンテキスト - Backlog MCP Server

## 概要
Backlog MCP Server は、Model Context Protocol (MCP) を使用してBacklog APIと連携するサーバーです。このサーバーを使用することで、CLINE (AI アシスタント) がBacklogの課題情報やコメントにアクセスできるようになります。

## 解決する問題
- Backlogの課題情報を取得するためにAPIを直接操作する必要性を排除
- CLINEがBacklogのコンテキストを理解し、課題情報を参照できる機能を提供
- 課題URLを与えるだけで課題の概要を理解し、質問に答えられるようにする

## 主要機能
1. Backlog課題情報の取得: `/api/v2/issues/{issueIdOrKey}` エンドポイントを利用
2. Backlog課題コメントの取得: `/api/v2/issues/{issueIdOrKey}/comments` エンドポイントを利用

## 使用方法
- VSCodeのCLINE拡張機能のMCP Serversに設定を追加
- BacklogのAPIトークンとスペース名を環境変数として指定
- CLINEにBacklog課題URLを与えて情報を取得

## 期待される成果
- AI開発アシスタントがBacklogの課題情報を理解し、コンテキストを考慮した回答が可能になる
- 開発者がBacklogの課題情報をCLINEと共有する際の手間を削減
- 課題管理システムとAIアシスタントの連携による効率化
