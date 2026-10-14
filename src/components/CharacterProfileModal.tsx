import React from 'react';
import { CharacterProfile } from '../data/characterData';
import { X, Sparkles, User, Quote, Shield, Award, Tag, Info, Heart, Eye, MessageSquare, Fingerprint, Wind, Users, ZoomIn } from 'lucide-react';

interface CharacterProfileModalProps {
  character: CharacterProfile | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const CharacterProfileModal: React.FC<CharacterProfileModalProps> = ({
  character,
  onClose,
  isDarkMode = true,
}) => {
  const [showNotice, setShowNotice] = React.useState(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = React.useState(false);

  // Close lightbox on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageLightboxOpen) {
          setIsImageLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageLightboxOpen, onClose]);

  if (!character) return null;

  // Detail modal exclusively displays the horizontal landscape artwork (1216x832 px)
  const landscapeImg = character.landscapeImageUrl || character.imageUrl;

  const teamChatDefaults: Record<'A' | 'B' | 'C' | 'D', string | undefined> = {
    A: 'https://share.crack.wrtn.ai/wykxkpi',
    B: 'https://share.crack.wrtn.ai/1mubcs',
    C: 'https://share.crack.wrtn.ai/3x8r1wp',
    D: undefined,
  };

  const chatLink = character.chatUrl || teamChatDefaults[character.team];

