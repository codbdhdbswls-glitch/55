import React, { useState } from 'react';
import { INITIAL_CHARACTERS, CharacterProfile } from '../data/characterData';
import { CharacterProfileModal } from './CharacterProfileModal';
import { ReservationForm } from './ReservationForm';
import {
  Utensils,
  Calendar,
  CheckCircle2,
  ExternalLink,
  User,
  ArrowRight,
  RotateCcw,
  Layers,
} from 'lucide-react';

interface ReservationSectionProps {
  isReserved: boolean;
  reservationData: any | null;
  onOpenReservationModal: () => void;
  onCancelReservation: () => void;
  onCompleteReservation?: (data: any) => void;
  onTriggerHumanGlitch?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  isReserved,
  reservationData,
  onOpenReservationModal,
  onCancelReservation,
  onCompleteReservation,
  onTriggerHumanGlitch,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile | null>(null);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');
  const [forkSpin, setForkSpin] = useState(0);

  const handleForkSpin = () => {
    setForkSpin((prev) => prev + 720);
  };

  const teams: Array<{
    key: 'A' | 'B' | 'C' | 'D';
    title: string;
    sub: string;
    themeBorder: string;
    symbolClass: string;
    badgeClass: string;
    tabActiveClass: string;
    tabInactiveClass: string;
  }> = [
    {
      key: 'A',
      title: 'A팀: 프레셔스',
      sub: 'Préservation (보존파)',
      themeBorder: 'border-neutral-500/50 hover:border-white/80',
      symbolClass: 'bg-white text-neutral-950 border-white shadow-[0_0_15px_rgba(255,255,255,0.45)]',
      badgeClass: 'bg-white text-neutral-950 border-white font-bold shadow-[0_0_8px_rgba(255,255,255,0.35)]',
      tabActiveClass: 'bg-white text-neutral-950 border-white ring-2 ring-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]',
      tabInactiveClass: 'border-neutral-600 bg-[#1A1A1D] text-white hover:border-white hover:bg-neutral-900',
    },
    {
      key: 'B',
      title: 'B팀: 텐션',
      sub: 'Stimulation (자극파)',
      themeBorder: 'border-purple-800/60 hover:border-purple-500',
      symbolClass: 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]',
      badgeClass: 'bg-purple-950/90 text-purple-300 border-purple-600/80 font-bold shadow-[0_0_8px_rgba(168,85,247,0.35)]',
      tabActiveClass: 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.6)]',
      tabInactiveClass: 'border-purple-900/60 bg-[#1A1024] text-purple-300/80 hover:border-purple-500 hover:text-purple-200',
    },
    {
      key: 'C',
      title: 'C팀: 헌터',
      sub: 'Prédation (포식파)',
      themeBorder: 'border-red-800/60 hover:border-red-500',
      symbolClass: 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
      badgeClass: 'bg-red-950/90 text-red-300 border-red-600/80 font-bold shadow-[0_0_8px_rgba(239,68,68,0.35)]',
      tabActiveClass: 'bg-red-600 text-white border-red-400 ring-2 ring-red-400/80 shadow-[0_0_12px_rgba(239,68,68,0.6)]',
      tabInactiveClass: 'border-red-900/60 bg-[#200F12] text-red-300/80 hover:border-red-500 hover:text-red-200',
    },
    {
      key: 'D',
      title: 'D팀: 큐레이터',
      sub: 'Curateur (모조체)',
      themeBorder: 'border-blue-800/60 hover:border-blue-500',
      symbolClass: 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      badgeClass: 'bg-[#0B1528] text-blue-300 border-blue-600/80 font-bold shadow-[0_0_8px_rgba(59,130,246,0.35)]',
      tabActiveClass: 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-400/80 shadow-[0_0_12px_rgba(59,130,246,0.6)]',
      tabInactiveClass: 'border-blue-900/60 bg-[#0A1324] text-blue-300/80 hover:border-blue-500 hover:text-blue-200',
    },
  ];

  const displayedTeams =
    selectedTeamFilter === 'ALL'
      ? teams
      : teams.filter((t) => t.key === selectedTeamFilter);

  return (
    <section
      id="reservation-and-profiles"
      className={`relative border-b py-20 transition-colors duration-700 ${
        isReserved
          ? 'bg-[#100D0C] border-[#2D2622] text-[#E0D8D0]'
          : 'bg-[#FAF8F5] border-[#E8E0D5] text-[#2C2724]'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <button
            type="button"
            onClick={!isReserved ? handleForkSpin : undefined}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.2em] shadow-2xs transition-all ${
              !isReserved ? 'cursor-pointer hover:border-[#6B1E29]' : ''
            } ${
              isReserved
                ? 'border-amber-900/50 bg-[#1E1917] text-amber-400'
                : 'border-[#D8CCBD] bg-[#F7F2EB] text-[#54483E]'
            }`}
          >
            <span
              className="inline-flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-[#8C6239] select-none"
              style={{ transform: !isReserved ? `rotate(${forkSpin}deg)` : undefined }}
            >
              <Utensils className="h-3.5 w-3.5 text-[#8C6239]" />
            </span>
            <span className="font-cinzel tracking-[0.2em]">
              {isReserved
                ? 'REGISTRE DES PERSONNAGES • VVIP DOSSIER'
                : 'LE SALON PRIVÉ DES ANGES ET DES DUCS'}
            </span>
            {!isReserved && (
              <span
                className="inline-flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-[#8C6239] select-none"
                style={{ transform: `rotate(${-forkSpin}deg)` }}
              >
                <Utensils className="h-3.5 w-3.5 text-[#8C6239]" />
              </span>
            )}
          </button>

          {isReserved ? (
            <h2 className="mt-4 font-cinzel text-3xl font-bold tracking-wider sm:text-4xl">
              살롱 참석자 명부
            </h2>
          ) : (
            <>
              <h1 className="mt-4 font-cinzel text-5xl font-extrabold tracking-[0.2em] sm:text-6xl md:text-7xl lg:text-8xl select-none text-[#2C2724]">
                GLACÉ
              </h1>
              <p className="mt-2 font-garamond text-xl italic tracking-widest sm:text-2xl text-[#6B1E29]">
                — Restaurant Gastronomique & Salon Privé —
              </p>
            </>
          )}

          {isReserved && (
            <p className="mt-2 font-serif-kr text-sm sm:text-base text-[#A09386]">
              예약이 확정되었습니다. 살롱에 참석한 4대 파벌 주요 인물들의 명부를 열람하십시오.
            </p>
          )}
          <div
            className={`mx-auto mt-4 h-[1px] w-20 ${
              isReserved ? 'bg-amber-600/40' : 'bg-[#D9CDBC]'
            }`}
          />
        </div>

        {/* ========================================================================= */}
        {/* STATE 1: BEFORE RESERVATION (Direct Inline VVIP Reservation Form)        */}
        {/* ========================================================================= */}
        {!isReserved ? (
          <div className="mt-8 mx-auto max-w-2xl animate-fade-in">
            <div className="overflow-hidden rounded-3xl border-2 border-[#D5C2AF] bg-[#FAF8F5] p-6 sm:p-10 shadow-2xl">
              {/* Seal Icon & Title */}
              <div className="text-center mb-8">
                <button
                  type="button"
                  onClick={handleForkSpin}
                  aria-label="포크와 나이프 회전"
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C9B6A3] bg-[#F2ECE1] shadow-md hover:border-[#6B1E29] hover:bg-[#EAE0D2] active:scale-90 transition-all cursor-pointer group"
                >
                  <span
                    className="inline-flex items-center justify-center text-[#8C6239] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
                    style={{ transform: `rotate(${forkSpin}deg)` }}
                  >
                    <Utensils className="h-7 w-7 text-[#8C6239]" />
                  </span>
                </button>
                <div className="mt-2 space-y-1.5">
                  <h3 className="font-cinzel text-3xl sm:text-4xl md:text-[2.5rem] font-bold tracking-wider text-[#1F1916]">
                    살롱 <span className="font-extrabold tracking-[0.12em]">GLACÉ</span>
                  </h3>
                  <p className="font-serif-kr text-base sm:text-lg font-medium tracking-wide text-[#665749]">
                    프라이빗 테이블 예약
                  </p>
                </div>
                <p className="mt-2.5 font-serif-kr text-xs sm:text-sm leading-relaxed text-[#594B3F]">
                  살롱의 문은 오직 당신만 열 수 있습니다.
                  <br />
                  특별함으로 즐거움과 황홀한 유희를 드리겠습니다.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#705E4F]">
                  <span className="rounded-full border border-[#D5C4B0] bg-[#FAF5EE] px-3 py-0.5 font-medium">
                    비밀 유지 서약 필수
                  </span>
                  <span className="rounded-full border border-[#D5C4B0] bg-[#FAF5EE] px-3 py-0.5 font-medium">
                    100% 프라이빗 사전 예약제
                  </span>
                </div>
              </div>

              {/* Inline Reservation Form */}
              <div className="border-t border-[#E8DFD3] pt-6">
                <ReservationForm
                  isInline={true}
                  onCompleteReservation={(data) => {
                    if (onCompleteReservation) {
                      onCompleteReservation(data);
                    }
                  }}
                  onTriggerHumanGlitch={() => {
                    if (onTriggerHumanGlitch) {
                      onTriggerHumanGlitch();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STATE 2: AFTER RESERVATION (Horizontal Team-by-Team Categorized Roster)    */
          /* ========================================================================= */
          <div className="mt-10 space-y-10 animate-fade-in">
            {/* Reservation Confirmed Status Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-amber-900/60 bg-[#1A1513] p-4 sm:p-5 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-700/60 bg-amber-950/60 text-amber-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-xs font-bold tracking-widest text-amber-400 uppercase">
                      VVIP 예약 확정 • 참관인 {reservationData?.guestName || '귀빈'}
                    </span>
                    <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800">
                      인증 완료
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A8988B] mt-0.5 font-serif-kr">
                    성별: {reservationData?.gender || '비공개'} • 인원: {reservationData?.partySize || '1인'} • {reservationData?.timeSlot}
                  </p>
                </div>
              </div>

              <button
                onClick={onCancelReservation}
                className="flex items-center gap-1.5 rounded-lg border border-[#3A3029] bg-[#221B18] px-3.5 py-1.5 text-xs text-[#B5A596] hover:bg-[#2C231F] hover:text-[#FAF8F5] transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>예약취소</span>
              </button>
            </div>

            {/* Horizontal Team Categorization Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#2D2622] pb-5">
              <button
                onClick={() => setSelectedTeamFilter('ALL')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold font-cinzel tracking-wider transition-all ${
                  selectedTeamFilter === 'ALL'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'border border-[#3D332D] bg-[#191514] text-[#B0A193] hover:border-amber-700/60 hover:text-amber-300'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>전체 파벌 명부 (ALL)</span>
              </button>

              {teams.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelectedTeamFilter(t.key)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold font-cinzel tracking-wider transition-all cursor-pointer border ${
                    selectedTeamFilter === t.key
                      ? t.tabActiveClass
                      : t.tabInactiveClass
                  }`}
                >
                  <span className="font-extrabold">{t.key}</span>
                  <span className="opacity-60">·</span>
                  <span>TEAM {t.key}</span>
                </button>
              ))}
            </div>

            {/* Instruction Callout */}
            <div className="rounded-xl border border-amber-900/50 bg-[#161312] p-3 text-center text-xs text-[#D5C7B8] shadow-sm">
              <span className="font-semibold text-amber-400 font-cinzel tracking-wider">
                VVVIP 입니다. 그들의 정보를 누설하지 않습니다. 누설한 경우 살롱 GLACÉ는 그 어떠한 책임도 지지 않습니다. 좋은 식사가 되시길 바랍니다.
              </span>
            </div>

            {/* Horizontal Categorized Team Sections (A, B, C, D in Sequence) */}
            <div className="space-y-12">
              {displayedTeams.map((team) => {
                const characters = INITIAL_CHARACTERS[team.key];

                return (
                  <div
                    key={team.key}
                    className={`rounded-2xl border ${team.themeBorder} bg-[#191514] p-6 sm:p-8 shadow-2xl transition-all duration-300`}
                  >
                    {/* Horizontal Team Header Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D2622] pb-5 mb-6">
                      <div className="flex items-center gap-3.5">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl font-cinzel text-xl font-extrabold shadow-md border ${team.symbolClass}`}>
                          {team.key}
                        </span>
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold font-cinzel tracking-wider border ${team.badgeClass}`}>
                              TEAM {team.key}
                            </span>
                            <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-[#F0EAE1]">
                              {team.title}
                            </h3>
                          </div>
                          <p className="text-xs font-serif-kr text-[#9E9083] mt-0.5">{team.sub}</p>
                        </div>
                      </div>
                    </div>

                    {/* Horizontal Characters Row (Unified Grid: 2 columns on mobile, 4 columns on desktop so all cards are identically sized) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                      {characters.map((char) => (
                        <div
                          key={char.id}
                          className="group relative flex flex-col justify-between rounded-xl border border-[#2D2622] bg-[#1F1A18] p-3 sm:p-4 transition-all hover:border-[#4D3F37] hover:bg-[#25201D] hover:shadow-xl"
                        >
                          <div className="flex flex-col flex-1">
                            {/* Portrait Image Placeholder Frame (Clickable for Modal) */}
                            <div
                              onClick={() => setSelectedCharacter(char)}
                              className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-[#3D332D] bg-[#120F0E] cursor-pointer flex flex-col items-center justify-center transition-transform group-hover:scale-[1.02] shadow-inner"
                            >
                              {char.portraitImageUrl || char.imageUrl ? (
                                <img
                                  src={char.portraitImageUrl || char.imageUrl}
                                  alt={char.name}
                                  loading="lazy"
                                  decoding="async"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    const src = target.src;
                                    if (src.includes('raw.githubusercontent.com') && !target.dataset.retried) {
                                      target.dataset.retried = 'true';
                                      target.src = src.replace('raw.githubusercontent.com', 'cdn.jsdelivr.net/gh').replace('/main/', '@main/');
                                    }
                                  }}
                                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex flex-col items-center p-2 sm:p-3 text-center">
                                  <User className="h-7 w-7 sm:h-10 sm:w-10 text-[#4D3E35] mb-1.5 sm:mb-2 group-hover:text-amber-500 transition-colors" />
                                  <span className="font-cinzel text-[10px] sm:text-xs font-semibold text-amber-500/80 leading-tight">
                                    {char.isAnimal ? '[세로형 동물]' : '[세로형 캐릭터]'}
                                  </span>
                                  <span className="text-[9px] sm:text-[10px] text-[#7A6B5F] mt-0.5 hidden xs:block">
                                    클릭하여 상세 프로필
                                  </span>
                                </div>
                              )}

                              {/* Corner Accents */}
                              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-amber-600/50" />
                              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-amber-600/50" />
                              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-amber-600/50" />
                              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-amber-600/50" />

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="rounded-full bg-amber-600/90 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-md flex items-center gap-1.5">
                                  <ExternalLink className="h-3 w-3" />
                                  <span>열기</span>
                                </span>
                              </div>
                            </div>

                            {/* Character Info */}
                            <div className="mt-3 flex flex-col flex-1 justify-between">
                              <div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-1.5">
                                  <h4 className="font-cinzel text-[13.5px] sm:text-sm font-bold text-[#EFE7DC] flex items-center gap-1 min-w-0">
                                    <span className="truncate">{char.name}</span>
                                    {char.isAnimal && (
                                      <span className="shrink-0 rounded px-1 py-0.2 bg-emerald-950/80 border border-emerald-700/60 text-[8px] sm:text-[9px] text-emerald-300 font-normal">
                                        동물 1
                                      </span>
                                    )}
                                  </h4>
                                  <span className="text-[8.5px] xs:text-[9px] sm:text-[10px] font-cinzel text-amber-500/80 tracking-tight sm:tracking-normal font-medium break-all sm:break-normal sm:shrink-0 leading-tight">
                                    {char.id}
                                  </span>
                                </div>
                                <p className="text-[10px] sm:text-[11px] text-[#A6978A] font-serif-kr mt-0.5 leading-snug break-keep min-h-[1.85rem] sm:min-h-[2rem] flex items-center">
                                  {char.title}
                                </p>
                              </div>

                              <div className="mt-2 min-h-[2.5rem] sm:min-h-[2.75rem] flex items-start">
                                <p className="text-[10px] sm:text-xs italic text-[#8A7A6D] font-serif-kr leading-relaxed break-keep">
                                  {char.quote}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Action Button to open Modal */}
                          <button
                            onClick={() => setSelectedCharacter(char)}
                            className="mt-3 sm:mt-4 w-full rounded-lg border border-[#3A302A] bg-[#161210] py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-medium text-[#C7B7A7] hover:border-amber-600/60 hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5 active:scale-98"
                          >
                            <span>상세 프로필 보기</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Character Profile Modal Popup */}
      <CharacterProfileModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        isDarkMode={isReserved}
      />
    </section>
  );
};
