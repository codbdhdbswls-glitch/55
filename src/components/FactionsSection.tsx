import React, { useState } from 'react';
import { FACTIONS } from '../data/salonData';
import { Faction } from '../types';
import { Quote, AlertTriangle, BookmarkCheck, HeartHandshake, EyeOff } from 'lucide-react';

interface FactionsSectionProps {
  isReserved?: boolean;
}

const FACTION_MEMBERS: Record<string, string[]> = {
  preservation: ['카미시로 무이', '세베린 모르', '아즈라엘 린'],
  stimulation: ['벨투아', '엔드노트', '요미츠쿠라 텐', '요미츠쿠라 유이'],
  predation: ['리', '마다라', '오르티체', '에르뷔스'],
  curator: ['이도', '오도', '홍시'],
};

// Team designated colors per user specification:
// A: 백색 (White), B: 보라색 (Purple), C: 붉은색 (Red), D: 남색 (Navy)
const TEAM_CONFIGS: Record<
  string,
  {
    teamKey: string;
    colorLabel: string;
    dotColor: string;
    light: {
      card: string;
      symbol: string;
      teamBadge: string;
      memberBadge: string;
      bottomBar: string;
    };
    dark: {
      card: string;
      symbol: string;
      teamBadge: string;
      memberBadge: string;
      bottomBar: string;
    };
  }
> = {
  preservation: {
    teamKey: 'A',
    colorLabel: '백색',
    dotColor: '#FFFFFF',
    light: {
      card: 'border-neutral-400 bg-white shadow-xl ring-2 ring-neutral-300 -translate-y-1',
      symbol: 'border-neutral-400 bg-white text-neutral-900 font-bold',
      teamBadge: 'border-neutral-400 bg-neutral-900 text-white shadow-xs font-bold',
      memberBadge: 'border-neutral-300 bg-neutral-100 text-neutral-900 font-medium',
      bottomBar: 'bg-neutral-800 shadow-[0_0_8px_rgba(0,0,0,0.15)]',
    },
    dark: {
      card: 'border-white bg-[#1A1A1E] shadow-[0_0_24px_rgba(255,255,255,0.35)] ring-2 ring-white/80 -translate-y-1',
      symbol: 'border-white bg-white text-neutral-950 font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.5)]',
      teamBadge: 'border-white bg-white text-neutral-950 font-extrabold shadow-[0_0_12px_rgba(255,255,255,0.7)]',
      memberBadge: 'border-white/80 bg-white text-neutral-950 font-bold shadow-xs',
      bottomBar: 'bg-white shadow-[0_0_12px_#ffffff]',
    },
  },
  stimulation: {
    teamKey: 'B',
    colorLabel: '보라색',
    dotColor: '#A855F7',
    light: {
      card: 'border-purple-600 bg-[#FAF5FF] shadow-xl ring-2 ring-purple-400/50 -translate-y-1',
      symbol: 'border-purple-300 bg-purple-100 text-purple-900 font-bold',
      teamBadge: 'border-purple-700 bg-purple-600 text-white shadow-xs font-bold',
      memberBadge: 'border-purple-700 bg-purple-700 text-white font-medium shadow-xs',
      bottomBar: 'bg-purple-600 shadow-[0_0_8px_rgba(147,51,234,0.4)]',
    },
    dark: {
      card: 'border-purple-500 bg-[#1D102A] shadow-[0_0_24px_rgba(168,85,247,0.4)] ring-2 ring-purple-500/70 -translate-y-1',
      symbol: 'border-purple-400 bg-purple-950 text-purple-200 font-bold',
      teamBadge: 'border-purple-300 bg-purple-600 text-white font-extrabold shadow-[0_0_12px_rgba(168,85,247,0.7)]',
      memberBadge: 'border-purple-400/80 bg-purple-900/95 text-purple-100 font-bold shadow-xs',
      bottomBar: 'bg-purple-500 shadow-[0_0_12px_#a855f7]',
    },
  },
  predation: {
    teamKey: 'C',
    colorLabel: '붉은색',
    dotColor: '#EF4444',
    light: {
      card: 'border-red-600 bg-[#FFF5F5] shadow-xl ring-2 ring-red-400/50 -translate-y-1',
      symbol: 'border-red-300 bg-red-100 text-red-900 font-bold',
      teamBadge: 'border-red-700 bg-red-600 text-white shadow-xs font-bold',
      memberBadge: 'border-red-700 bg-red-700 text-white font-medium shadow-xs',
      bottomBar: 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]',
    },
    dark: {
      card: 'border-red-500 bg-[#250E12] shadow-[0_0_24px_rgba(239,68,68,0.4)] ring-2 ring-red-500/70 -translate-y-1',
      symbol: 'border-red-400 bg-red-950 text-red-200 font-bold',
      teamBadge: 'border-red-300 bg-red-600 text-white font-extrabold shadow-[0_0_12px_rgba(239,68,68,0.7)]',
      memberBadge: 'border-red-400/80 bg-red-900/95 text-red-100 font-bold shadow-xs',
      bottomBar: 'bg-red-500 shadow-[0_0_12px_#ef4444]',
    },
  },
  curator: {
    teamKey: 'D',
    colorLabel: '남색',
    dotColor: '#3B82F6',
    light: {
      card: 'border-[#1E295B] bg-[#F0F4FF] shadow-xl ring-2 ring-[#1E295B]/40 -translate-y-1',
      symbol: 'border-blue-300 bg-blue-100 text-[#1E295B] font-bold',
      teamBadge: 'border-[#151D42] bg-[#1E295B] text-white shadow-xs font-bold',
      memberBadge: 'border-[#151D42] bg-[#1E295B] text-white font-medium shadow-xs',
      bottomBar: 'bg-[#1E295B] shadow-[0_0_8px_rgba(30,41,91,0.4)]',
    },
    dark: {
      card: 'border-blue-500 bg-[#0B1528] shadow-[0_0_24px_rgba(59,130,246,0.4)] ring-2 ring-blue-500/70 -translate-y-1',
      symbol: 'border-blue-400 bg-[#101C3B] text-blue-200 font-bold',
      teamBadge: 'border-blue-300 bg-[#1D4ED8] text-white font-extrabold shadow-[0_0_12px_rgba(59,130,246,0.7)]',
      memberBadge: 'border-blue-400/80 bg-[#162758] text-blue-100 font-bold shadow-xs',
      bottomBar: 'bg-blue-500 shadow-[0_0_12px_#3b82f6]',
    },
  },
};

