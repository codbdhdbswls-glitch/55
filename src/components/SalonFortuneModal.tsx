import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  RotateCw,
  RotateCcw,
  Award,
  Clock,
  Coffee,
  Check,
  Share2,
  BookOpen,
  Volume2,
  VolumeX,
  Heart,
  TrendingUp,
  Activity,
  AlertTriangle,
  Eye,
  ShieldAlert,
  Ban,
  Skull,
  Droplet,
  Quote,
  Sun,
  Flame,
} from 'lucide-react';
import {
  LIGHT_FORTUNES,
  DARK_FORTUNES,
  LIGHT_ROULETTE_SLICES,
  DARK_ROULETTE_SLICES,
  FortuneItem,
} from '../data/fortuneData';

interface SalonFortuneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthorComment?: () => void;
  isDarkMode?: boolean;
}

export const SalonFortuneModal: React.FC<SalonFortuneModalProps> = ({
  isOpen,
  onClose,
  onOpenAuthorComment,
  isDarkMode = false,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [currentFortune, setCurrentFortune] = useState<FortuneItem | null>(null);
  const [drawnIds, setDrawnIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'roulette' | 'history'>('roulette');
  const [copied, setCopied] = useState(false);
  const [tickerTick, setTickerTick] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tickerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activePool = isDarkMode ? DARK_FORTUNES : LIGHT_FORTUNES;
  const activeSlices = isDarkMode ? DARK_ROULETTE_SLICES : LIGHT_ROULETTE_SLICES;
  const storageKey = isDarkMode
    ? 'salon_glace_dark_drawn_fortunes'
    : 'salon_glace_light_drawn_fortunes';

  // Initialize drawn IDs based on active theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setDrawnIds(parsed);
          if (parsed.length > 0) {
            const lastId = parsed[parsed.length - 1];
            const found = activePool.find((f) => f.id === lastId);
            if (found) setCurrentFortune(found);
            else setCurrentFortune(null);
          } else {
            setCurrentFortune(null);
          }
        }
      } else {
        setDrawnIds([]);
        setCurrentFortune(null);
      }
    } catch {
      setDrawnIds([]);
      setCurrentFortune(null);
    }
  }, [isDarkMode, storageKey]);

  // Audio tick effects
  const playTickSound = (freq = 600, duration = 0.03) => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = isDarkMode ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(isDarkMode ? 0.06 : 0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked
    }
  };

  const playWinSound = () => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      if (isDarkMode) {
        // Ominous dramatic chord (minor/augmented tension)
        const notes = [220, 261.63, 311.13, 440]; // A3, C4, Eb4, A4
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + idx * 0.08 + 0.6
          );
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
        });
      } else {
        // Bright victory arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + idx * 0.1 + 0.4
          );
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
        });
      }
    } catch {
      // Audio not supported
    }
  };

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
      if (tickerIntervalRef.current) clearInterval(tickerIntervalRef.current);
    };
  }, []);

  if (!isOpen) return null;

  // Spin Roulette function with STRICT NO-DUPLICATE guarantees
  const handleSpinRoulette = () => {
    if (isSpinning) return;
    setResetNotice(null);
    setCurrentFortune(null);
    setIsSpinning(true);

    let pool = activePool.filter((f) => !drawnIds.includes(f.id));
    let nextDrawnIds = [...drawnIds];

    if (pool.length === 0) {
      pool = [...activePool];
      nextDrawnIds = [];
      setResetNotice(
        isDarkMode
          ? '💀 모든 살롱 밑낯 계시(24종)를 열람하셨습니다! 새로운 순환이 시작됩니다.'
          : '✨ 준비된 모든 오늘의 운세(24종)를 확인하셨습니다! 새로운 행운의 순환이 시작됩니다.'
      );
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];

    // Calculate angle: target sliceIndex (0 to 7)
    const targetSliceIndex = selected.sliceIndex;
    const sliceCenterAngle = targetSliceIndex * 45 + 22.5;
    const targetMod = (360 - (sliceCenterAngle % 360)) % 360;
    const currentMod = rotationAngle % 360;
    let diff = targetMod - currentMod;
    if (diff <= 0) diff += 360;
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    const nextAngle = rotationAngle + extraRotations + diff;

    setRotationAngle(nextAngle);

    // Start tick sounds
    let tickCount = 0;
    const maxTicks = 28;
    const startTickInterval = () => {
      const runTick = () => {
        tickCount++;
        setTickerTick((prev) => !prev);
        playTickSound(isDarkMode ? 400 + (tickCount % 5) * 40 : 550 + (tickCount % 4) * 50);

        if (tickCount < maxTicks) {
          const delay = 40 + Math.pow(tickCount / maxTicks, 2.5) * 350;
          tickerIntervalRef.current = setTimeout(runTick, delay);
        }
      };
      runTick();
    };
    startTickInterval();

    // End of spin
    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      setCurrentFortune(selected);
      playWinSound();

      const updated = [...nextDrawnIds, selected.id];
      setDrawnIds(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }, 3800);
  };

  const handleCopyFortune = () => {
    if (!currentFortune) return;
    const shareText = isDarkMode
      ? `[살롱 GLACÉ 밑낯 계시]\n등급: ${currentFortune.grade}\n제목: ${currentFortune.title}\n“${currentFortune.summary}”\n생체 당도: ${currentFortune.sugarLevel}\n주시 포식자: ${currentFortune.predatorFactions}\n위험도: ${currentFortune.dangerLevel}\n생존 수칙: ${currentFortune.survivalRule}\n경고: ${currentFortune.curatorWarning}`
      : `[살롱 GLACÉ 오늘의 운세]\n등급: ${currentFortune.grade}\n제목: ${currentFortune.title}\n“${currentFortune.summary}”\n행운 디저트: ${currentFortune.luckyDessert}\n행운 컬러: ${currentFortune.luckyColor} / 숫자: ${currentFortune.luckyNumber}\n셰프 조언: ${currentFortune.chefAdvice}`;

    navigator.clipboard?.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setDrawnIds([]);
    setCurrentFortune(null);
    setResetNotice(
      isDarkMode
        ? '💀 살롱 밑낯 계시 수집 기록(24종)이 초기화되었습니다! 다시 처음부터 계시를 열람할 수 있습니다.'
        : '✨ 오늘의 운세 수집 기록(24종)이 초기화되었습니다! 새로운 운세를 다시 뽑아보세요.'
    );
    playTickSound(isDarkMode ? 320 : 650, 0.06);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 backdrop-blur-md bg-black/85 animate-fade-in">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Roulette Modal Frame */}
      <div
        className={`relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border transition-colors duration-500 ${
          isDarkMode
            ? 'border-[#4A1521] bg-[#140F0E] text-[#E5D7CE] shadow-[0_25px_70px_rgba(110,10,20,0.4)]'
            : 'border-[#D5C2AF] bg-[#FAF8F5] text-[#2C2724] shadow-[0_25px_60px_rgba(0,0,0,0.35)]'
        }`}
      >
        {/* Top Header Bar */}
        <div
          className={`flex items-center justify-between border-b px-5 sm:px-6 py-4 shrink-0 transition-colors ${
            isDarkMode
              ? 'border-[#2D1217] bg-[#1F1113]'
              : 'border-[#EAE0D3] bg-[#F4EDE2]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-base shadow-xs select-none ${
                isDarkMode
                  ? 'border-red-900/60 bg-red-950/80 text-red-300'
                  : 'border-[#C5A059] bg-amber-50 text-amber-700'
              }`}
            >
              🔮
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-wider">
                  {isDarkMode
                    ? '살롱의 밑낯 • 생존과 경매 계시'
                    : '오늘의 살롱 운세 (Roue de la Fortune)'}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider border ${
                    isDarkMode
                      ? 'bg-red-950/90 border-red-700/80 text-red-300'
                      : 'bg-amber-100 border-amber-400 text-amber-800'
                  }`}
                >
                  {isDarkMode ? 'DARK UNDERBELLY' : 'LIGHT SALON'}
                </span>
              </div>
              <p
                className={`text-[11px] font-serif-kr ${
                  isDarkMode ? 'text-red-300/70' : 'text-[#7A6B5D]'
                }`}
              >
                {isDarkMode
                  ? '지상 80층 펜트하우스의 실체 • 포식 경보 & 생체 당도 측정'
                  : '파인다이닝 오트 퀴진의 달콤한 행운과 셰프의 조언'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {drawnIds.length >= 24 && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuthorComment?.();
                }}
                className="flex items-center gap-1.5 rounded-full border border-amber-500/80 bg-amber-950/80 px-2.5 py-1 text-xs font-bold text-amber-300 shadow-md hover:bg-amber-900 transition-all cursor-pointer animate-pulse"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">제작자 코멘트</span>
              </button>
            )}

            <button
              onClick={() => setIsSoundEnabled((prev) => !prev)}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                isDarkMode
                  ? 'border-[#3D1E22] bg-[#221316] text-[#A6888B] hover:text-white'
                  : 'border-[#D5C2AF] bg-[#FFFDF9] text-[#7A695B] hover:bg-[#F2EAE0]'
              }`}
            >
              {isSoundEnabled ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 opacity-50" />
              )}
            </button>

            <button
              onClick={onClose}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                isDarkMode
                  ? 'border-[#3D1E22] bg-[#221316] text-[#A6888B] hover:bg-red-950 hover:text-white'
                  : 'border-[#D5C2AF] bg-[#FFFDF9] text-[#7A695B] hover:bg-[#6B1E29] hover:text-white'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Roulette vs History) */}
        <div
          className={`flex border-b text-xs font-semibold px-5 sm:px-6 transition-colors ${
            isDarkMode
              ? 'border-[#261014] bg-[#170E10]'
              : 'border-[#EAE0D3] bg-[#FAF5EE]'
          }`}
        >
          <button
            onClick={() => setActiveTab('roulette')}
            className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'roulette'
                ? isDarkMode
                  ? 'border-red-500 text-red-300'
                  : 'border-[#6B1E29] text-[#6B1E29]'
                : isDarkMode
                ? 'border-transparent text-[#8C7477] hover:text-white'
                : 'border-transparent text-[#7A695B] hover:text-black'
            }`}
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>{isDarkMode ? '경매 계시 룰렛' : '운세 룰렛'}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'history'
                ? isDarkMode
                  ? 'border-red-500 text-red-300'
                  : 'border-[#6B1E29] text-[#6B1E29]'
                : isDarkMode
                ? 'border-transparent text-[#8C7477] hover:text-white'
                : 'border-transparent text-[#7A695B] hover:text-black'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>
              {isDarkMode ? '수집한 밑낯 기록' : '뽑은 운세 기록'} (
              {drawnIds.length}/{activePool.length})
            </span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {resetNotice && (
            <div
              className={`mb-4 rounded-xl border p-3 text-center text-xs font-medium animate-fade-in ${
                isDarkMode
                  ? 'border-red-800/60 bg-red-950/40 text-red-200'
                  : 'border-amber-600/40 bg-amber-50 text-amber-900'
              }`}
            >
              {resetNotice}
            </div>
          )}

          {activeTab === 'roulette' ? (
            <div className="flex flex-col items-center">
              {/* Progress counter pill & Reset action */}
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2.5">
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] ${
                    isDarkMode
                      ? 'border-[#3D1A21] bg-[#1C1013] text-[#B89CA0]'
                      : 'border-[#D5C2AF] bg-[#F4EDE2] text-[#6E5D4E]'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                      isDarkMode ? 'bg-red-500' : 'bg-emerald-600'
                    }`}
                  />
                  <span>중복 방지 시스템 가동 중</span>
                  <span
                    className={`font-bold ${
                      isDarkMode ? 'text-red-400' : 'text-[#6B1E29]'
                    }`}
                  >
                    ({drawnIds.length} / {activePool.length} 수집 완료)
                  </span>
                </div>

                {/* '기록 초기화' Button */}
                <button
                  type="button"
                  onClick={handleClearHistory}
                  disabled={isSpinning || drawnIds.length === 0}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 ${
                    isDarkMode
                      ? 'border-red-800/80 bg-red-950/80 text-red-200 hover:bg-red-900 hover:border-red-600'
                      : 'border-[#C5A059] bg-[#FAF5EE] text-[#6B1E29] hover:bg-[#F2EAE0]'
                  }`}
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>기록 초기화</span>
                </button>
              </div>

              {/* ROULETTE WHEEL CONTAINER */}
              <div className="relative mb-6 flex items-center justify-center">
                {/* Top Needle Pointer */}
                <div
                  className={`absolute -top-3.5 z-20 flex flex-col items-center transition-transform duration-75 ${
                    isSpinning && tickerTick ? '-rotate-6' : 'rotate-0'
                  }`}
                >
                  <div
                    className={`h-0 w-0 border-x-[11px] border-x-transparent border-t-[22px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] ${
                      isDarkMode ? 'border-t-red-500' : 'border-t-amber-500'
                    }`}
                  />
                  <div
                    className={`h-2.5 w-2.5 rounded-full border -mt-1 shadow-xs ${
                      isDarkMode
                        ? 'bg-red-400 border-red-800'
                        : 'bg-amber-400 border-amber-700'
                    }`}
                  />
                </div>

                {/* Outer Wheel Decorative Ring */}
                <div
                  className={`relative h-64 w-64 sm:h-72 sm:w-72 rounded-full border-4 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.4)] ${
                    isDarkMode
                      ? 'border-[#8B1111] bg-[#12080A]'
                      : 'border-[#C5A059] bg-[#1E1917]'
                  }`}
                >
                  {/* Rotating SVG Wheel */}
                  <div
                    className="h-full w-full rounded-full overflow-hidden transition-transform ease-[cubic-bezier(0.12,0.8,0.28,1)]"
                    style={{
                      transform: `rotate(${rotationAngle}deg)`,
                      transitionDuration: isSpinning ? '3800ms' : '0ms',
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="h-full w-full select-none">
                      <g transform="translate(50, 50)">
                        {activeSlices.map((slice, i) => {
                          const angle = 45; // 360 / 8
                          const startAngle = (i * angle - 90) * (Math.PI / 180);
                          const endAngle = ((i + 1) * angle - 90) * (Math.PI / 180);
                          const x1 = 50 * Math.cos(startAngle);
                          const y1 = 50 * Math.sin(startAngle);
                          const x2 = 50 * Math.cos(endAngle);
                          const y2 = 50 * Math.sin(endAngle);

                          const textAngle = i * angle + angle / 2;
                          const rad = (textAngle - 90) * (Math.PI / 180);
                          const textX = 33 * Math.cos(rad);
                          const textY = 33 * Math.sin(rad);

                          return (
                            <g key={slice.id}>
                              {/* Slice Path */}
                              <path
                                d={`M 0 0 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                                fill={slice.bg}
                                stroke={isDarkMode ? '#8B1111' : '#D4AF37'}
                                strokeWidth="0.6"
                              />
                              {/* Slice Text / Icon */}
                              <g
                                transform={`translate(${textX}, ${textY}) rotate(${
                                  textAngle + 90
                                })`}
                              >
                                <text
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  fill={slice.text}
                                  fontSize="4.2"
                                  fontWeight="bold"
                                  className="font-serif-kr"
                                >
                                  {slice.icon} {slice.label.split(' ')[0]}
                                </text>
                              </g>
                            </g>
                          );
                        })}
                      </g>
                    </svg>
                  </div>

                  {/* Center Medallion / Spin Trigger */}
                  <button
                    type="button"
                    onClick={handleSpinRoulette}
                    disabled={isSpinning}
                    className={`absolute inset-0 m-auto flex h-20 w-20 sm:h-22 sm:w-22 flex-col items-center justify-center rounded-full border-3 text-white shadow-2xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-90 disabled:cursor-not-allowed cursor-pointer z-10 ${
                      isDarkMode
                        ? 'border-red-600 bg-gradient-to-b from-[#7A1010] to-[#38070C]'
                        : 'border-[#C5A059] bg-gradient-to-b from-[#6B1E29] to-[#451017]'
                    }`}
                  >
                    <span className="text-base select-none">
                      🔮
                    </span>
                    <span
                      className={`font-cinzel text-[11px] sm:text-xs font-bold tracking-widest ${
                        isDarkMode ? 'text-red-200' : 'text-amber-200'
                      }`}
                    >
                      {isSpinning ? 'SPINNING' : 'SPIN'}
                    </span>
                    <span className="text-[9px] font-serif-kr opacity-80 -mt-0.5">
                      {isSpinning ? '추첨 중...' : '돌리기'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Main Spin Action Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleSpinRoulette}
                  disabled={isSpinning}
                  className={`flex items-center gap-2.5 rounded-full border px-7 py-3.5 font-cinzel text-xs sm:text-sm font-bold tracking-widest text-white shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
                    isDarkMode
                      ? 'border-red-700 bg-[#7A1010] hover:bg-[#961414] hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                      : 'border-[#6B1E29] bg-[#6B1E29] hover:bg-[#852634] hover:shadow-[0_0_20px_rgba(197,160,89,0.35)]'
                  }`}
                >
                  <RotateCw
                    className={`h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`}
                  />
                  <span>
                    {isSpinning
                      ? isDarkMode
                        ? '살롱의 심판 바퀴를 돌리는 중...'
                        : '운명의 바퀴를 돌리는 중...'
                      : isDarkMode
                      ? '살롱 밑낯 계시 룰렛 돌리기 (SPIN)'
                      : '오늘의 운세 룰렛 돌리기 (SPIN)'}
                  </span>
                  <Sparkles
                    className={`h-4 w-4 ${
                      isDarkMode ? 'text-red-300' : 'text-amber-300'
                    }`}
                  />
                </button>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <p
                    className={`text-[11px] font-serif-kr ${
                      isDarkMode ? 'text-[#9E8588]' : 'text-[#827163]'
                    }`}
                  >
                    ※ 룰렛을 돌릴 때마다 중복 없이 새로운{' '}
                    {isDarkMode ? '살롱 밑낯 계시' : '오늘의 운세'}가 나옵니다.
                  </p>
                  {drawnIds.length > 0 && !isSpinning && (
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className={`text-[11px] underline underline-offset-2 transition-colors cursor-pointer font-medium ${
                        isDarkMode
                          ? 'text-red-400/90 hover:text-red-200'
                          : 'text-[#6B1E29]/80 hover:text-[#6B1E29]'
                      }`}
                    >
                      [기록 초기화]
                    </button>
                  )}
                </div>
              </div>

              {/* ======================================================== */}
              {/* REVEALED FORTUNE RESULT CARD                             */}
              {/* ======================================================== */}
              {currentFortune && !isSpinning && (
                <div
                  className={`mt-8 w-full animate-fade-in rounded-2xl border-2 p-5 sm:p-6 shadow-2xl ${
                    isDarkMode
                      ? 'border-[#59141E] bg-[#1A1012] text-[#E8DCD4]'
                      : 'border-[#D5C2AF] bg-[#FFFDF9] text-[#2C2724]'
                  }`}
                >
                  {/* Fortune Header Bar */}
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3.5 mb-4 ${
                      isDarkMode ? 'border-[#36161B]' : 'border-[#E8DED2]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-bold tracking-wider shadow-2xs ${currentFortune.gradeBadgeBg}`}
                      >
                        {currentFortune.grade}
                      </span>
                      <div
                        className={`flex text-xs ${
                          isDarkMode ? 'text-red-400' : 'text-amber-500'
                        }`}
                      >
                        {Array.from({ length: currentFortune.stars }).map(
                          (_, idx) => (
                            <span key={idx}>★</span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyFortune}
                        className={`flex items-center gap-1 text-[11px] font-medium cursor-pointer hover:underline ${
                          isDarkMode ? 'text-red-400' : 'text-[#6B1E29]'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">
                              복사 완료!
                            </span>
                          </>
                        ) : (
                          <>
                            <Share2 className="h-3.5 w-3.5" />
                            <span>결과 복사</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="mb-4">
                    <span
                      className={`font-cinzel text-[10px] font-bold tracking-[0.2em] uppercase block ${
                        isDarkMode ? 'text-red-400/80' : 'text-[#8C7A68]'
                      }`}
                    >
                      {isDarkMode
                        ? 'L’ENVERS DU DÉCOR • VVIP DOSSIER'
                        : 'RÉVÉLATION DU JOUR • HOROSCOPE'}
                    </span>
                    <h4
                      className={`font-cinzel text-lg sm:text-xl font-bold tracking-wide mt-0.5 ${
                        isDarkMode ? 'text-red-100' : 'text-[#1F1916]'
                      }`}
                    >
                      {currentFortune.title}
                    </h4>
                    <p
                      className={`mt-1 font-serif-kr text-xs font-semibold ${
                        isDarkMode ? 'text-rose-300' : 'text-[#6B1E29]'
                      }`}
                    >
                      “{currentFortune.summary}”
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <div
                    className={`rounded-xl border p-4 text-xs sm:text-sm font-serif-kr leading-relaxed mb-5 ${
                      isDarkMode
                        ? 'border-[#3D181F] bg-[#140C0E] text-[#D8C7C2]'
                        : 'border-[#EADBCC] bg-[#FAF6F0] text-[#4A3D31]'
                    }`}
                  >
                    {currentFortune.detail}
                  </div>

                  {/* ====================================================== */}
                  {/* MODE SPECIFIC GRIDS: LIGHT vs DARK                    */}
                  {/* ====================================================== */}
                  {!isDarkMode ? (
                    /* ---------------------------------------------------- */
                    /* [밝은 모드] 일반 오늘의 운세 상세 구성                 */
                    /* ---------------------------------------------------- */
                    <div className="space-y-4 mb-5">
                      {/* 1. General Horoscope Aspects */}
                      <div className="rounded-xl border border-[#EADBCC] bg-[#FAF8F5] p-3.5 sm:p-4 text-xs">
                        <span className="font-cinzel text-[11px] font-bold tracking-wider text-[#6B1E29] block mb-2.5 flex items-center gap-1.5">
                          <Sun className="h-3.5 w-3.5 text-amber-600" />
                          오늘의 종합 운세 지수
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div className="rounded-lg border border-[#EDE2D5] bg-white p-2.5">
                            <div className="flex items-center gap-1.5 text-[#2C2724] font-bold text-[11px] mb-1">
                              <Heart className="h-3.5 w-3.5 text-rose-500" />
                              <span>애정 & 대인운</span>
                            </div>
                            <p className="text-[11px] text-[#69584A] leading-relaxed">
                              {currentFortune.loveLuck}
                            </p>
                          </div>

                          <div className="rounded-lg border border-[#EDE2D5] bg-white p-2.5">
                            <div className="flex items-center gap-1.5 text-[#2C2724] font-bold text-[11px] mb-1">
                              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                              <span>금전 & 성과운</span>
                            </div>
                            <p className="text-[11px] text-[#69584A] leading-relaxed">
                              {currentFortune.financeLuck}
                            </p>
                          </div>

                          <div className="rounded-lg border border-[#EDE2D5] bg-white p-2.5">
                            <div className="flex items-center gap-1.5 text-[#2C2724] font-bold text-[11px] mb-1">
                              <Activity className="h-3.5 w-3.5 text-blue-600" />
                              <span>건강 & 컨디션</span>
                            </div>
                            <p className="text-[11px] text-[#69584A] leading-relaxed">
                              {currentFortune.healthLuck}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 2. Lucky Elements Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-serif-kr">
                        <div className="flex items-start gap-2.5 rounded-lg border border-[#EFE5D9] bg-white p-2.5">
                          <Coffee className="h-4 w-4 text-[#6B1E29] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#2C2724] block text-[11px]">
                              행운의 디저트 & 티
                            </span>
                            <span className="text-[#69584A]">
                              {currentFortune.luckyDessert}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-lg border border-[#EFE5D9] bg-white p-2.5">
                          <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#2C2724] block text-[11px]">
                              행운의 색상 & 숫자
                            </span>
                            <span className="text-[#69584A]">
                              {currentFortune.luckyColor} • 숫자 [
                              {currentFortune.luckyNumber}]
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-lg border border-[#EFE5D9] bg-white p-2.5">
                          <Award className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#2C2724] block text-[11px]">
                              행운의 소지품
                            </span>
                            <span className="text-[#69584A]">
                              {currentFortune.luckyItem}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-lg border border-[#EFE5D9] bg-white p-2.5">
                          <Clock className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#2C2724] block text-[11px]">
                              행운의 시간대 & 방위
                            </span>
                            <span className="text-[#69584A]">
                              {currentFortune.luckyTime} ({currentFortune.luckyDirection})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Chef's Daily Advice */}
                      <div className="border-t border-[#E8DED2] pt-3 text-center">
                        <p className="font-garamond italic text-xs text-[#8C7A68]">
                          Conseil du Chef (셰프의 다이닝 조언)
                        </p>
                        <p className="mt-1 font-serif-kr text-xs text-[#524438] font-medium">
                          {currentFortune.chefAdvice}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* ---------------------------------------------------- */
                    /* [어두운 모드] 살롱의 밑낯 상세 구성                   */
                    /* ---------------------------------------------------- */
                    <div className="space-y-4 mb-5">
                      {/* 1. Salon Underbelly Vital Metrics Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-serif-kr">
                        <div className="flex items-start gap-2.5 rounded-xl border border-red-900/50 bg-[#241114] p-3 text-red-200">
                          <Droplet className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-cinzel text-[11px] font-bold text-red-300 block">
                              예상 생체 당도 (BRIX)
                            </span>
                            <span className="text-red-100 font-semibold">
                              {currentFortune.sugarLevel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-xl border border-rose-900/50 bg-[#241114] p-3 text-rose-200">
                          <Eye className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-cinzel text-[11px] font-bold text-rose-300 block">
                              주시 중인 포식자 & 파벌
                            </span>
                            <span className="text-rose-100 font-semibold">
                              {currentFortune.predatorFactions}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-xl border border-amber-900/50 bg-[#241114] p-3 text-amber-200">
                          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-cinzel text-[11px] font-bold text-amber-300 block">
                              위험 등급 및 생존 확률
                            </span>
                            <span className="text-amber-100 font-semibold">
                              {currentFortune.dangerLevel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-xl border border-purple-900/50 bg-[#241114] p-3 text-purple-200">
                          <Skull className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-cinzel text-[11px] font-bold text-purple-300 block">
                              암시장 경매 예측 낙찰가
                            </span>
                            <span className="text-purple-100 font-semibold">
                              {currentFortune.auctionPrice}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Hidden Underbelly Truth Callout */}
                      <div className="rounded-xl border border-red-950 bg-gradient-to-r from-red-950/70 via-[#260E12] to-transparent p-4 text-xs">
                        <span className="font-cinzel text-[11px] font-bold text-red-400 flex items-center gap-1.5 mb-1.5">
                          <Flame className="h-3.5 w-3.5 text-red-500" />
                          살롱의 감춰진 밑낯 폭로 (La Vérité Cachée)
                        </span>
                        <p className="font-serif-kr text-[#D6C2BD] leading-relaxed">
                          {currentFortune.darkTruth}
                        </p>
                      </div>

                      {/* 3. Survival Directive & Forbidden Action */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        <div className="rounded-xl border border-amber-900/60 bg-[#1F1513] p-3 text-amber-200/90">
                          <span className="font-cinzel text-[11px] font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                            <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                            오늘의 생존 지침 (Règle de Survie)
                          </span>
                          <p className="font-serif-kr text-[11px] leading-relaxed text-[#DFCEB8]">
                            {currentFortune.survivalRule}
                          </p>
                        </div>

                        <div className="rounded-xl border border-rose-900/60 bg-[#1F1214] p-3 text-rose-200/90">
                          <span className="font-cinzel text-[11px] font-bold text-rose-400 flex items-center gap-1.5 mb-1">
                            <Ban className="h-3.5 w-3.5 text-rose-500" />
                            절대 금기 행동 (Interdit Absolu)
                          </span>
                          <p className="font-serif-kr text-[11px] leading-relaxed text-[#E5C9C8]">
                            {currentFortune.forbiddenAction}
                          </p>
                        </div>
                      </div>

                      {/* 4. Curator's Chilling Warning */}
                      <div className="border-t border-[#36161B] pt-3 text-center">
                        <p className="font-garamond italic text-xs text-red-400/80">
                          L'Avertissement Glacé (살롱 큐레이터의 서늘한 경고)
                        </p>
                        <p className="mt-1 font-serif-kr text-xs text-red-200 font-semibold">
                          {currentFortune.curatorWarning}
                        </p>
                      </div>
                    </div>
                  )}

                  {drawnIds.length >= 24 && !isSpinning && (
                    <div className="mt-4 pt-3 border-t border-amber-900/40 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAuthorComment?.();
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/80 bg-gradient-to-r from-amber-950/90 via-[#2E1A22] to-amber-950/90 px-4 py-2.5 text-xs font-bold text-amber-200 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer shadow-lg"
                      >
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        <span>24개 전권 수집 완료! 제작자 코멘터리 보러가기</span>
                        <Sparkles className="h-4 w-4 text-amber-400" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* TAB 2: HISTORY VIEW                                      */
            /* ======================================================== */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4
                    className={`font-cinzel text-base font-bold ${
                      isDarkMode ? 'text-red-200' : 'text-[#1F1916]'
                    }`}
                  >
                    {isDarkMode
                      ? '수집한 살롱 밑낯 계시록'
                      : '수집한 오늘의 운세 모음'}
                  </h4>
                  <p
                    className={`text-xs ${
                      isDarkMode ? 'text-red-300/70' : 'text-[#7A695B]'
                    }`}
                  >
                    지금까지 중복 없이 확인한 기록입니다. ({drawnIds.length} /{' '}
                    {activePool.length})
                  </p>
                </div>
                {drawnIds.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                      isDarkMode
                        ? 'border-red-800/80 bg-red-950/80 text-red-200 hover:bg-red-900 hover:border-red-600'
                        : 'border-[#C5A059] bg-[#FAF5EE] text-[#6B1E29] hover:bg-[#F2EAE0]'
                    }`}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>기록 초기화</span>
                  </button>
                )}
              </div>

              {drawnIds.length >= 24 && (
                <div className="rounded-xl border border-amber-500/80 bg-gradient-to-r from-amber-950/80 via-[#2B1B18] to-amber-950/80 p-4 text-center shadow-lg animate-fade-in">
                  <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm mb-1">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>24개 전권 수집 완료! 제작자 코멘터리 해금</span>
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                  <p className="text-xs text-amber-200/90 mb-3 font-serif-kr">
                    축하합니다! 살롱의 모든 운세와 계시록 24개를 중복 없이 모두 수집하셨습니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuthorComment?.();
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-2 text-xs font-bold text-black hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    <span>📜 제작자 코멘터리 열람하기</span>
                  </button>
                </div>
              )}

              {drawnIds.length === 0 ? (
                <div
                  className={`rounded-2xl border border-dashed p-10 text-center text-xs ${
                    isDarkMode
                      ? 'border-[#3D1E22] text-[#8C7477]'
                      : 'border-[#D5C2AF] text-[#8C7A68]'
                  }`}
                >
                  <RotateCw className="mx-auto h-8 w-8 opacity-40 mb-2" />
                  <span>아직 수집한 기록이 없습니다. 룰렛을 돌려보세요!</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {drawnIds
                    .slice()
                    .reverse()
                    .map((id, index) => {
                      const item = activePool.find((f) => f.id === id);
                      if (!item) return null;
                      return (
                        <div
                          key={`${id}-${index}`}
                          onClick={() => {
                            setCurrentFortune(item);
                            setActiveTab('roulette');
                          }}
                          className={`flex items-start justify-between rounded-xl border p-3.5 transition-all hover:scale-[1.01] cursor-pointer ${
                            isDarkMode
                              ? 'border-[#3D181F] bg-[#1B1012] hover:border-red-600'
                              : 'border-[#EAE0D3] bg-[#FAF8F5] hover:border-[#6B1E29]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded px-2 py-0.5 text-[10px] font-bold border ${item.gradeBadgeBg}`}
                              >
                                {item.grade}
                              </span>
                              <span
                                className={`text-[10px] ${
                                  isDarkMode ? 'text-red-400' : 'text-amber-500'
                                }`}
                              >
                                {'★'.repeat(item.stars)}
                              </span>
                            </div>
                            <h5 className="font-cinzel text-xs font-bold mt-1">
                              {item.title}
                            </h5>
                            <p
                              className={`text-[11px] font-serif-kr line-clamp-1 mt-0.5 ${
                                isDarkMode ? 'text-red-300/80' : 'text-[#705E51]'
                              }`}
                            >
                              {item.summary}
                            </p>
                          </div>
                          <span
                            className={`text-[11px] font-cinzel shrink-0 ml-2 ${
                              isDarkMode ? 'text-red-400' : 'text-[#6B1E29]'
                            }`}
                          >
                            상세보기 →
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div
          className={`flex items-center justify-between border-t px-6 py-3.5 text-xs shrink-0 ${
            isDarkMode
              ? 'border-[#261014] bg-[#170E10] text-[#8C7477]'
              : 'border-[#EAE0D3] bg-[#F4EDE2] text-[#78695B]'
          }`}
        >
          <span className="font-cinzel tracking-wider text-[11px]">
            {isDarkMode
              ? 'SALON GLACÉ • L’ENVERS DU SALON EXCLUSIF'
              : 'SALON GLACÉ • HAUTE GASTRONOMIE'}
          </span>
          <button
            onClick={onClose}
            className={`rounded-lg px-4 py-1.5 font-medium transition-colors ${
              isDarkMode
                ? 'bg-[#291216] text-red-300 hover:bg-red-950'
                : 'bg-[#EAE0D3] text-[#4A3D31] hover:bg-[#D5C2AF]'
            }`}
          >
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
