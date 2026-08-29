import React, { useState } from 'react';
import { AuthService } from '../services/authService';
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
