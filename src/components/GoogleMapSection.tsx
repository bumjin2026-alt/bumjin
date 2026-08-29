import React, { useState } from 'react';
import { MapPin, Copy, Check, ExternalLink, Navigation, Bus, Car } from 'lucide-react';

interface GoogleMapSectionProps {
  address: string;
  officeName: string;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({ address, officeName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Maps Embed query URL - works smoothly with encoded address query
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const embedMapUrl = googleApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${encodeURIComponent(address)}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

  return (
    <div id="company-location-section" className="bg-slate-50 border-t border-slate-200 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            LOCATION & TRANSIT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            찾아오시는 길
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            지하철 7호선 / 경의중앙선 상봉역 인근에 위치하여 대중교통 이용이 매우 편리합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map display iframe */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden min-h-[380px] flex flex-col">
            <div className="relative w-full h-[380px] sm:h-[420px] bg-slate-100">
              <iframe
                title={`${officeName} 위치 지도`}
                src={embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            {/* Quick map direct buttons bar */}
            <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 font-bold rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center space-x-1"
                >
                  <span>네이버지도</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 font-bold rounded-md bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center space-x-1"
                >
                  <span>카카오맵</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={googleMapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 font-bold rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center space-x-1"
                >
                  <span>Google 지도</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Transit & office details */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>사무소 상세 주소</span>
                <button
                  onClick={handleCopyAddress}
                  className="text-xs font-semibold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">복사완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>주소 복사</span>
                    </>
                  )}
                </button>
              </h3>

              <div className="text-sm text-slate-700 space-y-1">
                <p className="font-bold text-slate-900">{officeName}</p>
                <p className="leading-relaxed">{address}</p>
                <p className="text-xs text-slate-500 pt-1">
                  ※ 시네마시티 빌딩 10층 1002호에 위치하고 있습니다.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-4 text-xs">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">지하철 이용 시</p>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      지하철 7호선 / 경의중앙선 / 경춘선 <strong>상봉역 2번 출구</strong>에서 망우역 방향으로 도보 3분 (약 250m)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">버스 이용 시</p>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      '망우역(중)' 또는 '상봉역2번출구' 간선/지선 버스 정류장 하차
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">자가용 주차 안내</p>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      건물 내 지하 주차장 완비 (방문 상담 시 주차 지원)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 text-white p-5 rounded-xl border border-blue-800 shadow-xs">
              <p className="text-xs font-semibold text-blue-200 mb-1">방문 상담 사전 예약 안내</p>
              <p className="text-xs text-blue-100 leading-relaxed">
                건축사의 외부 현장 조사 및 관공서 인허가 출장으로 인해, 사무소 방문 전 전화로 사전 일정을 예약해 주시면 보다 원활한 상담이 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
