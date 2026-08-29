import React from 'react';
import { SiteSettings, AppRoute } from '../types';
import { Building2, Phone, Mail, MapPin, ExternalLink, ChevronRight, Shield } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (route: AppRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const navLinks: { label: string; route: AppRoute }[] = [
    { label: '홈', route: '/' },
    { label: '회사소개', route: '/company' },
    { label: '양성화안내', route: '/legalization' },
    { label: '공지사항', route: '/notice' },
    { label: '양성화검토신청서(무료)', route: '/apply' },
  ];

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top CTA highlight bar inside footer */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/50 mb-3">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>건축사 직접 무료 1차 서류 검토</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              위반건축물 해결, 혼자 고민하지 마시고 전문가와 상의하세요.
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              이행강제금 부과, 불법 증축, 무단 용도변경 문제에 대해 합법적인 해결 가능성을 사전에 검토해 드립니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              id="footer-cta-naver-btn"
              href={settings.naverFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>무료 양성화 검토신청</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              id="footer-cta-phone-btn"
              href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>전화문의 {settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Company identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {settings.siteName}
                </span>
                <span className="block text-xs text-blue-400 font-medium">
                  위반건축물 양성화 전문 건축사사무소
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              범진건축사사무소는 건축법령과 실무 경험을 토대로 위반건축물의 현황과 법적 쟁점을 면밀히 분석하고, 의뢰인의 상황에 부합하는 합법적인 양성화 방안을 제시합니다.
            </p>

            <div className="pt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-800">
              <p>
                ※ 본 웹사이트에 제공된 정보는 건축 관계 법령에 따른 일반적 안내이며, 건축물의 개별 조건 및 지자체 조례에 따라 실제 인허가 결과는 달라질 수 있습니다. 모든 위반건축물이 양성화 대상이 되는 것은 아닙니다.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              바로가기
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => {
                      onNavigate(link.route);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer py-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onNavigate('/admin/login');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-500 hover:text-slate-300 flex items-center space-x-1.5 transition-colors cursor-pointer py-1 text-xs"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                  <span>관리자 로그인</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Office Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              사무소 정보
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <span className="font-semibold text-slate-200 min-w-[70px]">사무소명:</span>
                <span>{settings.siteName}</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="font-semibold text-slate-200 min-w-[70px]">대표자:</span>
                <span>{settings.representative}</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                  className="text-slate-200 hover:text-white font-semibold"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-slate-300 hover:text-white"
                >
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {navLinks.map((item, idx) => (
              <React.Fragment key={item.route}>
                <button
                  onClick={() => {
                    onNavigate(item.route);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-slate-300 transition-colors"
                >
                  {item.label}
                </button>
                {idx < navLinks.length - 1 && <span className="text-slate-700">|</span>}
              </React.Fragment>
            ))}
          </div>
          <p>© {settings.siteName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
