import React from 'react';
import { SiteSettings, AppRoute, Post } from '../types';
import { GoogleMapSection } from '../components/GoogleMapSection';
import {
  FileSearch,
  Building,
  Wrench,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Calendar,
  Eye,
  FileText,
} from 'lucide-react';

interface HomePageProps {
  settings: SiteSettings;
  posts: Post[];
  onNavigate: (route: AppRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ settings, posts, onNavigate }) => {
  // Recent published notices
  const recentPosts = posts
    .filter((p) => p.isPublished)
    .slice(0, 3);

  return (
    <div id="home-page" className="w-full">
      {/* SECTION 1: HERO */}
      <section
        id="hero-section"
        className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden py-20 sm:py-28 lg:py-32 px-4 sm:px-8 border-b border-slate-800"
      >
        {/* Subtle Architectural Blueprint grid background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        
        {/* Diagonal architectural framing lines */}
        <div className="absolute -top-24 -right-24 w-96 h-96 border border-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 border border-slate-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/60 text-blue-300 text-xs font-semibold mb-6 tracking-wide shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>건축사 직접 면밀 검토 · 합법적 양성화 솔루션</span>
          </div>

          {/* Main Hero Copy (0.95x scaled) */}
          <h1 className="text-[28.5px] sm:text-[45.6px] lg:text-[57px] font-extrabold tracking-tight text-white leading-tight sm:leading-tight lg:leading-tight">
            {settings.heroTitle}
          </h1>

          {/* Sub Copy (0.97x scaled from current) */}
          <p className="mt-6 text-[16.3px] sm:text-[18.33px] lg:text-[20.37px] text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {settings.heroSubtitle}
          </p>

          {/* Key Trust Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10 pt-8 border-t border-slate-800/80 text-left">
            <div className="p-3 bg-slate-850/60 rounded-lg border border-slate-800">
              <span className="block text-xs text-slate-400 font-medium">검토 비용</span>
              <span className="text-base font-bold text-white">100% 무료</span>
            </div>
            <div className="p-3 bg-slate-850/60 rounded-lg border border-slate-800">
              <span className="block text-xs text-slate-400 font-medium">검토 주체</span>
              <span className="text-base font-bold text-white">공인 건축사</span>
            </div>
            <div className="p-3 bg-slate-850/60 rounded-lg border border-slate-800">
              <span className="block text-xs text-slate-400 font-medium">분석 기준</span>
              <span className="text-base font-bold text-white">건축법 및 조례</span>
            </div>
            <div className="p-3 bg-slate-850/60 rounded-lg border border-slate-800">
              <span className="block text-xs text-slate-400 font-medium">신청 방식</span>
              <span className="text-base font-bold text-white">간편 네이버폼</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="hero-primary-cta-naver"
              href={settings.naverFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-98 rounded-lg shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center space-x-2.5"
            >
              <span>{settings.heroCtaText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              id="hero-secondary-cta-guide"
              onClick={() => onNavigate('/legalization')}
              className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-slate-200 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{settings.heroSecondaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            ※ 제출된 서류를 바탕으로 사전 가능성을 신속히 분석하여 연락드립니다.
          </p>
        </div>
      </section>

      {/* SECTION 2: HOME - 전문분야 (주요 업무 3개) */}
      <section id="services-section" className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              CORE SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              범진건축사사무소의 주요 업무
            </h2>
            <p className="text-base text-slate-600 mt-3">
              위반건축물 해결부터 인허가 행정까지, 건축 전문가가 책임감을 가지고 진행합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: 위반건축물 양성화 */}
            <div
              id="service-card-1"
              className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-6 group-hover:bg-blue-800 group-hover:text-white transition-colors">
                  <FileSearch className="w-7 h-7" />
                </div>
                <div className="inline-block text-xs font-bold text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-md mb-2">
                  핵심 전문분야
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                  ① 위반건축물 양성화
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>위반건축물 현황 검토</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>관련 법령 및 기준 검토</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>양성화 가능 여부 검토</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>필요한 행정절차 안내</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('/legalization')}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1 cursor-pointer"
                >
                  <span>양성화 기준 자세히 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: 건축물 관련 업무 */}
            <div
              id="service-card-2"
              className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Building className="w-7 h-7" />
                </div>
                <div className="inline-block text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md mb-2">
                  종합 건축 업무
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                  ② 건축물 관련 업무
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>건축물 현황 검토</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>건축 관련 인허가 업무</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>건축물 관련 상담</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>설계변경 및 용도변경 신청</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('/company')}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
                >
                  <span>사무소 소개 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: 건축물 문제 해결 */}
            <div
              id="service-card-3"
              className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Wrench className="w-7 h-7" />
                </div>
                <div className="inline-block text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md mb-2">
                  분쟁 및 시정 대안
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                  ③ 건축물 문제 해결
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>건축물의 위반사항 검토</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>개선방안 검토</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>관계기관 협의에 필요한 건축 관련 업무</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                    <span>이행강제금 부과 시 법적 대응 방안 자문</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <a
                  href={settings.naverFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1"
                >
                  <span>지금 바로 검토 신청하기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOME - 위반건축물 양성화 안내 */}
      <section id="legalization-intro-section" className="py-20 px-4 sm:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit mb-6">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>정확한 사전 검토의 중요성</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              위반건축물 양성화, 먼저 정확한 검토가 필요합니다.
            </h2>

            <div className="mt-6 space-y-4 text-slate-700 text-base leading-relaxed">
              <p>
                위반건축물이라고 해서 모두 동일한 방법으로 해결할 수 있는 것은 아닙니다.
                건축물의 용도, 규모, 구조, 위치, 위반내용 및 관련 법령 등을 종합적으로 검토해야 합니다.
              </p>
              <p className="text-slate-600 text-sm">
                무조건 양성화가 가능하다는 과장된 홍보에 현혹되지 마시고, 공인된 건축사를 통해 건축물대장, 현장 실측 상태, 소방법, 주차장 설치 기준, 지자체 조례 적합성 등을 철저하게 사전 검증받으셔야 불필요한 비용과 행정처분을 막을 수 있습니다.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span className="font-semibold text-slate-800">※ 법률 고지:</span> 모든 위반건축물이 양성화 대상이 되는 것은 아닙니다.
              </div>
              <a
                id="home-mid-cta-btn"
                href={settings.naverFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>무료 검토신청하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOME - 업무 진행 절차 (4-Step Timeline) */}
      <section id="process-section" className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              WORK PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              체계적인 4단계 업무 진행 절차
            </h2>
            <p className="text-base text-slate-600 mt-3">
              신속한 1차 무료 검토부터 관계 관청 인허가 실무까지 단계별로 투명하게 안내합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative flex flex-col justify-between hover:border-blue-400 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-widest text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-md">
                    STEP 01
                  </span>
                  <ClipboardCheck className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  무료 검토신청
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  네이버폼을 통해 건축물 소재지 주소, 소유자 연락처 및 위반 부위 현황 사진을 간편하게 접수합니다.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] text-blue-700 font-semibold">
                온라인 간편 접수 (비용 0원)
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative flex flex-col justify-between hover:border-blue-400 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-widest text-slate-800 bg-slate-200 px-2.5 py-1 rounded-md">
                    STEP 02
                  </span>
                  <FileSearch className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  건축물 현황 및 위반사항 검토
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  건축사가 건축물대장, 현황도면, 위반사항 적발 내역 및 현장 구조 요건을 1차 정밀 분석합니다.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 font-semibold">
                건축사 1차 서류 정밀 판독
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative flex flex-col justify-between hover:border-blue-400 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-widest text-slate-800 bg-slate-200 px-2.5 py-1 rounded-md">
                    STEP 03
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  양성화 가능성 및 해결방안 검토
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  건축법, 용적률, 주차장, 일조권 등 관련 법령과 지자체 조례를 대조하여 합법화 및 개선 대안을 도출합니다.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 font-semibold">
                해결 방안 및 일정 유선 안내
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative flex flex-col justify-between hover:border-blue-400 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-widest text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-md">
                    STEP 04
                  </span>
                  <Building className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  필요한 건축 관련 업무 진행
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  현장 실측 도면 작성, 관계기관 행정 협의, 설계변경 및 정식 사용승인 절차를 원스톱으로 이행합니다.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] text-blue-700 font-semibold">
                위반건축물 표기 해제 및 마무리
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              id="process-bottom-apply-btn"
              href={settings.naverFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 text-base font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <span>지금 1단계 무료 검토 신청하기</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: 최신 공지사항 미리보기 */}
      <section id="recent-notices-section" className="py-16 px-4 sm:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
                NOTICE & CASE STUDY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                공지사항 및 건축 실무 안내
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/notice')}
              className="mt-4 sm:mt-0 text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1 cursor-pointer"
            >
              <span>전체 공지사항 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate(`/notice/${post.id}` as AppRoute)}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    {post.isImportant && (
                      <span className="px-2 py-0.5 text-[11px] font-bold bg-red-100 text-red-700 rounded-md">
                        중요
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.createdAt.slice(0, 10)}</span>
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2 line-clamp-2 leading-snug hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.content.replace(/[#*■]/g, '').slice(0, 140)}...
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-slate-600 font-medium">{post.author}</span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{post.viewCount}회</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: HOME - 회사 정보 & 찾아오시는 길 */}
      <GoogleMapSection address={settings.address} officeName={settings.siteName} />
    </div>
  );
};
