import React from 'react';
import { SALON_META, SALON_RULES } from '../data/salonData';
import { ChevronDown, Calendar, ShieldAlert, Sparkles, Feather, Flame, Utensils, Award, Clock, Star } from 'lucide-react';

interface HeroSectionProps {
  onScrollToReservation: () => void;
  onOpenGlossary: () => void;
  onOpenAuthorComment?: () => void;
  isReserved: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToReservation,
  onOpenGlossary,
  onOpenAuthorComment,
  isReserved,
}) => {
  const [isGlitching, setIsGlitching] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [activeBadgeColor, setActiveBadgeColor] = React.useState<Record<number, number>>({});
  const glitchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Easter Egg: '신의 살점' noise glitch state
  const [isFleshGlitching, setIsFleshGlitching] = React.useState(false);
  const fleshGlitchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const noiseCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // 4색 테마 순서: 하얀색(0) -> 보라색(1) -> 빨간색(2) -> 파란색(3)
  const BADGE_COLOR_ORDER = [
    'border-white/90 bg-white/20 text-white shadow-[0_0_18px_rgba(255,255,255,0.45)] ring-1 ring-white/60 font-semibold',
    'border-purple-400/90 bg-purple-950/70 text-purple-200 shadow-[0_0_18px_rgba(168,85,247,0.45)] ring-1 ring-purple-400/60 font-semibold',
    'border-red-500/90 bg-red-950/70 text-red-200 shadow-[0_0_18px_rgba(239,68,68,0.45)] ring-1 ring-red-400/60 font-semibold',
    'border-blue-400/90 bg-blue-950/70 text-blue-200 shadow-[0_0_18px_rgba(59,130,246,0.45)] ring-1 ring-blue-400/60 font-semibold',
  ];

  // 암호: 카니발리즘(하양 0) > 오르톨랑(보라 1) > 라팽(붉은색 2) > 동결보존(파란색 3)
  const isPuzzleSolved =
    activeBadgeColor[0] === 0 &&
    activeBadgeColor[1] === 1 &&
    activeBadgeColor[2] === 2 &&
    activeBadgeColor[3] === 3;

  const handleBadgeTouch = (badgeIndex: number) => {
    setActiveBadgeColor((prev) => {
      const current = prev[badgeIndex];
      // 순차적으로 하얀색(0) -> 보라색(1) -> 빨간색(2) -> 파란색(3) 순환
      const next = current === undefined ? badgeIndex : (current + 1) % 4;
      return { ...prev, [badgeIndex]: next };
    });
  };

  // Synthesize a brief digital static / horror glitch sound
  const playGlitchSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Audio not supported
    }
  };

  // Deep horror noise audio for '‘신의 살점’'
  const playDivineGlitchSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();

      // Deep rumble
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 2.5);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.8);

      // White/pink static noise
      const bufferSize = Math.floor(ctx.sampleRate * 2.4);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.055;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 650;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 2.5);
    } catch {
      // Audio not supported
    }
  };

  const handleGlitchTrigger = () => {
    if (!isReserved) return;
    setIsGlitching(true);
    playGlitchSound();
    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    glitchTimeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
    }, 1400);
  };

  // Triggered when user clicks '‘신의 살점’'
  const handleFleshClick = () => {
    setIsFleshGlitching(true);
    playDivineGlitchSound();
    if (fleshGlitchTimeoutRef.current) clearTimeout(fleshGlitchTimeoutRef.current);
    fleshGlitchTimeoutRef.current = setTimeout(() => {
      setIsFleshGlitching(false);
    }, 3000);
  };

  // Render animated noise static on canvas while flesh glitch is active
  React.useEffect(() => {
    if (!isFleshGlitching) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFleshGlitching(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    const canvas = noiseCanvasRef.current;
    if (!canvas) {
      return () => window.removeEventListener('keydown', handleKeyDown);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return () => window.removeEventListener('keydown', handleKeyDown);
    }

    let animId: number;
    const w = (canvas.width = Math.min(window.innerWidth, 480));
    const h = (canvas.height = Math.min(window.innerHeight, 320));
    const imgData = ctx.createImageData(w, h);
    const buf = new Uint32Array(imgData.data.buffer);

    const loop = () => {
      for (let i = 0; i < buf.length; i++) {
        const r = Math.random();
        if (r < 0.12) {
          buf[i] = 0xffffffff; // bright static
        } else if (r < 0.25) {
          buf[i] = 0xff2020aa; // faint blood red static
        } else if (r < 0.5) {
          const grey = Math.floor(Math.random() * 80 + 30);
          buf[i] = (255 << 24) | (grey << 16) | (grey << 8) | grey;
        } else {
          buf[i] = 0xff0a0808; // deep dark
        }
      }
      ctx.putImageData(imgData, 0, 0);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFleshGlitching]);

  React.useEffect(() => {
    return () => {
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      if (fleshGlitchTimeoutRef.current) clearTimeout(fleshGlitchTimeoutRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className={`relative overflow-hidden border-b py-16 sm:py-24 lg:py-32 transition-colors duration-700 ${
        isReserved
          ? 'bg-[#151211] border-[#2D2622] text-[#E0D8D0]'
          : 'bg-[#FAF8F5] border-[#E8E0D5] text-[#2C2724]'
      }`}
    >
      {/* Background Texture & Aura */}
      <div
        className={`pointer-events-none absolute inset-0 [background-size:24px_24px] ${
          isReserved
            ? 'bg-[radial-gradient(#2E2621_1px,transparent_1px)] opacity-60'
            : 'bg-[radial-gradient(#E8DFD4_1px,transparent_1px)] opacity-40'
        }`}
      />
      <div
        className={`pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full blur-3xl ${
          isReserved ? 'bg-[#29201B]/50 opacity-40' : 'bg-[#F3ECE1] opacity-70'
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full blur-3xl ${
          isReserved ? 'bg-[#1F1714]/60 opacity-50' : 'bg-[#EFE6D9] opacity-60'
        }`}
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Salon Crest & Top Subtitle */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-xs mb-6 ${
            isReserved
              ? 'border-[#3D332D] bg-[#1E1917] text-[#C4B7AA]'
              : 'border-[#D8CCBD] bg-[#F7F2EB] text-[#54483E]'
          }`}
        >
          {isReserved ? (
            <>
              <Feather className="h-3.5 w-3.5 text-[#8A7B6D]" />
              <span className="font-cinzel text-xs font-semibold tracking-[0.25em]">
                {SALON_META.title}
              </span>
              <Flame className="h-3.5 w-3.5 text-amber-500" />
            </>
          ) : (
            <>
              <Star className="h-3.5 w-3.5 text-[#A67C52]" />
              <span className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#54483E]">
                {SALON_META.title}
              </span>
              <Award className="h-3.5 w-3.5 text-[#A67C52]" />
            </>
          )}
        </div>

        {/* Grand Typography Logo */}
        <h1
          onClick={isReserved ? handleGlitchTrigger : undefined}
          onMouseEnter={isReserved ? () => setIsHovered(true) : undefined}
          onMouseLeave={isReserved ? () => setIsHovered(false) : undefined}
          onTouchStart={isReserved ? handleGlitchTrigger : undefined}
          className={`font-cinzel text-5xl font-extrabold tracking-[0.2em] sm:text-6xl md:text-7xl lg:text-8xl select-none ${
            isReserved ? 'cursor-pointer text-[#E0D8D0]' : 'text-[#2C2724]'
          }`}
        >
          <span
            className={`relative inline-block ${
              isReserved && (isGlitching || isHovered) ? 'glitch-active' : ''
            }`}
            data-text={SALON_META.name}
          >
            {SALON_META.name}
          </span>
        </h1>
        <p
          className={`mt-2 font-garamond text-xl italic tracking-widest sm:text-2xl ${
            isReserved ? 'text-amber-500' : 'text-[#6B1E29]'
          }`}
        >
          {isReserved
            ? '— Le Glaçage de la Pièce Maîtresse —'
            : '— Restaurant Gastronomique & Salon Privé —'}
        </p>

        {/* Narrative Description (Dual: Normal Restaurant vs Dark Secret Salon) */}
        <div className="mx-auto mt-6 max-w-2xl px-2">
          {isReserved ? (
            <div className="font-serif-kr text-base leading-relaxed sm:text-lg text-[#B0A294] text-center">
              <span className="block whitespace-nowrap overflow-x-auto no-scrollbar text-[11px] xxs:text-xs xs:text-sm sm:text-base md:text-lg font-medium text-[#E0D8D0] tracking-tight sm:tracking-normal py-0.5">
                천상계의 고위 천사들과 지옥의 악마 공작들이 권력의 정점에서 앓는 도덕적 불감증.
              </span>
              <p className="mt-1.5 text-xs xs:text-sm sm:text-base text-[#9E8E80]">
                신의 눈과 지상의 법률이 닿지 않는 <strong className="font-semibold text-[#E0D8D0]">지상 80층의 차가운 야간 온실</strong>에서,
                <br className="hidden sm:inline" />
                단 하나의{' '}
                <button
                  type="button"
                  onClick={handleFleshClick}
                  className="inline font-semibold text-white underline decoration-red-900/60 hover:decoration-red-400 hover:text-red-200 transition-colors cursor-pointer underline-offset-4 focus:outline-none"
                >
                  ‘신의 살점’
                </button>
                을 두고 벌어지는 미친 미식가들의 프라이빗 경매 살롱.
              </p>
            </div>
          ) : (
            <p className="font-serif-kr text-base leading-relaxed sm:text-lg text-[#4A423B]">
              도심 최고층 지상 80층 스카이라인을 조망하는 최고급 프렌치 파인다이닝 레스토랑.
              <br className="hidden sm:inline" />
              장인의 섬세한 텍스처와 완벽한 온도 제어로 빚어내는 오트 퀴진의 미학 속에서,
              <br className="hidden sm:inline" />
              오직 당신만을 위한 특별하고 황홀한 미식의 향연을 선사합니다.
            </p>
          )}
        </div>

        {/* Core Concept Metaphors Badge */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs tracking-wider">
          {isReserved ? (
            <>
              {/* 1. 카니발리즘: 순서 1 하얀색 */}
              <button
                type="button"
                onClick={() => handleBadgeTouch(0)}
                className={`rounded-md border px-3 py-1 text-xs transition-all duration-300 cursor-pointer ${
                  activeBadgeColor[0] !== undefined
                    ? BADGE_COLOR_ORDER[activeBadgeColor[0]]
                    : 'border-[#332A24] bg-[#1E1917] text-[#B8AA9E] hover:border-white/90 hover:bg-white/15 hover:text-white hover:shadow-[0_0_16px_rgba(255,255,255,0.4)] hover:ring-1 hover:ring-white/50'
                }`}
              >
                카니발리즘 (Cannibalism)
              </button>

              {/* 2. 오르톨랑: 순서 2 보라색 */}
              <button
                type="button"
                onClick={() => handleBadgeTouch(1)}
                className={`rounded-md border px-3 py-1 text-xs transition-all duration-300 cursor-pointer ${
                  activeBadgeColor[1] !== undefined
                    ? BADGE_COLOR_ORDER[activeBadgeColor[1]]
                    : 'border-[#332A24] bg-[#1E1917] text-[#B8AA9E] hover:border-purple-400/90 hover:bg-purple-950/60 hover:text-purple-200 hover:shadow-[0_0_16px_rgba(168,85,247,0.45)] hover:ring-1 hover:ring-purple-400/50'
                }`}
              >
                오르톨랑 (Ortolan & L’Armagnac)
              </button>

              {/* 3. 라팽(Lapin): 순서 3 빨간색 */}
              <button
                type="button"
                onClick={() => handleBadgeTouch(2)}
                className={`rounded-md border px-3 py-1 text-xs transition-all duration-300 cursor-pointer ${
                  activeBadgeColor[2] !== undefined
                    ? BADGE_COLOR_ORDER[activeBadgeColor[2]]
                    : 'border-[#332A24] bg-[#1E1917] text-[#B8AA9E] hover:border-red-500/90 hover:bg-red-950/60 hover:text-red-200 hover:shadow-[0_0_16px_rgba(239,68,68,0.45)] hover:ring-1 hover:ring-red-500/50'
                }`}
              >
                라팽(Lapin)
              </button>

              {/* 4. 18.0°C 동결 보존: 순서 4 파란색 */}
              <button
                type="button"
                onClick={() => handleBadgeTouch(3)}
                className={`rounded-md border px-3 py-1 text-xs transition-all duration-300 cursor-pointer ${
                  activeBadgeColor[3] !== undefined
                    ? BADGE_COLOR_ORDER[activeBadgeColor[3]]
                    : 'border-[#332A24] bg-[#1E1917] text-[#B8AA9E] hover:border-blue-400/90 hover:bg-blue-950/60 hover:text-blue-200 hover:shadow-[0_0_16px_rgba(59,130,246,0.45)] hover:ring-1 hover:ring-blue-400/50'
                }`}
              >
                18.0°C 동결 보존
              </button>
            </>
          ) : (
            <>
              <span className="rounded-md border border-[#E2D5C4] bg-[#F9F5EE] px-3 py-1 text-[#615448]">
                최고급 프렌치 퀴진
              </span>
              <span className="rounded-md border border-[#E2D5C4] bg-[#F9F5EE] px-3 py-1 text-[#615448]">
                프라이빗 펜트하우스
              </span>
              <span className="rounded-md border border-[#E2D5C4] bg-[#F9F5EE] px-3 py-1 text-[#615448]">
                18.0°C 최적 온도 제어
              </span>
              <span className="rounded-md border border-[#D5B8B0] bg-[#FAF0EE] px-3 py-1 font-medium text-[#7A1E29]">
                100% 프라이빗 예약제
              </span>
            </>
          )}
        </div>

        {/* Puzzle Solved Author Comment Direct Trigger Banner */}
        {isReserved && isPuzzleSolved && (
          <div className="mt-5 flex flex-col items-center justify-center animate-fade-in">
            <button
              type="button"
              onClick={onOpenAuthorComment}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/90 bg-gradient-to-r from-amber-950/90 via-[#2E1A22] to-amber-950/90 px-5 py-2 text-xs sm:text-sm font-bold text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer ring-1 ring-amber-400/60"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>제작자 코멘터리 열람하기</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </button>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
          <button
            onClick={onScrollToReservation}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold tracking-wider transition-all sm:w-auto shadow-md ${
              isReserved
                ? 'border border-amber-700/60 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 hover:text-white'
                : 'border border-[#6B1E29] bg-[#1F1916] text-[#FAF8F5] hover:bg-[#6B1E29] hover:shadow-xl'
            }`}
          >
            {isReserved ? (
              <>
                <Utensils className="h-4 w-4" />
                <span>살롱 참석자 명부 열람 (A·B·C·D)</span>
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 text-[#D5C2AF]" />
                <span>프라이빗 테이블 예약하기 (Réservation)</span>
              </>
            )}
          </button>
        </div>

        {/* Philosophy or Rules Section */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`h-[1px] w-12 ${isReserved ? 'bg-[#3D332D]' : 'bg-[#D9CDBC]'}`} />
            <h2
              className={`font-cinzel text-xs font-bold tracking-[0.25em] uppercase ${
                isReserved ? 'text-amber-500/80' : 'text-[#8C7D6E]'
              }`}
            >
              {isReserved ? 'Règles Absolues du Salon (살롱의 절대 규칙)' : 'Philosophie Gastronomique (다이닝 철학)'}
            </h2>
            <span className={`h-[1px] w-12 ${isReserved ? 'bg-[#3D332D]' : 'bg-[#D9CDBC]'}`} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {isReserved
              ? SALON_RULES.map((rule) => (
                  <div
                    key={rule.num}
                    className="relative rounded-xl border border-[#2D2622] bg-[#1A1614] p-5 text-left shadow-xs transition-transform hover:-translate-y-0.5 text-[#D8CEBE]"
                  >
                    <div className="flex items-center justify-between border-b border-[#2D2622] pb-3 mb-3">
                      <span className="font-cinzel text-lg font-bold text-amber-500">
                        {rule.num}
                      </span>
                      <span className="text-[10px] font-semibold tracking-widest opacity-60 font-cinzel">
                        ARTICLE {rule.num}
                      </span>
                    </div>
                    <h3 className="font-serif-kr text-sm font-bold">
                      {rule.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#9C8F83]">
                      {rule.description}
                    </p>
                  </div>
                ))
              : [
                  {
                    num: 'I',
                    title: '최상의 순수한 텍스처',
                    desc: '엄선된 최상급 재료만을 선별하여, 타협하지 않는 순수한 텍스처와 깊이 있는 풍미를 완성합니다.',
                  },
                  {
                    num: 'II',
                    title: '18.0°C 정밀 온도 관리',
                    desc: '모든 와인과 요리가 가장 이상적인 조화를 이루도록 전 공간을 18.0°C 항온으로 완벽하게 제어합니다.',
                  },
                  {
                    num: 'III',
                    title: '단 한 분을 위한 프라이빗 다이닝',
                    desc: '오직 살롱의 문을 연 예약자만을 위해 프라이빗 펜트하우스 챔버 전체를 독점 배정합니다.',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="relative rounded-xl border border-[#E6DDD1] bg-[#FAF7F2] p-5 text-left shadow-xs transition-transform hover:-translate-y-0.5 text-[#2A2420]"
                  >
                    <div className="flex items-center justify-between border-b border-[#EAE2D7] pb-3 mb-3">
                      <span className="font-cinzel text-lg font-bold text-[#6B1E29]">
                        {item.num}
                      </span>
                      <span className="text-[10px] font-semibold tracking-widest text-[#9C8F82] font-cinzel">
                        PRINCIPLE {item.num}
                      </span>
                    </div>
                    <h3 className="font-serif-kr text-sm font-bold text-[#2A2420]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C5349]">
                      {item.desc}
                    </p>
                  </div>
                ))}
          </div>
        </div>

        {/* Salon / Restaurant Status Bar */}
        <div
          className={`mt-12 rounded-xl border p-4 text-xs shadow-2xs ${
            isReserved
              ? 'border-[#2D2622] bg-[#161312] text-[#A6978A]'
              : 'border-[#E0D5C7] bg-[#F5EFE6] text-[#544A40]'
          }`}
        >
          <div className="flex flex-wrap items-center justify-around gap-4 text-center sm:text-left">
            <div>
              <span className="opacity-60 block text-[10px] uppercase font-cinzel">Location</span>
              <span className="font-semibold">지상 80층 펜트하우스 온실 스카이라운지</span>
            </div>
            <div
              className={`hidden sm:block h-6 w-[1px] ${
                isReserved ? 'bg-[#332A24]' : 'bg-[#D8CCBD]'
              }`}
            />
            <div>
              <span className="opacity-60 block text-[10px] uppercase font-cinzel">Ambience</span>
              <span className={`font-semibold ${isReserved ? 'text-amber-400' : 'text-[#29221D]'}`}>
                {isReserved ? 'VVIP 밀실 야간 모드 활성화' : '프라이빗 파인다이닝 정찬 운영'}
              </span>
            </div>
            <div
              className={`hidden sm:block h-6 w-[1px] ${
                isReserved ? 'bg-[#332A24]' : 'bg-[#D8CCBD]'
              }`}
            />
            <div>
              <span className="opacity-60 block text-[10px] uppercase font-cinzel">Temperature Control</span>
              <span className={`font-semibold ${isReserved ? 'text-amber-400' : 'text-[#6B1E29]'}`}>
                18.0°C 항온 셀러 제어
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Noise Glitch Overlay for '‘신의 살점’' Easter Egg */}
      {isFleshGlitching && (
        <div
          onClick={() => setIsFleshGlitching(false)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 select-none overflow-hidden cursor-pointer"
        >
          {/* Animated TV Static Noise Canvas */}
          <canvas
            ref={noiseCanvasRef}
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen pointer-events-none filter contrast-150 brightness-110"
          />

          {/* Analog Scanline Raster */}
          <div
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              backgroundImage:
                'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Deep Vignette & Dark Crimson Aura */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(80,10,15,0.25)_0%,rgba(0,0,0,0.85)_70%,rgba(0,0,0,0.98)_100%)]" />

          {/* Subtle Glitch Scan Flickers */}
          <div className="absolute inset-x-0 h-1 bg-red-600/30 blur-[1px] animate-pulse pointer-events-none top-1/4" />
          <div className="absolute inset-x-0 h-0.5 bg-white/20 blur-[0.5px] pointer-events-none top-2/3" />

          {/* Eerie Layered Typography Centerpiece */}
          <div className="relative z-10 flex items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-none">
            {/* Background whisper echo: 'God, please do not forgive me.' (모바일에서는 덜 흐릿하고 선명하게 조정) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center text-center font-cinzel text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.16em] sm:tracking-[0.22em] uppercase text-red-500/50 sm:text-red-500/[0.22] blur-none sm:blur-[0.7px] scale-105 sm:scale-110 select-none pointer-events-none leading-relaxed drop-shadow-[0_0_8px_rgba(239,68,68,0.35)] sm:drop-shadow-none"
            >
              God, please do not forgive me.
            </div>

            {/* Foreground primary text: 'Please forgive me, God.' */}
            <p className="relative z-10 font-cinzel text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.18em] text-[#F5F2EB] drop-shadow-[0_0_24px_rgba(255,255,255,0.45)] select-none leading-relaxed">
              Please forgive me, God.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
