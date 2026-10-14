import React, { useState, useRef } from 'react';
import { WORLDVIEW_DATA } from '../data/salonData';
import { Sparkles, Eye, ShieldCheck, Scale, ScrollText, Compass, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface WorldviewSectionProps {
  isReserved?: boolean;
}

export const WorldviewSection: React.FC<WorldviewSectionProps> = ({ isReserved = false }) => {
  const [activeTab, setActiveTab] = useState<'divine' | 'hypocrisy_treaty' | 'etymology'>('divine');
  const [tab2Slide, setTab2Slide] = useState(0);
  const [tab3Slide, setTab3Slide] = useState(0);
  const tab2Ref = useRef<HTMLDivElement>(null);
  const tab3Ref = useRef<HTMLDivElement>(null);

  const scrollToTab2Slide = (index: number) => {
    setTab2Slide(index);
    if (tab2Ref.current) {
      const children = tab2Ref.current.children;
      if (children[index]) {
        (children[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    }
  };

  const scrollToTab3Slide = (index: number) => {
    setTab3Slide(index);
    if (tab3Ref.current) {
      const children = tab3Ref.current.children;
      if (children[index]) {
        (children[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    }
  };

  return (
    <section
      id="worldview"
      className={`py-20 sm:py-28 border-b transition-colors duration-700 ${
        isReserved
          ? 'border-[#2D2622] bg-[#141110] text-[#E0D8D0]'
          : 'border-[#E8E0D5] bg-[#FAF8F5] text-[#2C2724]'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span
            className={`font-cinzel text-xs font-semibold tracking-[0.25em] uppercase ${
              isReserved ? 'text-amber-500/80' : 'text-[#8C7D6E]'
            }`}
          >
            Chapitre I : L'Origine et Le Traité
          </span>
          <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wider sm:text-4xl">
            살롱의 기원과 세계관
          </h2>
          <p
            className={`mt-3 font-serif-kr text-sm sm:text-base ${
              isReserved ? 'text-[#9E9083]' : 'text-[#5C5349]'
            }`}
          >
            순결의 질식에 빠진 천사들과 권태에 마비된 악마들이 지상 80층 온실에 세운 위선의 성채.
          </p>
          <div
            className={`mx-auto mt-4 h-[1px] w-20 ${
              isReserved ? 'bg-amber-600/40' : 'bg-[#D9CDBC]'
            }`}
          />
        </div>

        {/* Tab Controls (01. 래빗의 정체: 신의 살점 > 02. 위선의 장막과 비무장 중립 대협약 (DMZ) > 03. 살롱명 GLACÉ의 이중성) */}
        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-2 border-b pb-4 ${
            isReserved ? 'border-[#2D2622]' : 'border-[#E5DCD1]'
          }`}
        >
          <button
            onClick={() => setActiveTab('divine')}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all sm:text-sm cursor-pointer ${
              activeTab === 'divine'
                ? isReserved
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-xs'
                  : 'bg-[#2B2420] text-[#FAF8F5] shadow-xs'
                : isReserved
                ? 'text-[#A09386] hover:bg-[#201B18]'
                : 'text-[#695F54] hover:bg-[#F2EAE0]'
            }`}
          >
            01. 래빗의 정체: 신의 살점
          </button>
          <button
            onClick={() => setActiveTab('hypocrisy_treaty')}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all sm:text-sm cursor-pointer ${
              activeTab === 'hypocrisy_treaty'
                ? isReserved
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-xs'
                  : 'bg-[#2B2420] text-[#FAF8F5] shadow-xs'
                : isReserved
                ? 'text-[#A09386] hover:bg-[#201B18]'
                : 'text-[#695F54] hover:bg-[#F2EAE0]'
            }`}
          >
            02. 위선의 장막과 비무장 중립 대협약 (DMZ)
          </button>
          <button
            onClick={() => setActiveTab('etymology')}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all sm:text-sm cursor-pointer ${
              activeTab === 'etymology'
                ? isReserved
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-xs'
                  : 'bg-[#2B2420] text-[#FAF8F5] shadow-xs'
                : isReserved
                ? 'text-[#A09386] hover:bg-[#201B18]'
                : 'text-[#695F54] hover:bg-[#F2EAE0]'
            }`}
          >
            03. 살롱명 GLACÉ의 이중성
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="mt-8">
          {/* TAB 1: Divine Shard (래빗의 정체: 신의 살점) */}
          {activeTab === 'divine' && (
            <div
              className={`rounded-2xl border p-4.5 sm:p-9 shadow-md ${
                isReserved ? 'border-[#3D3325] bg-[#1B1612]' : 'border-[#DECDBB] bg-[#FDF9F3]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFCFA]/60 pb-4 mb-5 sm:mb-6">
                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/60 shadow-xs mt-0.5 sm:mt-0">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-wider text-amber-500 uppercase">
                      Origine Divine • La Pièce Maîtresse
                    </span>
                    <h3 className="font-serif-kr text-base sm:text-2xl font-bold mt-1 sm:mt-0.5 leading-snug sm:leading-tight break-keep">
                      {WORLDVIEW_DATA.divineShard.title}
                    </h3>
                  </div>
                </div>
                <span className="self-start sm:self-center shrink-0 rounded-full border border-amber-700/60 bg-amber-950/80 px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-amber-300">
                  신의 살점 파편
                </span>
              </div>

              <div className="space-y-5 text-sm sm:text-base leading-relaxed font-serif-kr">
                {/* Mobile View: 5 distinct readable paragraphs requested by user */}
                <div className="block sm:hidden space-y-4 text-sm leading-relaxed opacity-95">
                  <p>
                    태초에 신이 우주를 창조할 때 자신의 몸을 찢어 질량을 만들었습니다.
                  </p>
                  <p>
                    그리고 창조가 끝난 뒤 미처 회수하지 못하고 지상에 흘린 파편을 품고 태어난 인간 ──
                  </p>
                  <p className="font-medium text-amber-400">
                    그것이 바로 당신 입니다.
                  </p>
                  <p>
                    당신의 육신은 평범한 고기가 아니라 『물리적 형태를 띤 신의 본체』이자 가장 순수한 신성 그 자체입니다. 당신이 공포와 수치심으로 패닉에 빠질 때 신의 살점 부스러기가 체내에서 가장 선명하게 공명하며 당도가 치솟습니다.
                  </p>
                  <p>
                    하늘에서는 현재 신이 깊은 동면에 든 사이, 천사들이 [섭리의 눈]을 띄워 신의 몸이 얼마나 복원되고 있는지 감시하고 있습니다.
                  </p>
                </div>

                {/* Desktop View */}
                <p className="hidden sm:block opacity-95 leading-loose">
                  {WORLDVIEW_DATA.divineShard.content}
                </p>

                <div
                  className={`mt-6 rounded-xl border p-5 text-xs sm:text-sm leading-relaxed ${
                    isReserved
                      ? 'border-[#4D3828] bg-[#221B16] text-[#E4C9B5]'
                      : 'border-[#EADBCF] bg-[#FAF3EC] text-[#5C4234]'
                  }`}
                >
                  <p className="font-semibold text-amber-500 mb-1 font-cinzel tracking-wider text-xs">
                    RÈGLE ABSOLUE • 공명과 당도의 인과관계
                  </p>
                  당신이 살롱의 차가운 80층 온실에서 공포와 수치심, 전율을 느낄 때마다 당신 안에 잠든 ‘신의 파편’이 진동하며 최고의 당도를 뿜어냅니다. 
                  천사들은 신을 복원한다는 거룩한 위선 아래, 악마들은 신을 씹어 삼키는 절대적 모독 아래 당신의 살점을 은제 나이프로 탐하고 있습니다.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Combined Hypocrisy & DMZ Treaty */}
          {activeTab === 'hypocrisy_treaty' && (
            <div className="space-y-4">
              {/* Mobile Carousel Controls & Step Navigation */}
              <div className="flex md:hidden items-center justify-between gap-1.5 px-1 py-1">
                <button
                  type="button"
                  onClick={() => scrollToTab2Slide(Math.max(0, tab2Slide - 1))}
                  disabled={tab2Slide === 0}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all cursor-pointer ${
                    tab2Slide === 0
                      ? 'border-[#332A24] text-[#63574D] opacity-40 cursor-not-allowed'
                      : isReserved
                      ? 'border-amber-700/60 bg-amber-950/80 text-amber-300 hover:bg-amber-900 active:scale-95'
                      : 'border-[#DECDBB] bg-[#F2EAE0] text-[#4A423A] active:scale-95'
                  }`}
                  aria-label="이전 카드 보기"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {[
                    { id: 0, label: '1. 천사계' },
                    { id: 1, label: '2. 악마계' },
                    { id: 2, label: '3. DMZ 협약' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToTab2Slide(item.id)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        tab2Slide === item.id
                          ? isReserved
                            ? 'bg-amber-950 text-amber-300 border border-amber-600/80 shadow-xs'
                            : 'bg-[#2B2420] text-white shadow-xs'
                          : isReserved
                          ? 'border border-[#332A24] bg-[#1A1614] text-[#8C7E72]'
                          : 'border border-[#E5DCD1] bg-white text-[#786E63]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToTab2Slide(Math.min(2, tab2Slide + 1))}
                  disabled={tab2Slide === 2}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all cursor-pointer ${
                    tab2Slide === 2
                      ? 'border-[#332A24] text-[#63574D] opacity-40 cursor-not-allowed'
                      : isReserved
                      ? 'border-amber-700/60 bg-amber-950/80 text-amber-300 hover:bg-amber-900 active:scale-95'
                      : 'border-[#DECDBB] bg-[#F2EAE0] text-[#4A423A] active:scale-95'
                  }`}
                  aria-label="다음 카드 보기"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Horizontal Scroll Track on Mobile (no scrollbar underbar) / Stacked on Desktop */}
              <div
                ref={tab2Ref}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const itemWidth = el.clientWidth * 0.8;
                  if (itemWidth > 0) {
                    const idx = Math.round(el.scrollLeft / itemWidth);
                    setTab2Slide(Math.max(0, Math.min(2, idx)));
                  }
                }}
                className="flex md:flex-col flex-nowrap overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-8 pb-3 md:pb-0 no-scrollbar"
              >
                {/* 1. Angels Card */}
                <div
                  className={`w-[88vw] sm:w-[75vw] md:w-full min-w-[88vw] sm:min-w-[75vw] md:min-w-0 snap-center shrink-0 md:shrink rounded-2xl border p-5 sm:p-7 shadow-xs ${
                    isReserved ? 'border-[#3D3325] bg-[#1C1814]' : 'border-[#E5DECC] bg-gradient-to-br from-[#FCFBF8] to-[#F7F3E9]'
                  }`}
                >
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                      isReserved ? 'border-[#2E261D]' : 'border-[#E8E1CE]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-amber-950/80 text-amber-400 border border-amber-800/60 text-xs font-bold font-cinzel">
                        I
                      </span>
                      <div>
                        <h3 className="font-serif-kr text-base sm:text-lg font-bold">
                          천사계의 도덕적 불감증 : 절대적 순결의 질식
                        </h3>
                        <p className="font-garamond text-xs italic opacity-70">
                          L’Asphyxie de la Pureté Absolue
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-amber-700/60 bg-amber-950/80 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-amber-300">
                      성찬식 합리화
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3 text-sm">
                    <div
                      className={`rounded-xl border p-3.5 sm:p-4 ${
                        isReserved ? 'border-[#2E261E] bg-[#161210]' : 'border-[#EDE5D3] bg-[#FAF7F0]'
                      }`}
                    >
                      <span className="font-semibold text-amber-500 block mb-1 text-xs uppercase font-cinzel">Cause (원인)</span>
                      <p className="text-xs leading-relaxed opacity-85">
                        수천 년간 지상의 끔찍한 비극을 기계처럼 구원하고 축복했으나 인간은 끝없이 죄를 반복했습니다. 결국 천사들에게 구원은 숭고한 사명이 아니라 지루한 관료주의적 잔무로 전락했습니다.
                      </p>
                    </div>
                    <div
                      className={`rounded-xl border p-3.5 sm:p-4 ${
                        isReserved ? 'border-[#2E261E] bg-[#161210]' : 'border-[#EDE5D3] bg-[#FAF7F0]'
                      }`}
                    >
                      <span className="font-semibold text-amber-500 block mb-1 text-xs uppercase font-cinzel">Symptom (증상)</span>
                      <p className="text-xs leading-relaxed opacity-85">
                        완벽하게 깨끗한 무균실에 갇혀 티끌 하나 없는 순백의 율법 속에서 자아가 창백하게 말라비틀어졌습니다. 그 어떤 자극도 더 이상 신경을 울리지 못합니다.
                      </p>
                    </div>
                    <div
                      className={`rounded-xl border p-3.5 sm:p-4 ${
                        isReserved ? 'border-[#2E261E] bg-[#161210]' : 'border-[#EDE5D3] bg-[#FAF7F0]'
                      }`}
                    >
                      <span className="font-semibold text-amber-500 block mb-1 text-xs uppercase font-cinzel">Culmination (도착점)</span>
                      <p className="text-xs leading-relaxed opacity-85">
                        신의 피조물을 찢어 삼키는 극단적인 죄악(식인)을 저지르며, "불쌍한 양을 성스러운 우리 안으로 거두어 하나가 되는 구원이다"라며 성찬식으로 기만할 때 생기는 모순의 쾌감에 중독되었습니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Demons Card */}
                <div
                  className={`w-[88vw] sm:w-[75vw] md:w-full min-w-[88vw] sm:min-w-[75vw] md:min-w-0 snap-center shrink-0 md:shrink rounded-2xl border p-5 sm:p-7 shadow-xs ${
                    isReserved ? 'border-[#3D2525] bg-[#1B1414]' : 'border-[#E5D0CD] bg-gradient-to-br from-[#FCF8F8] to-[#F9EFEF]'
                  }`}
                >
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                      isReserved ? 'border-[#2E1D1D]' : 'border-[#ECCFCB]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-rose-950/80 text-rose-400 border border-rose-800/60 text-xs font-bold font-cinzel">
                        II
                      </span>
                      <div>
                        <h3 className="font-serif-kr text-base sm:text-lg font-bold">
                          악마계의 도덕적 불감증 : 포식자의 권태
                        </h3>
                        <p className="font-garamond text-xs italic opacity-70">
                          L’Ennui du Prédateur Suprême
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-rose-700/60 bg-rose-950/80 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-rose-300">
                      순결의 붕괴 & 신의 모독
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3 text-sm">
                    <div
                      className={`rounded-xl border p-3.5 sm:p-4 ${
                        isReserved ? 'border-[#2E1B1B] bg-[#151010]' : 'border-[#EEDCDA] bg-[#FAF3F3]'
                      }`}
                    >
                      <span className="font-semibold text-rose-500 block mb-1 text-xs uppercase font-cinzel">Cause (원인)</span>
                      <p className="text-xs leading-relaxed opacity-85">
                        살인, 약탈, 고문, 파괴 등 인간 세상의 모든 타락과 쾌락을 바닥까지 긁어모아 소비했기에, 더 이상 지상의 그 어떤 범죄나 자극으로도 신경이 꿈쩍도 하지 않습니다.
                      </p>
                    </div>
                    <div
                      className={`rounded-xl border p-3.5 sm:p-4 ${
                        isReserved ? 'border-[#2E1B1B] bg-[#151010]' : 'border-[#EEDCDA] bg-[#FAF3F3]'
                      }`}
                    >
                      <span className="font-semibold text-rose-500 block mb-1 text-xs uppercase font-cinzel">Symptom (증상)</span>
                      <p className="text-xs leading-relaxed opacity-85">
                        끝없는 권태와 식욕 감퇴. 더 이상 평범한 피와 살점으로는 뇌의 보상 회로가 작동하지 않는 지옥귀족들의 만성적 미각 마비 상태입니다.
                      </p>
                    </div>
                    <div
                      className={`rounded-xl border p-3.5 sm:p-4 ${
                        isReserved ? 'border-[#2E1B1B] bg-[#151010]' : 'border-[#EEDCDA] bg-[#FAF3F3]'
                      }`}
                    >
                      <span className="font-semibold text-rose-500 block mb-1 text-xs uppercase font-cinzel">Culmination (도착점)</span>
                      <p className="text-xs leading-relaxed opacity-85">
                        가장 순결하고 신성한 존재가 공포와 수치심에 질려 울부짖는 순간, 그 영혼이 무너져 내리는 찰나의 '단맛'만이 그들의 굳어버린 혓바닥을 깨우는 유일한 미약이 되었습니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. DMZ Treaty Card */}
                <div
                  className={`w-[88vw] sm:w-[75vw] md:w-full min-w-[88vw] sm:min-w-[75vw] md:min-w-0 snap-center shrink-0 md:shrink rounded-2xl border p-5 sm:p-7 shadow-xs ${
                    isReserved ? 'border-[#332A24] bg-[#1A1614]' : 'border-[#DDD4C7] bg-[#FCFAF7]'
                  }`}
                >
                  <div className="flex items-center gap-3 border-b border-[#E8DFCFA]/60 pb-3 mb-4">
                    <Scale className="h-5 w-5 text-amber-500" />
                    <div>
                      <span className="font-cinzel text-[10px] tracking-wider text-amber-500 uppercase block">
                        Partie B • The DMZ Treaty
                      </span>
                      <h3 className="font-serif-kr text-base sm:text-xl font-bold">
                        {WORLDVIEW_DATA.dmzTreaty.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90 whitespace-pre-line font-serif-kr">
                    {WORLDVIEW_DATA.dmzTreaty.clause}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Etymology of GLACÉ */}
          {activeTab === 'etymology' && (
            <div className="space-y-4">
              {/* Mobile Carousel Controls & Step Navigation */}
              <div className="flex md:hidden items-center justify-between gap-1.5 px-1 py-1">
                <button
                  type="button"
                  onClick={() => scrollToTab3Slide(Math.max(0, tab3Slide - 1))}
                  disabled={tab3Slide === 0}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all cursor-pointer ${
                    tab3Slide === 0
                      ? 'border-[#332A24] text-[#63574D] opacity-40 cursor-not-allowed'
                      : isReserved
                      ? 'border-amber-700/60 bg-amber-950/80 text-amber-300 hover:bg-amber-900 active:scale-95'
                      : 'border-[#DECDBB] bg-[#F2EAE0] text-[#4A423A] active:scale-95'
                  }`}
                  aria-label="이전 카드 보기"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {[
                    { id: 0, label: '1. 설탕 시럽 코팅' },
                    { id: 1, label: '2. 18°C 동결 보존' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToTab3Slide(item.id)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        tab3Slide === item.id
                          ? isReserved
                            ? 'bg-amber-950 text-amber-300 border border-amber-600/80 shadow-xs'
                            : 'bg-[#2B2420] text-white shadow-xs'
                          : isReserved
                          ? 'border border-[#332A24] bg-[#1A1614] text-[#8C7E72]'
                          : 'border border-[#E5DCD1] bg-white text-[#786E63]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToTab3Slide(Math.min(1, tab3Slide + 1))}
                  disabled={tab3Slide === 1}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all cursor-pointer ${
                    tab3Slide === 1
                      ? 'border-[#332A24] text-[#63574D] opacity-40 cursor-not-allowed'
                      : isReserved
                      ? 'border-amber-700/60 bg-amber-950/80 text-amber-300 hover:bg-amber-900 active:scale-95'
                      : 'border-[#DECDBB] bg-[#F2EAE0] text-[#4A423A] active:scale-95'
                  }`}
                  aria-label="다음 카드 보기"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={tab3Ref}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const itemWidth = el.clientWidth * 0.8;
                  if (itemWidth > 0) {
                    const idx = Math.round(el.scrollLeft / itemWidth);
                    setTab3Slide(Math.max(0, Math.min(1, idx)));
                  }
                }}
                className="flex md:grid flex-nowrap md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-6 pb-3 md:pb-0 no-scrollbar"
              >
                <div
                  className={`w-[88vw] sm:w-[75vw] md:w-auto min-w-[88vw] sm:min-w-[75vw] md:min-w-0 snap-center shrink-0 md:shrink rounded-2xl border p-5 sm:p-7 shadow-xs ${
                    isReserved ? 'border-[#332A24] bg-[#1B1715]' : 'border-[#E4D9CC] bg-[#FDFBF7]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A85A32] font-cinzel">
                    <span>Signification I</span>
                    <span className="h-[1px] w-6 bg-[#A85A32]/40" />
                  </div>
                  <h3 className="mt-3 font-serif-kr text-lg sm:text-xl font-bold">
                    설탕 시럽으로 표면을 매끄럽게 코팅하다
                  </h3>
                  <p
                    className={`mt-1 font-garamond text-xs sm:text-sm italic ${
                      isReserved ? 'text-[#9E8E80]' : 'text-[#8A7B6E]'
                    }`}
                  >
                    Le Glaçage Sucre & Endorphine (Glazed)
                  </p>
                  <p
                    className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                      isReserved ? 'text-[#C4B7AA]' : 'text-[#4A423A]'
                    }`}
                  >
                    인간을 도축하고 살점을 뜯어먹는 야만적인 식인 행위를, ‘엔도르핀(당도)’이라는 화려한 시럽으로 매끄럽게 포장했음을 뜻합니다.
                  </p>
                  <div
                    className={`mt-4 rounded-xl border p-3.5 sm:p-4 text-xs leading-relaxed ${
                      isReserved
                        ? 'border-[#4D3325] bg-[#221712] text-[#D89B77]'
                        : 'border-[#ECDCCF] bg-[#FAF3EC] text-[#6B4B38]'
                    }`}
                  >
                    당신이 겪는 수치심, 공포, 전율이 뿜어내는 호르몬 당도는, 천사와 악마 VVIP들이 자신들의 죄책감을 감쪽같이 지우기 위해 바르는 가장 달콤한 도덕적 코팅제입니다.
                  </div>
                </div>

                <div
                  className={`w-[88vw] sm:w-[75vw] md:w-auto min-w-[88vw] sm:min-w-[75vw] md:min-w-0 snap-center shrink-0 md:shrink rounded-2xl border p-5 sm:p-7 shadow-xs ${
                    isReserved ? 'border-[#2D3339] bg-[#161A1D]' : 'border-[#D5E1E8] bg-[#F8FAFB]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3882D6] font-cinzel">
                    <span>Signification II</span>
                    <span className="h-[1px] w-6 bg-[#2B6CB0]/40" />
                  </div>
                  <h3 className="mt-3 font-serif-kr text-lg sm:text-xl font-bold">
                    얼어붙다, 차갑게 식히다
                  </h3>
                  <p
                    className={`mt-1 font-garamond text-xs sm:text-sm italic ${
                      isReserved ? 'text-[#8AA3B5]' : 'text-[#6B8599]'
                    }`}
                  >
                    Le Refroidissement & Température 18°C (Iced)
                  </p>
                  <p
                    className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                      isReserved ? 'text-[#C4B7AA]' : 'text-[#4A423A]'
                    }`}
                  >
                    타인의 고통과 비명에 공감하는 능력이 영도 아래로 완벽하게 동결된 VVIP들의 차가운 심리를 뜻합니다.
                  </p>
                  <div
                    className={`mt-4 rounded-xl border p-3.5 sm:p-4 text-xs leading-relaxed ${
                      isReserved
                        ? 'border-[#233B4D] bg-[#12222E] text-[#86B4D6]'
                        : 'border-[#D2E4F0] bg-[#EEF5F9] text-[#285070]'
                    }`}
                  >
                    매물의 당도 분해와 변질을 막기 위해 살롱 내 모든 테이블, 은식기, 온실의 실내 온도는 정확히 <strong>18°C</strong>로 냉각 제어됩니다. 가장 뜨거운 피를 흘리는 인간을, 가장 차가운 방에 가두고 굳히는 공간입니다.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
