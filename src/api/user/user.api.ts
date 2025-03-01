import { User } from '@/utils/types/user.interface';
import { get } from '../api';

export class UserApi {
  static async getMe() {
    const { data } = await get<User>('/user/me');
    return data;
  }
}
