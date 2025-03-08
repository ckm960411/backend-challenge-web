'use client';

import { useAtom } from 'jotai';
import { userAtom } from '@/utils/atoms/user';
import { useRouter } from 'next/navigation';

export default function LogoutSection() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const logout = async () => {
    // 클라이언트 상태 초기화
    setUser(null);

    // 클라이언트 쿠키 삭제 (옵션)
    document.cookie =
      'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

    // 캐시된 서버 컴포넌트 데이터 리프레시
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <p>이메일: {user?.email}</p>
      <button
        onClick={() => router.push('/verify-email')}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        비밀번호 변경
      </button>
      <button
        onClick={logout}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        로그아웃
      </button>
    </div>
  );
}
