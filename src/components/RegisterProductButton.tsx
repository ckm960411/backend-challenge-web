'use client';

import { userAtom } from '@/utils/atoms/user';
import { useAtomValue } from 'jotai';
import Link from 'next/link';

export default function RegisterProductButton() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <></>;
  }

  return (
    <div className="w-full flex items-center justify-between">
      <p>상품등록 하러 가기</p>
      <Link
        href="/product/register"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        상품등록 페이지 이동
      </Link>
    </div>
  );
}
