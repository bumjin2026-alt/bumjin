import React, { useState } from 'react';
import { SiteSettings, AppRoute, AdminUser } from '../types';
import { Phone, Lock, LogOut, Menu, X, Building2, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  settings: SiteSettings;
  adminUser: AdminUser | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  settings,
  adminUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: AppRoute; badge?: string }[] = [
    { label: '홈', route: '/' },
    { label: '회사소개', route: '/company' },
    { label: '양성화안내', route: '/legalization' },
    { label: '공지사항', route: '/notice' },
    { label: '양성화검토신청서(무료)', route: '/apply', badge: '무료' },
  ];

  const handleNavClick = (route: AppRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (route: AppRoute) => {
    if (route === '/') return currentRoute === '/';
    return currentRoute.startsWith(route);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all"
    >
      {/* Top micro bar for telephone & fast notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">위반건축물 양성화 무료 사전 검토 진행 중</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              id="header-top-phone-link"
              href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center space-x-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold tracking-wide">{settings.phone}</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">평일 09:00 - 18:00 (방문상담 예약제)</span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="header-brand-logo"
          onClick={() => handleNavClick('/')}
          className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
        >
          <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:bg-blue-900 transition-colors">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
                {settings.siteName}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-blue-50 text-blue-800 border border-blue-200 rounded-md">
                건축사사무소
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-tight">
              위반건축물 양성화 · 합법화 전문 검토
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const active = isActive(item.route);
            return (
              <button
                key={item.route}
                id={`nav-link-${item.route.replace('/', '') || 'home'}`}
                onClick={() => handleNavClick(item.route)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all rounded-md cursor-pointer ${
                  active
                    ? 'text-blue-900 bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-800 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Quick Apply CTA */}
          <a
            id="header-cta-apply-btn"
            href={settings.naverFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 active:scale-98 rounded-lg shadow-sm transition-all flex items-center space-x-1.5"
          >
            <span>무료 양성화 검토신청</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>

          {/* Admin Login / Dashboard Button */}
          {adminUser ? (
            <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-200">
              <button
                id="header-admin-dashboard-btn"
                onClick={() => handleNavClick('/admin')}
                className="px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center space-x-1.5 transition-colors"
                title="관리자 대시보드로 이동"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>관리자</span>
              </button>
              <button
                id="header-admin-logout-btn"
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="header-admin-login-btn"
              onClick={() => handleNavClick('/admin/login')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 rounded-lg flex items-center space-x-1.5 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>관리자로그인</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center space-x-2 lg:hidden">
          <a
            id="mobile-header-quick-call"
            href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
            className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            aria-label="전화 걸기"
          >
            <Phone className="w-5 h-5 text-blue-700" />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.route);
              return (
                <button
                  key={item.route}
                  id={`mobile-nav-${item.route.replace('/', '') || 'home'}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-4 py-3 text-base font-semibold rounded-lg flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-900 font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="px-2 py-0.5 text-xs font-bold bg-blue-700 text-white rounded-full">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <a
                id="mobile-nav-cta-apply"
                href={settings.naverFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center text-sm font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-sm flex items-center justify-center space-x-2"
              >
                <span>무료 양성화 검토신청 (네이버폼)</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              {adminUser ? (
                <div className="flex items-center space-x-2">
                  <button
                    id="mobile-admin-dashboard-btn"
                    onClick={() => handleNavClick('/admin')}
                    className="flex-1 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center space-x-1.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>관리자 대시보드</span>
                  </button>
                  <button
                    id="mobile-admin-logout-btn"
                    onClick={onLogout}
                    className="px-4 py-2.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>로그아웃</span>
                  </button>
                </div>
              ) : (
                <button
                  id="mobile-admin-login-btn"
                  onClick={() => handleNavClick('/admin/login')}
                  className="w-full py-2.5 text-center text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>관리자로그인</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
