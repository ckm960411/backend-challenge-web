import { atom } from 'jotai';
import type { User } from '@/utils/types/user.interface';

export const userAtom = atom<User | null>(null);
