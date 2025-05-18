import { post } from '../api';

export class AwsApi {
  static async getPresignedUrl(extension?: string) {
    const { data } = await post<{
      presignedUrl: string;
      key: string;
      url: string;
    }>('/aws/presigned-url', { extension });
    return data;
  }
}
