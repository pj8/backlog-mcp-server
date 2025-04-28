#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { BacklogClient } from './client.js';

// 環境変数から設定を取得、または引数で指定されたAPIトークンとスペース名を使用
const API_TOKEN = process.env.BACKLOG_API_TOKEN;
const SPACE = process.env.BACKLOG_SPACE;

if (!API_TOKEN || !SPACE) {
  console.error('環境変数 BACKLOG_API_TOKEN と BACKLOG_SPACE を設定してください');
  process.exit(1);
}

// Backlog APIクライアントの初期化
const backlogClient = new BacklogClient(API_TOKEN, SPACE);

// MCPサーバーを作成
const server = new McpServer({
  name: "Backlog MCP Server",
  version: "1.0.0",
});

// 課題情報取得ツールを追加
server.tool(
  "get_issue",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
  },
  async ({ issueIdOrKey }) => {
    try {
      const result = await backlogClient.getIssue({ issueIdOrKey });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// 課題コメント取得ツールを追加
server.tool(
  "get_issue_comments",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
    minId: z.number().optional().describe("最小コメントID"),
    maxId: z.number().optional().describe("最大コメントID"),
    count: z.number().optional().describe("取得上限(1-100) 指定が無い場合は20"),
    order: z.enum(["asc", "desc"]).optional().describe("昇順/降順 指定が無い場合は降順(desc)"),
  },
  async ({ issueIdOrKey, minId, maxId, count, order }) => {
    try {
      const result = await backlogClient.getIssueComments({
        issueIdOrKey,
        minId,
        maxId,
        count,
        order,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// 課題添付ファイル一覧取得ツールを追加
server.tool(
  "get_issue_attachments",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
  },
  async ({ issueIdOrKey }) => {
    try {
      const result = await backlogClient.getIssueAttachments({ issueIdOrKey });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// 課題添付ファイルダウンロードツールを追加
server.tool(
  "get_issue_attachment",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
    attachmentId: z.string().describe("添付ファイルID"),
  },
  async ({ issueIdOrKey, attachmentId }) => {
    try {
      const result = await backlogClient.getIssueAttachment({ issueIdOrKey, attachmentId });
      return {
        content: [{ type: "text", text: JSON.stringify({ 
          message: "ファイルをBase64エンコードで返却します",
          fileData: result.fileData.substring(0, 100) + "..." // サイズが大きいため先頭部分のみ表示
        }, null, 2) }],
      };
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
  }
);

// 課題共有ファイル一覧取得ツールを追加
server.tool(
  "get_issue_shared_files",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
  },
  async ({ issueIdOrKey }) => {
    try {
      const result = await backlogClient.getIssueSharedFiles({ issueIdOrKey });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// 課題追加ツールを追加
server.tool(
  "add_issue",
  {
    projectId: z.number().describe("プロジェクトID"),
    summary: z.string().describe("課題の件名"),
    issueTypeId: z.number().describe("課題の種別ID"),
    priorityId: z.number().optional().describe("優先度ID (任意)"),
    description: z.string().optional().describe("課題の詳細 (任意)"),
    startDate: z.string().optional().describe("開始日 (YYYY-MM-DD形式) (任意)"),
    dueDate: z.string().optional().describe("期限日 (YYYY-MM-DD形式) (任意)"),
    estimatedHours: z.number().optional().describe("予定時間 (任意)"),
    actualHours: z.number().optional().describe("実績時間 (任意)"),
    parentIssueId: z.number().optional().describe("親課題ID (任意)"),
    assigneeId: z.number().optional().describe("担当者のユーザーID (任意)"),
  },
  async (params) => {
    try {
      const result = await backlogClient.addIssue(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// 課題更新ツールを追加
server.tool(
  "update_issue",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
    summary: z.string().optional().describe("課題の件名 (任意)"),
    issueTypeId: z.number().optional().describe("課題の種別ID (任意)"),
    priorityId: z.number().optional().describe("優先度ID (任意)"),
    description: z.string().optional().describe("課題の詳細 (任意)"),
    statusId: z.number().optional().describe("状態ID (任意)"),
    startDate: z.string().optional().describe("開始日 (YYYY-MM-DD形式) (任意)"),
    dueDate: z.string().optional().describe("期限日 (YYYY-MM-DD形式) (任意)"),
    estimatedHours: z.number().optional().describe("予定時間 (任意)"),
    actualHours: z.number().optional().describe("実績時間 (任意)"),
    assigneeId: z.number().optional().describe("担当者のユーザーID (任意)"),
    comment: z.string().optional().describe("更新時のコメント (任意)"),
  },
  async (params) => {
    try {
      const result = await backlogClient.updateIssue(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// 課題コメント追加ツールを追加
server.tool(
  "add_comment",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
    content: z.string().describe("コメント内容"),
    notifiedUserId: z.array(z.number()).optional().describe("お知らせしたいユーザーIDの配列 (任意)"),
  },
  async ({ issueIdOrKey, content, notifiedUserId }) => {
    try {
      const result = await backlogClient.addComment({
        issueIdOrKey,
        content,
        notifiedUserId,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// 課題コメント更新ツールを追加
server.tool(
  "update_comment",
  {
    issueIdOrKey: z.string().describe("課題のID または 課題キー"),
    commentId: z.number().describe("コメントID"),
    content: z.string().describe("更新するコメント内容"),
  },
  async ({ issueIdOrKey, commentId, content }) => {
    try {
      const result = await backlogClient.updateComment({
        issueIdOrKey,
        commentId,
        content,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// プロジェクト種別一覧取得ツールを追加
server.tool(
  "get_project_issue_types",
  {
    projectIdOrKey: z.string().describe("プロジェクトのID または プロジェクトキー"),
  },
  async ({ projectIdOrKey }) => {
    try {
      const result = await backlogClient.getProjectIssueTypes({ projectIdOrKey });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
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
  }
);

// サーバーを起動
async function start() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`Backlog MCP Server ready (Space: ${SPACE})`);
    console.error(`Available tools: get_issue, get_issue_comments, get_issue_attachments, get_issue_attachment, get_issue_shared_files, add_issue, update_issue, add_comment, update_comment, get_project_issue_types`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start().catch(console.error);
