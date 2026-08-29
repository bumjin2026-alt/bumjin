import React from 'react';
import { SiteSettings, AppRoute } from '../types';
import {
  ExternalLink,
  ClipboardList,
  AlertTriangle,
  FileCheck,
  Camera,
  FileText,
  MapPin,
  CheckCircle2,
  Phone,
  Shield,
} from 'lucide-react';

interface ApplyPageProps {
  settings: SiteSettings;
  onNavigate: (route: AppRoute) => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ settings, onNavigate }) => {
  return (
    <div id="apply-review-page" className="w-full bg-white">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 px-4 sm:px-8 border-b border-slate-800 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 inline-block mb-3">
            100% FREE REVIEW CONSULTATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
            양성화검토신청서(무료)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            위반건축물 문제, 건축사가 직접 관련 법령과 지자체 기준을 검토하여 합법적 해결 가능성을 진단해 드립니다.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto py-16 sm:py-20 px-4 sm:px-8 space-y-12">
        {/* Core Hero Application Card with Big CTA Button */}
        <div className="bg-white border-2 border-blue-900 rounded-2xl p-8 sm:p-12 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            네이버폼으로 간편하게 신청하세요
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            복잡한 서류 절차 없이, 네이버 계정으로 로그인 후 건축물 정보와 현황 사진을 제출해 주시면 범진건축사사무소에서 신속하게 1차 서류 검토를 진행합니다.
          </p>

          {/* Eye-catching Big CTA Button (Section 14) */}
          <div className="pt-2">
            <a
              id="apply-page-big-naver-btn"
              href={settings.naverFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 px-10 py-5 text-lg font-black text-white bg-blue-700 hover:bg-blue-800 active:scale-98 rounded-xl shadow-xl hover:shadow-blue-600/30 transition-all cursor-pointer group"
            >
              <span>무료 양성화 검토신청서 작성하기</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <p className="text-xs text-slate-400 mt-3">
              클릭 시 공식 네이버폼 신청 페이지가 새 창으로 안전하게 열립니다.
            </p>
          </div>
        </div>

        {/* Essential Preparation Checklist */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-6 bg-slate-900 rounded-full" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              신청 시 준비해 주시면 좋은 서류
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            아래 항목 중 준비 가능한 자료를 네이버폼에 첨부해 주시면 더욱 정밀한 법적 검토가 가능합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">
                  1. 건축물 정확한 주소지
                </strong>
                <span className="text-xs text-slate-500">
                  지번 주소 또는 도로명 주소 (동·호수 포함 필수)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start space-x-3">
              <Camera className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">
                  2. 위반 부위 현황 사진
                </strong>
                <span className="text-xs text-slate-500">
                  증축 부위, 베란다 새시, 옥탑, 내부 구조 등 스마트폰 촬영 사진
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start space-x-3">
              <FileCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">
                  3. 건축물대장 (소지 시)
                </strong>
                <span className="text-xs text-slate-500">
                  정부24 발급 표제부 및 전유부 (없을 경우 주소지로 대리 열람 가능)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">
                  4. 지자체 공문 (수령 시)
                </strong>
                <span className="text-xs text-slate-500">
                  구청에서 송달받은 시정명령 사전통지서 또는 이행강제금 부과 통지서
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Consultation Progress */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            신청 후 진행 절차
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="font-black text-blue-700">01. 신청서 작성</span>
              <p className="text-slate-600">네이버폼을 통한 기본 서류 및 주소 접수</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="font-black text-slate-700">02. 서류 1차 검토</span>
              <p className="text-slate-600">건축물대장 및 법령·조례 대조 분석</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="font-black text-slate-700">03. 결과 유선 안내</span>
              <p className="text-slate-600">건축사가 직접 양성화 가능성 피드백</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="font-black text-blue-700">04. 방문 및 실무 진행</span>
              <p className="text-slate-600">필요 시 현장 실측 및 인허가 업무 착수</p>
            </div>
          </div>
        </div>

        {/* Mandatory Legal Caution Notice (Section 14 & 26) */}
        <div className="p-6 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed space-y-1">
            <p className="font-bold text-amber-900">
              ※ 법률상 필수 안내사항
            </p>
            <p>
              무료 검토는 제출해 주신 자료를 바탕으로 기본적인 건축 기준 및 가능성을 사전 판단하는 절차이며, 관할 지방자치단체의 인허가 승인을 법적으로 최종 보장하는 것은 아닙니다.
            </p>
            <p>
              구체적인 건축 인허가 및 사용승인은 현장 정밀 실측과 관할 구청과의 정식 협의를 통해 최종 결정됩니다.
            </p>
          </div>
        </div>

        {/* Quick Phone Call Fallback */}
        <div className="text-center pt-4 text-xs text-slate-500">
          온라인 작성이 어려우신가요? 전화로도 친절히 안내해 드립니다:{' '}
          <a
            href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
            className="font-bold text-blue-800 hover:underline"
          >
            {settings.phone}
          </a>{' '}
          (평일 09:00~18:00)
        </div>
      </div>
    </div>
  );
};
