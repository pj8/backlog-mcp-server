# 作業コンテキスト - Backlog MCP Server

## 現在の作業内容
- 種別一覧取得APIの実装
- ドキュメントの更新と進捗状況の反映

## 最近の変更点
- 種別一覧取得APIの実装 `get_project_issue_types`
- 課題添付ファイル関連APIの実装 (`get_issue_attachments`, `get_issue_attachment`, `get_issue_shared_files`)
- READMEの更新（機能リスト、チェックマークの更新）
- メモリーバンクの進捗ドキュメント更新

## 次のステップ
1. 追加した機能のテスト検証
   - リアルな課題データに対するテスト
   - エラーケースの確認
   - パフォーマンス検証
2. 他の拡張機能の実装検討
   - 課題作成/更新APIの実装
   - ファイルアップロード機能の追加
   - コメント追加機能の実装
3. エラーハンドリングの強化
   - より詳細なエラーメッセージの実装
   - 再試行メカニズムの検討

## 重要な決定事項
- 現時点では基本的な課題情報取得とコメント取得機能のみを実装
- 環境変数による設定方式を採用
- データはキャッシュせず、常に最新の情報を取得する設計

## 直近の課題
- CLINEからのアクセス時の動作確認
- 大量の課題/コメントがある場合のパフォーマンス検証
- エラー発生時のユーザーフレンドリーなメッセージ表示の改善

## 関連リソース
- [Backlog API リファレンス](https://developer.nulab.com/ja/docs/backlog/api/2/)
- [MCP SDK ドキュメント](https://github.com/modelcontextprotocol/typescript-sdk)
