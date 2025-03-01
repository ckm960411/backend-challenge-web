'use client';

import { userAtom } from '@/utils/atoms/user';
import { User } from '@/utils/types/user.interface';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

export function UserSync({ initialUser }: { initialUser: User | null }) {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}
