import React from 'react';
import { SiteSettings, AppRoute } from '../types';
import { GoogleMapSection } from '../components/GoogleMapSection';
import {
  Building2,
  Award,
  ShieldCheck,
  Scale,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Users,
} from 'lucide-react';

interface CompanyPageProps {
  settings: SiteSettings;
  onNavigate: (route: AppRoute) => void;
}

export const CompanyPage: React.FC<CompanyPageProps> = ({ settings, onNavigate }) => {
  return (
    <div id="company-page" className="w-full bg-white">
      {/* Page Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 px-4 sm:px-8 border-b border-slate-800 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800 mb-4 inline-block">
            ABOUT BUMJIN ARCHITECTS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
            회사소개
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            건축물에 관한 전문적인 검토와 건축 관련 업무를 수행하는 신뢰할 수 있는 건축사사무소입니다.
          </p>
        </div>
      </section>

      {/* Main Introduction Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Detailed Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
              <div className="inline-block text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                전문성과 원칙
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                위반건축물, 정확한 현황 검토와<br />
                합법적 건축 행정 솔루션을 제공합니다.
              </h2>
              <p className="text-slate-700">
                <strong>범진건축사사무소</strong>는 건축물에 관한 전문적인 검토와 건축 관련 인허가 업무를 수행하는 건축사사무소입니다.
              </p>
              <p className="text-slate-700">
                특히 <strong>위반건축물</strong>과 관련하여 건축물의 현황과 위반내용을 검토하고 관련 법령 및 건축기준 등을 확인하여 고객에게 합리적인 해결방안을 안내하는 것을 목표로 합니다.
              </p>
              <p className="text-slate-600 text-sm">
                건축물대장상 위반 표기로 인한 이행강제금 부과, 재산권 처분의 제한, 금융권 대출 제한 등 건축주가 겪는 다양한 고충에 대해 법률적·기술적 분석을 통해 가장 현실적이고 안전한 대안을 제시해 드립니다.
              </p>
            </div>

            {/* Visual badge card */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                범진건축사사무소 3대 원칙
              </h3>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">철저한 법령 기준 준수</strong>
                    <span className="text-xs text-slate-500">건축법, 지자체 조례 및 소방·안전 규정을 엄격히 검토합니다.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">과장 없는 정직한 상담</strong>
                    <span className="text-xs text-slate-500">불가능한 사안을 무조건 된다고 현혹하지 않고 객관적으로 진단합니다.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">건축사 1:1 맞춤 검토</strong>
                    <span className="text-xs text-slate-500">풍부한 인허가 실무 경험을 바탕으로 합리적인 해결책을 안내합니다.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* COMPANY INFO Box (Specified in Section 11) */}
          <div id="company-info-box" className="bg-white border-2 border-slate-900 rounded-2xl p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                  OFFICIAL DIRECTORY
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  COMPANY INFO
                </h3>
              </div>
              <a
                href={settings.naverFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <span>무료 양성화 검토신청</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 pt-8 text-sm">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium">사무소명</span>
                  <span className="font-bold text-slate-900 text-base">{settings.siteName}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium">대표자</span>
                  <span className="font-bold text-slate-900 text-base">{settings.representative}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium">대표전화</span>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                    className="font-bold text-slate-900 text-base hover:text-blue-700 transition-colors"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium">이메일</span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-bold text-slate-900 text-base hover:text-blue-700 transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="md:col-span-2 flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium">주소</span>
                  <span className="font-bold text-slate-900 text-base leading-relaxed">
                    {settings.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Representative Architect Greeting */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-7 bg-blue-700 rounded-full" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                대표 건축사 인사말
              </h3>
            </div>

            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <p>
                안녕하십니까, 범진건축사사무소입니다.
              </p>
              <p>
                건축물은 개인에게 가장 소중한 자산이자 삶의 터전입니다. 그러나 복잡하고 수시로 개정되는 건축법령, 일조권 및 건폐율 규정, 주차장 설치 의무 등의 제약으로 인해 의도치 않게 위반건축물로 적발되어 막대한 이행강제금과 매매 곤란을 겪는 사례가 늘어나고 있습니다.
              </p>
              <p>
                위반건축물 문제는 단순히 벌금을 내는 것으로 해결되지 않습니다. 관할 관청과의 정식 협의, 현장 실측을 통한 양성화 가능성 산출, 도면 작성 및 인허가 변경 등 실질적인 건축 전문가의 손길이 반드시 필요합니다.
              </p>
              <p>
                범진건축사사무소는 고객의 절박한 입장에 깊이 공감하며, 원칙과 법의 테두리 안에서 찾을 수 있는 가장 최선의 합법적 출구를 안내해 드릴 것을 약속드립니다.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">
                범진건축사사무소 대표 건축사 구영진
              </span>
              <span className="text-xs text-slate-500 font-medium">
                대한건축사협회 정회원
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <GoogleMapSection address={settings.address} officeName={settings.siteName} />
    </div>
  );
};
