import React, { useState } from 'react';
import { AuthService } from '../services/authService';
import { AppRoute, AdminUser } from '../types';
import { ShieldCheck, Lock, ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onNavigate: (route: AppRoute) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Authorized Admin Email per Specification
  const authorizedEmail = 'bumjin2026@gmail.com';

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

  // Test Non-Admin Rejection Handler (to verify RBAC security)
  const handleTestNonAdmin = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await AuthService.verifyAdminAccount('unauthorized_user@gmail.com');
      if (!res.success) {
        setErrorMessage(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="admin-login-screen" className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-lg p-8 sm:p-10 space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            범진건축사사무소 관리자 로그인
          </h1>
          <p className="text-xs text-slate-500">
            홈페이지 콘텐츠 및 공지사항 관리를 위한 관리자 인증 시스템입니다.
          </p>
        </div>

        {/* Security Warning Box */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1.5">
          <div className="flex items-center space-x-1.5 font-bold text-blue-950">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>보안 인증 안내</span>
          </div>
          <p className="leading-relaxed">
            본 관리자 시스템은 등록된 관리자 이메일 계정(<strong>{authorizedEmail}</strong>)에 한하여 접근 권한이 부여됩니다.
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-2 text-xs text-red-800 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2 text-xs text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Primary Google Login Button */}
        <div className="space-y-3 pt-2">
          <button
            id="admin-google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {/* Google Vector Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Google 계정으로 관리자 로그인</span>
          </button>

          {/* Demonstration / Verification Button for RBAC Rejection Check */}
          <div className="pt-2">
            <button
              onClick={handleTestNonAdmin}
              type="button"
              className="w-full text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer py-1"
            >
              [보안 테스트: 비인가 계정 접근 시 차단 검증]
            </button>
          </div>
        </div>

        {/* Back to Home button */}
        <div className="pt-4 border-t border-slate-100 text-center">
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
