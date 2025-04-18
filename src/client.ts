import axios from 'axios';
import type { GetIssueParams, GetIssueResponse, GetIssueCommentsParams, GetIssueCommentsResponse } from './types.js';

export class BacklogClient {
  private client;
  private space: string;

  constructor(apiToken: string, space: string) {
    this.space = space;
    
    // スペースのドメインからURLを作成
    const baseURL = `https://${space}.backlog.jp`;
    
    this.client = axios.create({
      baseURL,
      params: {
        apiKey: apiToken
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * 課題の詳細情報を取得する
   */
  async getIssue(params: GetIssueParams): Promise<GetIssueResponse> {
    try {
      const response = await this.client.get(`/api/v2/issues/${params.issueIdOrKey}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Backlog API Error: ${error.response?.status} - ${error.response?.statusText}`);
      }
      throw error;
    }
  }

  /**
   * 課題のコメント一覧を取得する
   */
  async getIssueComments(params: GetIssueCommentsParams): Promise<GetIssueCommentsResponse> {
    try {
      const { issueIdOrKey, ...queryParams } = params;
      const response = await this.client.get(`/api/v2/issues/${issueIdOrKey}/comments`, {
        params: queryParams
      });
      return { comments: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Backlog API Error: ${error.response?.status} - ${error.response?.statusText}`);
      }
      throw error;
    }
  }
}
