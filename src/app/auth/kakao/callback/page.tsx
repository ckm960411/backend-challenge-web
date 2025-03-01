'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    if (accessToken) {
      window.localStorage.setItem('accessToken', accessToken);
      alert('카카오 로그인이 완료되었습니다.');
    } else {
      alert('카카오 로그인에 실패했습니다.');
    }
    router.push('/');
  }, []);

  return <div>KakaoCallbackPage</div>;
}
