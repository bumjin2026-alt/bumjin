import React, { useState } from 'react';
import { AuthService, ADMIN_USERNAME, ADMIN_EMAIL } from '../services/authService';
import { AppRoute, AdminUser } from '../types';
import { ShieldCheck, Lock, ArrowLeft, Eye, EyeOff, ShieldAlert, CheckCircle2, User, KeyRound } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onNavigate: (route: AppRoute) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle ID / Password Login
  const handleIdPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await AuthService.loginWithIdPassword(adminId, password);
      if (res.success && res.user) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          onLoginSuccess(res.user!);
          onNavigate('/admin');
        }, 500);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Google Login Option
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await AuthService.loginWithGoogle();
      if (res.success && res.user) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          onLoginSuccess(res.user!);
          onNavigate('/admin');
        }, 500);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="admin-login-screen" className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-slate-100/80">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            관리자 로그인
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            범진건축사사무소 홈페이지 통합 CMS 관리 시스템
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div
            id="login-error-alert"
            className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-2 text-xs text-red-800 animate-in fade-in"
          >
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div
            id="login-success-alert"
            className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2 text-xs text-emerald-800 animate-in fade-in"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* Main ID/Password Form */}
        <form onSubmit={handleIdPasswordLogin} className="space-y-4 pt-1">
          {/* Admin ID Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700" htmlFor="admin-id-input">
              아이디 (ID)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="admin-id-input"
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700" htmlFor="admin-password-input">
                비밀번호 (Password)
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="admin-id-login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-blue-900 hover:bg-blue-950 active:scale-[0.99] text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer mt-2"
          >
            <ShieldCheck className="w-4 h-4 text-blue-300" />
            <span>{loading ? '인증 처리 중...' : '로그인'}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center pt-2">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
            또는
          </span>
        </div>

        {/* Google Login Alternative */}
        <div className="space-y-3 pt-1">
          <button
            id="admin-google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 active:scale-[0.99] text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2.5 shadow-xs hover:border-slate-400 transition-all disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google 계정으로 로그인</span>
          </button>
        </div>

        {/* Back to Home button */}
        <div className="pt-3 border-t border-slate-100 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center space-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>홈으로 돌아가기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