export const FactionsSection: React.FC<FactionsSectionProps> = ({ isReserved = false }) => {
  const [selectedFaction, setSelectedFaction] = useState<Faction>(FACTIONS[0]);

  return (
    <section
      id="factions"
      className={`py-20 sm:py-28 border-b transition-colors duration-700 ${
        isReserved
          ? 'border-[#2D2622] bg-[#12100F] text-[#E0D8D0]'
          : 'border-[#E8E0D5] bg-[#F7F4EE] text-[#2C2724]'
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
            Chapitre II : Les Quatre Factions Gourmandes
          </span>
          <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wider sm:text-4xl">
            미식가 파벌 안내
          </h2>
          <p
            className={`mt-3 font-serif-kr text-sm sm:text-base ${
              isReserved ? 'text-[#9E9083]' : 'text-[#5C5349]'
            }`}
          >
            당신이라는 단 하나의 메인 피스를 두고 서로 다른 욕망과 패들을 던지는 4대 미식 진영.
          </p>
          <div
            className={`mx-auto mt-4 h-[1px] w-20 ${
              isReserved ? 'bg-amber-600/40' : 'bg-[#D9CDBC]'
            }`}
          />
        </div>

        {/* Faction Cards Selector Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTIONS.map((faction) => {
            const isSelected = selectedFaction.id === faction.id;
            const config = TEAM_CONFIGS[faction.id] || TEAM_CONFIGS.preservation;
            const activeTheme = isReserved ? config.dark : config.light;

            return (
              <button
                key={faction.id}
                onClick={() => setSelectedFaction(faction)}
                className={`relative rounded-xl border p-5 text-left transition-all focus:outline-none cursor-pointer ${
                  isSelected
                    ? activeTheme.card
                    : isReserved
                    ? 'border-[#2D2622] bg-[#171413] hover:border-[#423730] hover:bg-[#1D1917]'
                    : 'border-[#E2D6C6] bg-[#FCFAF7] hover:border-[#B5A593] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-cinzel text-lg font-bold tracking-widest px-2.5 py-0.5 rounded-md border transition-all ${
                      isSelected
                        ? activeTheme.symbol
                        : isReserved
                        ? 'border-[#3A302A] bg-[#221B17] text-[#C4B6A7]'
                        : 'border-[#CDBEAF]/50 bg-[#F2EAE0] text-[#5C4A3A]'
                    }`}
                  >
                    {faction.symbol}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wider font-cinzel transition-all ${
                        isSelected
                          ? activeTheme.teamBadge
                          : isReserved
                          ? 'bg-[#221B17] text-[#9E9083] border border-[#3D332D]'
                          : faction.badgeColor
                      }`}
                    >
                      TEAM {config.teamKey}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-serif-kr text-base font-bold">
                  {faction.name}
                </h3>
                <p className="font-garamond text-xs italic opacity-70">
                  {faction.subName}
                </p>

                {/* Team Members List (Prominent display of affiliated people without dialogue) */}
                <div className="mt-3.5 pt-3 border-t border-current/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-cinzel font-bold tracking-wider opacity-70">
                      소속 인원
                    </span>
                    <span className="text-[10px] font-semibold opacity-60">
                      {FACTION_MEMBERS[faction.id]?.length}명
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(FACTION_MEMBERS[faction.id] || []).map((memberName) => (
                      <span
                        key={memberName}
                        className={`rounded-md px-2 py-1 text-xs font-semibold border transition-all ${
                          isSelected
                            ? activeTheme.memberBadge
                            : isReserved
                            ? 'bg-[#221D1A] border-[#382F2A] text-[#C4B6A7] hover:border-amber-800/60'
                            : 'bg-[#F2ECE2] border-[#D9CDBC] text-[#524436] hover:border-[#6B1E29]/40'
                        }`}
                      >
                        {memberName}
                      </span>
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <div
                    className={`absolute -bottom-[1px] left-1/2 h-[3px] w-14 -translate-x-1/2 rounded-full transition-all ${activeTheme.bottomBar}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Faction Detail Showcase Box */}
        <div
          className={`mt-8 overflow-hidden rounded-2xl border p-6 sm:p-8 shadow-xs ${
            isReserved ? 'border-[#332A24] bg-[#1A1614]' : 'border-[#D9CDBE] bg-[#FCFAF7]'
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E8DFCFA]/60 pb-4">
            <div>
              <span
                className={`font-cinzel text-xs font-semibold tracking-widest uppercase ${
                  isReserved ? 'text-amber-500' : 'text-[#8A7A6B]'
                }`}
              >
                TEAM {selectedFaction.id === 'preservation' ? 'A' : selectedFaction.id === 'stimulation' ? 'B' : selectedFaction.id === 'predation' ? 'C' : 'D'} DOSSIER
              </span>
              <h3 className="font-serif-kr text-2xl font-bold">
                {selectedFaction.name} — {selectedFaction.subName}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-75 font-serif-kr">선호 상태:</span>
              <span
                className={`rounded-md px-3 py-1 font-cinzel text-xs font-bold ${
                  isReserved
                    ? 'border border-amber-800/60 bg-amber-950/80 text-amber-300'
                    : 'border border-[#DECDBB] bg-[#F7F2EA] text-[#694A35]'
                }`}
              >
                {selectedFaction.preferredState}
              </span>
            </div>
          </div>

          {/* Quote */}
          <div
            className={`my-6 rounded-xl border-l-4 p-4 italic ${
              isReserved
                ? 'border-amber-600 bg-[#221B17] text-[#D8CEBE]'
                : 'border-[#6B1E29] bg-[#FAF5F2] text-[#55463D]'
            }`}
          >
            <Quote className="inline h-4 w-4 mr-2 opacity-50" />
            <span className="font-serif-kr text-sm sm:text-base font-medium">
              {selectedFaction.quote}
            </span>
          </div>

          {/* 3 Pillars Breakdown */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Core Philosophy */}
            <div
              className={`rounded-xl border p-5 ${
                isReserved ? 'border-[#2D2622] bg-[#161210]' : 'border-[#EAE1D3] bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-cinzel text-amber-500 mb-2">
                <BookmarkCheck className="h-4 w-4" />
                <span>핵심 이념 (Idéologie)</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                {selectedFaction.philosophy}
              </p>
            </div>

            {/* Target Bidding Preference */}
            <div
              className={`rounded-xl border p-5 ${
                isReserved ? 'border-[#2D2622] bg-[#161210]' : 'border-[#EAE1D3] bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-cinzel text-amber-500 mb-2">
                <HeartHandshake className="h-4 w-4" />
                <span>선호 입찰 대상</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                {selectedFaction.targetBiddingPreference}
              </p>
            </div>

            {/* Detailed Behavior */}
            <div
              className={`rounded-xl border p-5 ${
                isReserved ? 'border-[#3D2520] bg-[#1F1412]' : 'border-[#E8D4C8] bg-[#FAF3F0]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold font-cinzel text-rose-500 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>상세 행동 양식</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                {selectedFaction.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
