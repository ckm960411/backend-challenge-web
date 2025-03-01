'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    if (accessToken) {
      // 쿠키에 토큰 저장 (HttpOnly 쿠키는 서버에서 설정해야 함)
      document.cookie = `accessToken=${accessToken}; path=/`;
      alert('구글 로그인이 완료되었습니다.');
    } else {
      alert('구글 로그인에 실패했습니다.');
    }
    router.push('/');
  }, []);

  return <div>GoogleCallbackPage</div>;
}
