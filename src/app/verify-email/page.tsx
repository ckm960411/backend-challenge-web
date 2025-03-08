'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthApi } from '@/api/auth/auth.api';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await AuthApi.requestPasswordReset({
        email,
        currentPassword: password,
      });
      setShowVerificationField(true);
    } catch (err: any) {
      setError(err.response?.data?.message || '인증 코드 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { isValid } = await AuthApi.verifyPasswordCode({
        email,
        code: verificationCode,
      });

      if (isValid) {
        router.push(`/change-password?code=${verificationCode}&email=${email}`);
      } else {
        setError('유효하지 않은 인증 코드입니다.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '인증 코드 확인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-center">이메일 인증</h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            비밀번호를 변경하기 위해 이메일 인증이 필요합니다.
          </p>
        </div>

        {!showVerificationField ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendVerification}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  현재 비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-foreground hover:bg-[#383838] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? '처리중...' : '인증번호 전송'}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium"
              >
                인증번호
              </label>
              <input
                id="verificationCode"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="이메일로 전송된 인증번호를 입력하세요"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-foreground hover:bg-[#383838] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? '처리중...' : '인증번호 확인'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
