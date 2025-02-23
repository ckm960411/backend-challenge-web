'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KakaoCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    alert('카카오 로그인이 완료되었습니다.');
    router.push('/');
  }, []);

  return <div>KakaoCallbackPage</div>;
}
