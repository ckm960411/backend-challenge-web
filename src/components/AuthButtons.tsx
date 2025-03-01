import Link from 'next/link';
import Image from 'next/image';

export default function AuthButtons() {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Link
        href="/signin"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        로그인 페이지 이동
      </Link>
      <Link
        href="/signup"
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      >
        회원가입 페이지 이동
      </Link>
    </div>
  );
}
