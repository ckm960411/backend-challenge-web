export interface User {
  id: number;
  email: string;
  name: string;
  provider: 'local' | 'google' | 'kakao';
  providerId: string | null;
}
