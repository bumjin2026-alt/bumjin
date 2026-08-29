import React from 'react';
import { SiteSettings, AppRoute } from '../types';
import {
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Scale,
  ShieldAlert,
  Layers,
  Car,
  Sun,
  Maximize2,
  FileText,
  Building,
  CalendarCheck,
  Check,
  ArrowRight,
} from 'lucide-react';

interface LegalizationPageProps {
  settings: SiteSettings;
  onNavigate: (route: AppRoute) => void;
}

export const LegalizationPage: React.FC<LegalizationPageProps> = ({ settings, onNavigate }) => {
  // 10 Key Factors Affecting Legalization Feasibility (Section 12 - SECTION 3)
  const keyFactors = [
    {
      num: '01',
      title: '건축물의 용도',
      desc: '단독주택, 다세대/다가구, 제1·2종 근린생활시설 등 건축물대장상 법정 용도와 실제 사용 용도의 적합성',
      icon: Building,
    },
    {
      num: '02',
      title: '건축물의 규모',
      desc: '연면적, 층수, 세대수 등 특별조치법 또는 일반 건축법 기준상 허용 규모 범위 내 포함 여부',
      icon: Layers,
    },
    {
      num: '03',
      title: '위반 내용',
      desc: '무단 증축, 발코니 불법 확장, 계단실 전용, 옥상 가설물 설치, 세대분할(쪼개기) 등 구체적 위반 유형',
      icon: ShieldAlert,
    },
    {
      num: '04',
      title: '건폐율 및 용적률',
      desc: '해당 대지의 용도지역에 따른 법정 건폐율 및 용적률 상한선 내 수용 가능 여부',
      icon: Maximize2,
    },
    {
      num: '05',
      title: '구조 및 안전',
      desc: '건축물의 구조적 안전성, 내진설계 충족 여부, 내화구조 및 화재 피난 통로 기준 적합성',
      icon: Scale,
    },
    {
      num: '06',
      title: '주차장 설치 기준',
      desc: '주차장법 및 관할 지자체 주차장 조례에 따른 세대별/용도별 법정 주차대수 확보 물리적 가능성',
      icon: Car,
    },
    {
      num: '07',
      title: '일조권 및 높이 제한',
      desc: '정북방향 인접대지경계선으로부터의 이격거리(일조권 사선제한), 도로사선 및 최고높이 제한 저촉 여부',
      icon: Sun,
    },
    {
      num: '08',
      title: '도로 및 대지 조건',
      desc: '건축법상 4m 이상 도로 접도 의무(대지와 도로의 관계), 소방도로 확보 및 막다른 도로 기준 충족 여부',
      icon: FileCheck,
    },
    {
      num: '09',
      title: '해당 지자체 건축 조례',
      desc: '각 시·군·구청별로 상이하게 정해진 건축 조례상 이행강제금 산정 기준 및 완화 적용 지침',
      icon: FileText,
    },
    {
      num: '10',
      title: '건축 당시 및 현재 법령',
      desc: '준공 당시의 건축법 규정과 현행 법령의 차이 비교를 통한 추인(追認) 허가 가능성 분석',
      icon: CalendarCheck,
    },
  ];

  // 6-step Legalization Procedures (Section 12 - SECTION 4)
  const procedures = [
    {
      step: 'STEP 01',
      title: '상담 및 신청',
      desc: '네이버폼을 통해 건축물 주소와 현황 사진, 연락처를 접수하고 건축사 1:1 상담을 시작합니다.',
    },
    {
      step: 'STEP 02',
      title: '건축물 현황 및 위반사항 검토',
      desc: '건축물대장, 토지이용계획확인원, 현황도면 및 지자체 위반 적발 내역서를 정밀 조회합니다.',
    },
    {
      step: 'STEP 03',
      title: '현장 확인 및 도면 검토',
      desc: '필요 시 실제 현장 실측을 통해 위반 면적과 건축물의 구조, 주차장, 일조권 저촉 현황을 측정합니다.',
    },
    {
      step: 'STEP 04',
      title: '양성화 가능 여부 및 해결방안 도출',
      desc: '관계 법령과 조례를 대조하여 합법적 추인(허가/신고), 특정조치법 적용, 또는 부분 시정 대안을 수립합니다.',
    },
    {
      step: 'STEP 05',
      title: '필요한 건축 관련 업무 진행',
      desc: '건축 인허가 도면 작성, 관계 행정기관(구청 건축과, 주택과) 사전 협의 및 공식 행정 절차를 수행합니다.',
    },
    {
      step: 'STEP 06',
      title: '양성화 완료 및 건축물대장 정리',
      desc: '관할 관청의 현장 검사 및 사용승인을 득하여 건축물대장상의 [위반건축물] 표기를 공식 해제합니다.',
    },
  ];

  // Recommended Cases (Section 12 - SECTION 5)
  const targetAudience = [
    '구청·시청으로부터 위반건축물 시정명령 사전통지서를 받으신 분',
    '매년 반복적으로 수백~수천만 원의 이행강제금을 부과받고 계신 분',
    '부동산 매매 또는 전세·월세 임대 계약을 준비 중이나 위반 표기로 대출이 제한된 분',
    '베란다 불법 증축, 옥탑 증축 또는 근린생활시설(근생빌라) 무단 주거 문제를 합법적으로 해결하고 싶은 분',
    '내 건물이 법적으로 양성화 대상에 해당될 수 있는지 공인 건축사에게 무료로 확인받고 싶은 분',
  ];

  return (
    <div id="legalization-page" className="w-full bg-white">
      {/* Header Banner */}
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
            LEGALIZATION GUIDE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
            위반건축물 양성화 안내
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            복잡한 건축 법령과 기준, 건축 전문가의 정확한 사전 검토가 합법적 해결의 시작입니다.
          </p>
        </div>
      </section>

      {/* Mandatory Disclaimer Box (Section 12 & Section 26) */}
      <div className="bg-amber-50 border-b border-amber-200 py-6 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-start space-x-3 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <strong className="font-bold text-amber-950 block text-base mb-1">
              중요 고지: 모든 위반건축물이 양성화되는 것은 아닙니다.
            </strong>
            건축물의 현황과 관련 법령 및 지자체 조례를 종합적으로 검토해야 합니다. 특정건축물 정리에 관한 특별조치법 등 관련 제도 역시 법률의 구체적 시행 여부와 지자체 기준에 따라 적용 대상이 결정되므로, 사전에 공인 건축사의 면밀한 법리 검토가 필수적입니다.
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-16 sm:py-24 px-4 sm:px-8 space-y-24">
        {/* SECTION 1: 위반건축물이란? */}
        <section id="section-what-is-violation" className="space-y-6">
          <div className="border-l-4 border-slate-900 pl-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              SECTION 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              위반건축물이란?
            </h2>
          </div>

          <div className="text-slate-700 text-base sm:text-lg leading-relaxed bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
            <p>
              <strong>위반건축물</strong>이란 「건축법」 등 관계 법령에 적합하지 않게 허가나 신고 없이 신축, 증축, 개축, 대수선되거나 무단으로 용도가 변경된 건축물을 말합니다.
            </p>
            <p className="mt-3 text-slate-600 text-sm">
              지자체의 항공사진 판독, 주민 민원 신고, 일제 단속 등을 통해 적발되며, 적발 시 건축물대장 표제부에 [위반건축물]로 기재되고 원상복구 시까지 매년 반복적으로 이행강제금이 부과됩니다.
            </p>
          </div>

          {/* Common Violation Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center space-x-2 text-blue-900 font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>베란다·발코니 무단 증축</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                다세대주택 계단식 베란다에 샤시 및 샌드위치패널을 설치하여 거실이나 주방으로 확장한 경우
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center space-x-2 text-blue-900 font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>옥탑 및 패널 무단 증축</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                옥상에 주거용 방(옥탑방)이나 창고, 가설물을 허가 없이 증축하여 건축면적/연면적을 초과한 경우
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center space-x-2 text-blue-900 font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>근생빌라 무단 주거 전용</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                건축물대장상 2종 근린생활시설(사무소 등)로 허가받은 후 싱크대와 보일러를 설치하여 주거로 불법 사용하는 경우
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center space-x-2 text-blue-900 font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>가구 수 분할 (방 쪼개기)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                법정 주차대수 기준을 회피하기 위해 1개 세대 내부를 무단으로 가벽을 쳐서 여러 세대로 분할 임대하는 경우
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 위반건축물 양성화란? */}
        <section id="section-what-is-legalization" className="space-y-6">
          <div className="border-l-4 border-blue-800 pl-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              SECTION 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              위반건축물 양성화란?
            </h2>
          </div>

          <div className="text-slate-700 text-base sm:text-lg leading-relaxed bg-blue-50/50 p-6 sm:p-8 rounded-2xl border border-blue-100 space-y-4">
            <p>
              <strong>위반건축물 양성화</strong>란 특정건축물 정리에 관한 특별조치법 등 관련 제도에 따라 적용 대상이 되는 건축물에 대한 정리 가능성을 검토하고 필요한 행정·건축 인허가 절차를 진행하여 합법적인 건축물로 승인받는 일련의 과정을 의미합니다.
            </p>
            <p className="text-slate-600 text-sm">
              또한 현행 건축법령상 요건(건폐율, 용적률, 주차장, 구조안전)을 충족할 수 있는 경우에는 적법한 설계변경 및 추인(追認) 절차를 통해 합법화를 도모할 수 있습니다.
            </p>
          </div>
        </section>

        {/* SECTION 3: 양성화 가능 여부에 영향을 미치는 주요 사항 10가지 */}
        <section id="section-ten-factors" className="space-y-8">
          <div className="border-l-4 border-slate-900 pl-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              SECTION 03
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              양성화 가능 여부에 영향을 미치는 주요 사항 10가지
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              건축물마다 조건이 모두 다르므로, 아래의 10가지 핵심 법적 요건을 다각도로 종합 분석해야 합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyFactors.map((factor) => {
              const IconComp = factor.icon;
              return (
                <div
                  key={factor.num}
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-800 shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-blue-700">{factor.num}</span>
                      <h4 className="font-bold text-slate-900 text-base">{factor.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {factor.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: 양성화 진행 절차 (6단계) */}
        <section id="section-procedures" className="space-y-8">
          <div className="border-l-4 border-blue-800 pl-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              SECTION 04
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              양성화 진행 절차 (6단계)
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              체계적이고 투명한 6단계 절차를 통해 안전하게 합법화를 추진합니다.
            </p>
          </div>

          <div className="space-y-4">
            {procedures.map((proc, index) => (
              <div
                key={proc.step}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-colors gap-4"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <span className="px-3 py-1 rounded-md text-xs font-black tracking-wider bg-slate-900 text-white shrink-0">
                    {proc.step}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {proc.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {proc.desc}
                    </p>
                  </div>
                </div>
                {index === 0 && (
                  <a
                    href={settings.naverFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-1"
                  >
                    <span>지금 신청</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: 이런 분께 권합니다 */}
        <section id="section-target-cases" className="space-y-6">
          <div className="border-l-4 border-slate-900 pl-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              SECTION 05
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              이런 분께 권합니다
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              아래 5가지 상황 중 하나라도 해당되신다면 즉시 전문가 검토를 받으셔야 합니다.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            {targetAudience.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3.5 rounded-lg bg-white border border-slate-100 text-slate-800 text-sm font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Massive Conversion CTA Block */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 rounded-2xl p-8 sm:p-12 text-white text-center shadow-xl">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-600/50 border border-blue-400/40 text-blue-200 mb-4 inline-block">
            무료 사전 서류 검토
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            내 건축물 양성화 가능 여부,<br className="hidden sm:inline" /> 지금 무료로 검토받아 보세요.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            간단한 신청서 작성만으로 공인 건축사가 관계 법령과 조례를 면밀히 분석하여 신속히 회신드립니다.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="legalization-cta-apply-btn"
              href={settings.naverFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <span>무료 양성화 검토신청 바로가기</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('/apply')}
              className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              신청 절차 및 구비서류 안내
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            ※ 무료 검토는 제출해 주신 자료를 바탕으로 기본적인 검토를 진행하는 절차이며, 실제 인허가 가능 여부를 보장하는 것은 아닙니다.
          </p>
        </div>
      </div>
    </div>
  );
};
