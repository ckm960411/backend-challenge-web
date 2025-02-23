import axios from 'axios';
import { API_URL } from '../api';

export class AuthApi {
  static async signup(dto: { email: string; password: string; name: string }) {
    const { data } = await axios.post(`${API_URL}/auth/signup`, dto);
    return data;
  }

  static async signin(dto: { email: string; password: string }) {
    const { data } = await axios.post(`${API_URL}/auth/signin`, dto);
    return data;
  }

  static async googleSignin() {
    const { data } = await axios.get(`${API_URL}/auth/signin/google`);
    return data;
  }

  static async kakaoSignin() {
    const { data } = await axios.get(`${API_URL}/auth/signin/kakao`);
    return data;
  }
}
