'use client';

import { userAtom } from '@/utils/atoms/user';
import { useAtomValue } from 'jotai';
import AuthButtons from './AuthButtons';
import LogoutSection from './LogoutSection';

export default function AuthSection() {
  const user = useAtomValue(userAtom);

  return user ? <LogoutSection /> : <AuthButtons />;
}