  const teamButtonThemes = {
    A: {
      dark: 'border-amber-700/80 bg-amber-950/80 text-amber-200 hover:bg-amber-900 hover:text-white hover:border-amber-500',
      light: 'border-amber-300 bg-amber-100/90 text-amber-800 hover:bg-amber-200 hover:text-amber-900',
      icon: 'text-amber-400',
    },
    B: {
      dark: 'border-purple-700/80 bg-purple-950/80 text-purple-200 hover:bg-purple-900 hover:text-white hover:border-purple-500',
      light: 'border-purple-300 bg-purple-100/90 text-purple-800 hover:bg-purple-200 hover:text-purple-900',
      icon: 'text-purple-400',
    },
    C: {
      dark: 'border-red-700/80 bg-red-950/80 text-red-200 hover:bg-red-900 hover:text-white hover:border-red-500',
      light: 'border-red-300 bg-red-100/90 text-red-800 hover:bg-red-200 hover:text-red-900',
      icon: 'text-red-400',
    },
    D: {
      dark: 'border-blue-700/80 bg-[#0B1528] text-blue-200 hover:bg-[#132342] hover:text-white hover:border-blue-500',
      light: 'border-blue-300 bg-blue-100/90 text-blue-800 hover:bg-blue-200 hover:text-blue-900',
      icon: 'text-blue-400',
    },
  }[character.team];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/80 animate-fade-in">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Profile Card Container (Fine Dining Dossier Style) */}
      <div
        className={`relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border ${
          isDarkMode
            ? 'border-[#3D3530] bg-[#171413] text-[#E0D8D0] shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
            : 'border-[#D5C2AF] bg-[#FAF7F2] text-[#2C2724] shadow-2xl'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between gap-2 sm:gap-3 border-b px-3.5 py-2.5 sm:px-6 sm:py-4 shrink-0 ${
            isDarkMode ? 'border-[#2D2622] bg-[#1E1A18]' : 'border-[#E5DACD] bg-[#F3ECE1]'
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-[8.5px] sm:text-[10px] font-bold tracking-wider font-cinzel uppercase ${
                character.team === 'A'
                  ? 'bg-neutral-100 text-neutral-900 border border-white shadow-[0_0_8px_rgba(255,255,255,0.35)]'
                  : character.team === 'B'
                  ? 'bg-purple-950/90 text-purple-300 border border-purple-700/70 shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                  : character.team === 'C'
                  ? 'bg-red-950/90 text-red-300 border border-red-700/70 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                  : 'bg-[#0B1528] text-blue-300 border border-blue-700/70 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
              }`}
            >
              TEAM {character.team}
            </span>
            {character.isAnimal && (
              <span className="shrink-0 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[8.5px] sm:text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
                동물 1
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-cinzel text-sm sm:text-lg font-bold tracking-wider leading-tight">
                  {character.name}
                </h3>
                <span className="text-[9px] sm:text-xs font-cinzel text-amber-500/90 font-medium tracking-tight">
                  [{character.id}]
                </span>
              </div>
              <p className="text-[10px] sm:text-xs opacity-80 font-serif-kr leading-snug mt-0.5 break-keep">
                {character.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="relative">
              <a
                href={chatLink || '#'}
                target={chatLink ? '_blank' : undefined}
                rel={chatLink ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!chatLink) {
                    e.preventDefault();
                    setShowNotice(true);
                    setTimeout(() => setShowNotice(false), 2500);
                  }
                }}
                aria-label={chatLink ? `${character.name}와(과) 대화하기` : '대화 링크 준비 중'}
                className={`flex items-center gap-1 sm:gap-1.5 rounded-full border px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold tracking-normal sm:tracking-wider transition-all shadow-xs cursor-pointer whitespace-nowrap ${
                  isDarkMode ? teamButtonThemes.dark : teamButtonThemes.light
                }`}
              >
                <MessageSquare className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${teamButtonThemes.icon}`} />
                <span>대화하기</span>
              </a>

              {/* Notice Toast for Teams without link yet */}
              {showNotice && (
                <div className="absolute right-0 top-full mt-1.5 z-30 whitespace-nowrap rounded-lg border border-[#5A4535] bg-[#1C1715] px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11px] font-sans font-medium text-amber-200 shadow-2xl animate-fade-in">
                  대화 링크가 곧 연결될 예정입니다.
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-colors shrink-0 ${
                isDarkMode
                  ? 'border-[#3D3530] bg-[#241F1D] text-[#B0A498] hover:bg-[#382F2A] hover:text-white'
                  : 'border-[#D5C7B4] bg-[#FAF8F5] text-[#5C4F42] hover:bg-[#6B1E29] hover:text-white'
              }`}
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto">
          {/* 1. TOP HORIZONTAL (LANDSCAPE: 1216x832 px) IMAGE FRAME - FULL WIDTH ZERO MARGIN */}
          <div className="w-full">
            <div
              onClick={() => {
                if (landscapeImg) {
                  setIsImageLightboxOpen(true);
                }
              }}
              className={`group relative aspect-[1216/832] w-full overflow-hidden border-b ${
                landscapeImg ? 'cursor-pointer' : ''
              } ${
                isDarkMode ? 'border-[#3D3530] bg-[#0E0C0B]' : 'border-[#D8C7B4] bg-[#EFE9DF]'
              }`}
            >
              {landscapeImg ? (
                <>
                  <img
                    src={landscapeImg}
                    alt={character.name}
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
                    className="h-full w-full object-cover object-center block transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  {/* Desktop Hover Indicator */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="flex items-center gap-2 rounded-full bg-black/80 border border-amber-500/70 px-4 py-2 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-xs transform transition-transform group-hover:scale-105">
                      <ZoomIn className="h-4 w-4" />
                      <span>가로 일러스트 크게 보기</span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-[#5A4D42] mb-2">
                    <User className={`h-8 w-8 ${isDarkMode ? 'text-[#5A4D42]' : 'text-[#A09282]'}`} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold font-cinzel tracking-widest text-amber-500/90">
                    [가로형 캐릭터 상세 일러스트 (1216 × 832 px)]
                  </span>
                  <span className="text-[11px] opacity-60 mt-1 font-serif-kr">
                    가로형(1216 × 832 px) 규격에 맞추어 최적화된 프레임입니다.
                  </span>
                </div>
              )}

              {/* Gold Frame Accent Corners */}
              <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/80" />
              <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/80" />
              <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/80" />
              <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/80" />
            </div>

            <div
              className={`flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] px-4 sm:px-5 py-2 font-cinzel border-b ${
                isDarkMode
                  ? 'border-[#26201D] bg-[#141110] text-[#8C7E72]'
                  : 'border-[#EAE0D3] bg-[#F5EFE6] text-[#7A6C5F]'
              }`}
            >
              <span className="break-all sm:break-normal">SALON VVIP REGISTERED DOSSIER: #{character.id}</span>
              <span className="hidden xs:inline">EXCLUSIVE CONFIDENTIAL DOSSIER</span>
            </div>
          </div>

          {/* Details Content Container */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">

            {/* 2. Character Key Attributes & Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Affiliation & Role */}
              <div
                className={`rounded-xl border p-4 ${
                  isDarkMode ? 'border-[#2D2622] bg-[#1C1816]' : 'border-[#EAE0D3] bg-[#F7F2EA]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="font-cinzel text-xs font-bold tracking-wider">소속 및 직무</span>
                </div>
                <p className="text-sm font-semibold">{character.teamName}</p>
                <p className="text-xs opacity-75 mt-0.5">{character.teamRole}</p>
              </div>

              {/* Species / Gender / Dimensions */}
              <div
                className={`rounded-xl border p-4 ${
                  isDarkMode ? 'border-[#2D2622] bg-[#1C1816]' : 'border-[#EAE0D3] bg-[#F7F2EA]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Info className="h-4 w-4 text-amber-500" />
                  <span className="font-cinzel text-xs font-bold tracking-wider">
                    {character.isAnimal ? '개체 제원' : '신체 및 종족 제원'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="opacity-70">종족 / 성별</span>
                  <span className="font-semibold">{character.species || '천사'} · {character.gender || '미상'}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-[#2D2622]/40">
                  <span className="opacity-70">{character.isAnimal ? '체장' : '신장'}</span>
                  <span className="font-semibold">{character.height || '미상'}</span>
                </div>
                {character.mark && (
                  <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-[#2D2622]/40">
                    <span className="opacity-70">각인 표식</span>
                    <span
                      className={`font-semibold ${
                        character.team === 'A'
                          ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                          : character.team === 'B'
                          ? 'text-purple-400'
                          : character.team === 'C'
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {character.mark}
                    </span>
                  </div>
                )}
                {(character.mbti || character.attachmentType) && (
                  <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-[#2D2622]/40">
                    <span className="opacity-70">성향 / 애착유형</span>
                    <span className="font-semibold text-amber-400">
                      {character.mbti && character.mbti !== '없음' ? `${character.mbti} · ` : ''}{character.attachmentType || ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Scent & Fragrance */}
              <div
                className={`rounded-xl border p-4 ${
                  isDarkMode
                    ? 'border-[#3D3025] bg-[#211B16] text-[#D8C7B5]'
                    : 'border-[#D9C4B0] bg-[#FAF0E4] text-[#6B503B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1.5">
                  <Wind className="h-4 w-4 text-amber-500" />
                  <span className="font-cinzel text-xs">고유 체향 (Scent)</span>
                </div>
                <p className="leading-relaxed text-xs font-medium">
                  {character.scent || '무색무취 / 미상'}
                </p>
                {character.mark && (
                  <div className="mt-2 pt-2 border-t border-[#3D3025]/60 flex items-center justify-between text-[11px]">
                    <span className="opacity-70 font-cinzel text-[10px]">STIGMATE</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded border ${
                        character.team === 'A'
                          ? 'text-white bg-white/15 border-white/50 shadow-xs'
                          : character.team === 'B'
                          ? 'text-purple-300 bg-purple-950/60 border-purple-800/40'
                          : character.team === 'C'
                          ? 'text-rose-300 bg-rose-950/60 border-rose-800/40'
                          : 'text-emerald-300 bg-emerald-950/60 border-emerald-800/40'
                      }`}
                    >
                      {character.mark}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Core Keywords Banner */}
            {character.coreKeywords && (
              <div
                className={`rounded-xl border px-4 py-3 text-xs flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${
                  isDarkMode
                    ? 'border-amber-900/50 bg-gradient-to-r from-amber-950/40 via-[#1C1715] to-transparent text-amber-200'
                    : 'border-amber-300/60 bg-amber-50/70 text-amber-950'
                }`}
              >
                <span className="font-cinzel text-xs font-bold tracking-wider text-amber-400 shrink-0 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  핵심 본질 (Noyau)
                </span>
                <span className="font-serif-kr font-medium opacity-90">
                  {character.coreKeywords}
                </span>
              </div>
            )}

            {/* Special Note Banner */}
            {character.specialNote && (
              <div
                className={`rounded-xl border px-4 py-3 text-xs flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${
                  isDarkMode
                    ? 'border-rose-900/50 bg-gradient-to-r from-rose-950/40 via-[#1C1715] to-transparent text-rose-200'
                    : 'border-rose-300/60 bg-rose-50/70 text-rose-950'
                }`}
              >
                <span className="font-cinzel text-xs font-bold tracking-wider text-rose-400 shrink-0 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  특이 사항 (Note Spéciale)
                </span>
                <span className="font-serif-kr font-medium opacity-90">
                  {character.specialNote}
                </span>
              </div>
            )}

            {/* 3. Quote Banner */}
            <div
              className={`relative rounded-xl border-l-4 border-amber-600 px-3.5 py-3 sm:px-5 sm:py-4 italic ${
                isDarkMode ? 'bg-[#1C1816] text-[#D0C4B8]' : 'bg-[#F9F5EE] text-[#554639]'
              }`}
            >
              <Quote className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-25" />
              <p className="pl-3 sm:pl-4 font-serif-kr text-xs sm:text-sm leading-relaxed sm:leading-relaxed break-keep">
                {character.quote.startsWith('“') || character.quote.startsWith('"')
                  ? character.quote
                  : `"${character.quote}"`}
              </p>
            </div>

            {/* 4. Structured Detailed Profile Panels (Personality, Appearance, Traits, Speech, Relations) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Personality */}
              {character.personality && (
                <div
                  className={`rounded-xl border p-4 text-xs leading-relaxed ${
                    isDarkMode ? 'border-[#2D2622] bg-[#1A1614]' : 'border-[#EAE0D3] bg-[#F7F2EA]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Heart className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-cinzel text-xs font-bold tracking-wider">성격 (Personnalité)</span>
                  </div>
                  <p className="font-serif-kr opacity-90 leading-relaxed whitespace-pre-line break-keep">
                    {character.personality}
                  </p>
                </div>
              )}

              {/* Appearance */}
              {character.appearance && (
                <div
                  className={`rounded-xl border p-4 text-xs leading-relaxed ${
                    isDarkMode ? 'border-[#2D2622] bg-[#1A1614]' : 'border-[#EAE0D3] bg-[#F7F2EA]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Eye className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-cinzel text-xs font-bold tracking-wider">외형 및 복식 (Apparence)</span>
                  </div>
                  <p className="font-serif-kr opacity-90 leading-relaxed whitespace-pre-line break-keep">
                    {character.appearance}
                  </p>
                </div>
              )}

              {/* Traits & Gimmicks */}
              {character.traits && (
                <div
                  className={`rounded-xl border p-4 text-xs leading-relaxed ${
                    isDarkMode ? 'border-[#2D2622] bg-[#1A1614]' : 'border-[#EAE0D3] bg-[#F7F2EA]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Fingerprint className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-cinzel text-xs font-bold tracking-wider">고유 특징 및 기믹 (Traits)</span>
                  </div>
                  <p className="font-serif-kr opacity-90 leading-relaxed whitespace-pre-line break-keep">
                    {character.traits}
                  </p>
                </div>
              )}

              {/* Speech Style & Behavior */}
              {character.speechStyle && (
                <div
                  className={`rounded-xl border p-4 text-xs leading-relaxed ${
                    isDarkMode ? 'border-[#2D2622] bg-[#1A1614]' : 'border-[#EAE0D3] bg-[#F7F2EA]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-cinzel text-xs font-bold tracking-wider">말투 및 행동 양식 (Élocution)</span>
                  </div>
                  <p className="font-serif-kr opacity-90 leading-relaxed whitespace-pre-line break-keep">
                    {character.speechStyle}
                  </p>
                </div>
              )}

              {/* Relationships */}
              {character.relationships && (
                <div
                  className={`col-span-1 md:col-span-2 rounded-xl border p-4 text-xs leading-relaxed ${
                    isDarkMode ? 'border-[#2D2622] bg-[#1A1614]' : 'border-[#EAE0D3] bg-[#F7F2EA]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Users className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-cinzel text-xs font-bold tracking-wider">인물 관계망 (Relations)</span>
                  </div>
                  <p className="font-serif-kr opacity-90 leading-relaxed whitespace-pre-line break-keep">
                    {character.relationships}
                  </p>
                </div>
              )}
            </div>

            {/* 5. Character Trait Tags */}
            <div>
              <h4 className="font-cinzel text-xs font-bold tracking-wider opacity-80 mb-2 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-amber-500" />
                주요 성향 및 키워드 (Caractéristiques)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {character.characteristics.map((trait, idx) => (
                  <span
                    key={idx}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium border ${
                      isDarkMode
                        ? 'border-[#332B26] bg-[#221D1A] text-[#C7B9AC]'
                        : 'border-[#DDD1C2] bg-[#F2EAE0] text-[#5A4B3D]'
                    }`}
                  >
                    #{trait}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Detailed Narrative */}
            <div
              className={`rounded-xl border p-5 text-xs leading-relaxed ${
                isDarkMode ? 'border-[#2D2622] bg-[#161312]' : 'border-[#EAE0D3] bg-[#F9F6F1]'
              }`}
            >
              <h4 className="font-cinzel text-xs font-bold tracking-wider opacity-80 mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                상세 서사 및 프로필 요약 (Dossier Narratif)
              </h4>
              <p className="font-serif-kr text-xs leading-relaxed opacity-90 whitespace-pre-line break-keep">
                {character.description}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`flex items-center justify-between border-t px-6 py-3.5 text-xs shrink-0 ${
            isDarkMode ? 'border-[#2D2622] bg-[#1E1A18] text-[#8C7D70]' : 'border-[#E5DACD] bg-[#F3ECE1] text-[#78695B]'
          }`}
        >
          <span className="font-cinzel tracking-wider text-[11px]">SALON GLACÉ • VVIP DOSSIER CONFIDENTIAL</span>
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-1.5 font-medium text-amber-400 bg-[#29221E] hover:bg-amber-950 transition-colors"
          >
            창 닫기
          </button>
        </div>
      </div>

      {/* Lightbox for Landscape Artwork View */}
      {isImageLightboxOpen && landscapeImg && (
        <div
          className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 animate-fade-in"
          onClick={() => setIsImageLightboxOpen(false)}
        >
          {/* Lightbox Container */}
          <div
            className="relative flex flex-col max-w-5xl w-full max-h-[92vh] rounded-2xl border border-amber-500/40 bg-[#141110] shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between border-b border-[#2E2723] bg-[#1C1816] px-4 py-3 sm:px-6 sm:py-3.5 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold font-cinzel tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  TEAM {character.team}
                </span>
                <span className="text-xs sm:text-sm font-bold font-cinzel tracking-wider text-amber-200 truncate">
                  {character.name}
                </span>
                <span className="hidden sm:inline-block text-[11px] font-serif-kr text-neutral-400">
                  (1216 × 832 px)
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsImageLightboxOpen(false)}
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-amber-950 hover:border-amber-600 hover:text-white transition-colors"
                  aria-label="닫기"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Viewport */}
            <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 bg-black/60 overflow-hidden">
              <img
                src={landscapeImg}
                alt={character.name}
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
                className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all"
              />

              {/* Gold Frame Corner Accents */}
              <div className="pointer-events-none absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-amber-500/80" />
              <div className="pointer-events-none absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-amber-500/80" />
              <div className="pointer-events-none absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-amber-500/80" />
              <div className="pointer-events-none absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-amber-500/80" />
            </div>

            {/* Lightbox Footer */}
            <div className="flex items-center justify-between border-t border-[#26201D] bg-[#171413] px-4 py-2 text-[11px] font-sans text-neutral-400">
              <span className="font-serif-kr text-[11px] text-amber-400/80">
                <span className="inline sm:hidden">바깥 영역을 클릭하거나 닫기 또는 X를 누르면 닫힙니다.</span>
                <span className="hidden sm:inline">바깥 영역을 클릭하거나 ESC 키를 누르면 닫힙니다.</span>
              </span>
              <button
                onClick={() => setIsImageLightboxOpen(false)}
                className="text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
