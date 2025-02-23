'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    alert('구글 로그인이 완료되었습니다.');
    router.push('/');
  }, []);

  return <div>GoogleCallbackPage</div>;
}
