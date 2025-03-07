import { get, post } from '../api';

export class AuthApi {
  static async signup(dto: { email: string; password: string; name: string }) {
    const { data } = await post(`/auth/signup`, dto);
    return data;
  }

  static async signin(dto: { email: string; password: string }) {
    const { data } = await post<{ accessToken: string }>(`/auth/signin`, dto);
    return data;
  }

  static async googleSignin() {
    const { data } = await get(`/auth/signin/google`);
    return data;
  }

  static async kakaoSignin() {
    const { data } = await get(`/auth/signin/kakao`);
    return data;
  }

  static async requestPasswordReset(dto: {
    email: string;
    currentPassword: string;
  }) {
    return post<void>(`/auth/password/reset-request`, dto);
  }

  static async verifyPasswordCode(dto: { email: string; code: string }) {
    const { data } = await post<{ isValid: boolean }>(
      `/auth/password/verify-code`,
      dto
    );
    return data;
  }

  static async resetPassword(dto: {
    email: string;
    code: string;
    newPassword: string;
  }) {
    return post<void>(`/auth/password/reset`, dto);
  }
}
