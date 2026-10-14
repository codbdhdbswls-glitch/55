import React, { useState } from 'react';
import { Sparkles, RotateCw, Award, ArrowRight, Skull, Droplet, ShieldAlert } from 'lucide-react';

interface SalonFortuneBannerProps {
  onOpenRoulette: () => void;
  isReserved?: boolean;
}

export const SalonFortuneBanner: React.FC<SalonFortuneBannerProps> = ({
  onOpenRoulette,
  isReserved = false,
}) => {
  const [forkRotate, setForkRotate] = useState(0);

  const handleForkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setForkRotate((prev) => prev + 720);
  };

  return (
    <section
      className={`border-t py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${
        isReserved
          ? 'border-[#3D141C] bg-[#120B0C] text-[#E0D3CC]'
          : 'border-[#E8DFD3] bg-[#F7F2EB] text-[#2C2724]'
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <div
          className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-10 shadow-2xl transition-all ${
            isReserved
              ? 'border-[#591420] bg-gradient-to-br from-[#1C0E11] via-[#140A0C] to-[#240F14] hover:border-red-700'
              : 'border-[#D5C2AF] bg-[#FAF8F5] hover:border-[#C9B6A3]'
          }`}
        >
          {/* Decorative Background Accents */}
          <div
            className={`pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full blur-3xl ${
              isReserved ? 'bg-red-600/15' : 'bg-amber-500/10'
            }`}
          />
          <div
            className={`pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full blur-3xl ${
              isReserved ? 'bg-rose-950/20' : 'bg-[#6B1E29]/10'
            }`}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left Description & Medallion */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Spinning Seal - Crystal Ball Emoji */}
              <button
                type="button"
                onClick={handleForkClick}
                aria-label="수정구 돌리기"
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group ${
                  isReserved
                    ? 'border-red-700 bg-[#290F13] text-red-400 hover:border-red-500'
                    : 'border-[#C5A059] bg-[#F4EDE2] text-[#6B1E29]'
                }`}
              >
                <span
                  className="text-3xl select-none inline-block transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ transform: `rotate(${forkRotate}deg)` }}
                >
                  🔮
                </span>
              </button>

              <div>
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-[11px] font-semibold mb-2 ${
                    isReserved
                      ? 'border-red-800/60 bg-red-950/80 text-red-300'
                      : 'border-amber-800/30 bg-amber-50 text-amber-900'
                  }`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>
                    {isReserved
                      ? 'L’ENVERS DU DÉCOR • 살롱 밑낯 생존 계시'
                      : 'LA ROUE DE LA FORTUNE • 오늘의 살롱 운세'}
                  </span>
                </div>
                <h3
                  className={`font-cinzel text-2xl font-bold tracking-wider ${
                    isReserved ? 'text-red-100' : 'text-[#1F1916]'
                  }`}
                >
                  {isReserved
                    ? '살롱 밑낯 • 암시장 경매 & 생존 계시 룰렛'
                    : '지상 80층 살롱 운세 룰렛'}
                </h3>
                <p
                  className={`mt-1.5 font-serif-kr text-xs sm:text-sm max-w-xl leading-relaxed ${
                    isReserved ? 'text-[#D1BCB8]' : 'text-[#665749]'
                  }`}
                >
                  {isReserved
                    ? '지상 80층 펜트하우스의 잔혹한 실체가 룰렛 위에 펼쳐집니다. 실시간 생체 당도 예측치와 당신을 노리는 포식자 파벌의 은밀한 밑낯을 중복 없이 확인하고 살아남으세요.'
                    : '오늘 당신의 미식과 하루는 어디로 향할까요? 황금빛 룰렛을 돌려 셰프의 조언과 행운의 디저트, 종합 일상 운세를 중복 없이 확인해보세요.'}
                </p>
                <div
                  className={`mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] ${
                    isReserved ? 'text-red-300/80' : 'text-[#7A695B]'
                  }`}
                >
                  {isReserved ? (
                    <>
                      <span className="flex items-center gap-1 text-red-400">
                        <Droplet className="h-3 w-3" />
                        <span>생체 당도 (BRIX) 측정</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-rose-300">
                        <Skull className="h-3 w-3" />
                        <span>포식 파벌 경보</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-300">
                        <ShieldAlert className="h-3 w-3" />
                        <span>생존 지침 & 절대 금기</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-amber-600" />
                        <span>중복 없는 24개 운세 풀</span>
                      </span>
                      <span>•</span>
                      <span>행운의 디저트 & 컬러</span>
                      <span>•</span>
                      <span>셰프의 다이닝 조언</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Action Trigger */}
            <div className="shrink-0 flex flex-col items-center">
              <button
                type="button"
                onClick={onOpenRoulette}
                className={`group flex items-center gap-2.5 rounded-full border px-7 py-3.5 font-cinzel text-xs sm:text-sm font-bold tracking-wider text-white shadow-xl transition-all cursor-pointer ${
                  isReserved
                    ? 'border-red-700 bg-[#7A1010] hover:bg-[#961414] hover:shadow-[0_0_20px_rgba(239,68,68,0.35)] active:scale-95'
                    : 'border-[#6B1E29] bg-[#6B1E29] hover:bg-[#852634] hover:shadow-[0_0_20px_rgba(197,160,89,0.35)] active:scale-95'
                }`}
              >
                <RotateCw className="h-4 w-4 text-amber-300 group-hover:rotate-180 transition-transform duration-500" />
                <span>
                  {isReserved
                    ? '살롱 밑낯 계시 룰렛 돌리기'
                    : '오늘의 운세 룰렛 돌리기'}
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <span
                className={`text-[10px] font-serif-kr mt-2 ${
                  isReserved ? 'text-red-400/70' : 'text-[#8C7A68]'
                }`}
              >
                클릭 시 룰렛 추첨 창이 열립니다
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
