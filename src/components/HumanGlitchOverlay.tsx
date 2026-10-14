import React, { useEffect, useRef } from 'react';

interface HumanGlitchOverlayProps {
  isOpen: boolean;
  onProceedToDarkSalon: () => void;
  onClose: () => void;
}

export const HumanGlitchOverlay: React.FC<HumanGlitchOverlayProps> = ({
  isOpen,
  onProceedToDarkSalon,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Render TV static noise overlay
    const renderNoise = () => {
      const imgData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imgData.data.buffer);
      const len = buffer.length;

      for (let i = 0; i < len; i++) {
        // Red tinted static noise with occasional black glitch cuts
        if (Math.random() < 0.15) {
          // Deep red noise
          buffer[i] = 0xff000088;
        } else if (Math.random() < 0.08) {
          // Bright white flash noise
          buffer[i] = 0xffffffff;
        } else {
          // Dark glitch scanline
          const gray = (Math.random() * 45) | 0;
          buffer[i] = (0xff << 24) | (gray << 16) | (gray << 8) | gray;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Random horizontal red slice bars (glitch displacement)
      const glitchBarCount = Math.floor(Math.random() * 5);
      for (let b = 0; b < glitchBarCount; b++) {
        const barY = Math.random() * height;
        const barH = Math.random() * 30 + 4;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(220, 20, 30, 0.4)' : 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, barY, width, barH);
      }

      animationFrameId = requestAnimationFrame(renderNoise);
    };

    renderNoise();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      {/* Dynamic Static Canvas Noise */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-65 pointer-events-none mix-blend-screen"
      />

      {/* Vignette & Blood CRT Scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_90%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px]" />

      {/* Glitch Shake Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center animate-pulse">
        {/* Subtitle Whisper */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-600/50 bg-red-950/80 px-4 py-1.5 text-xs tracking-[0.3em] text-red-300 uppercase shadow-lg">
          <span>ALERTE DE SALON • CONTAMINATION DÉTECTÉE</span>
        </div>

        {/* GIANT RED TEXT '인간?' */}
        <div className="relative py-6">
          {/* Shadow Glitch Layer 1 (Red Cyan Chromatic) */}
          <h1
            className="absolute inset-0 font-cinzel text-7xl sm:text-9xl md:text-[14rem] lg:text-[18rem] font-extrabold tracking-tighter text-red-700 opacity-60 blur-xs -translate-x-3 translate-y-1 select-none pointer-events-none"
            style={{ textShadow: '0 0 30px #ff0000' }}
          >
            인간?
          </h1>
          {/* Shadow Glitch Layer 2 (Black Offset) */}
          <h1
            className="absolute inset-0 font-cinzel text-7xl sm:text-9xl md:text-[14rem] lg:text-[18rem] font-extrabold tracking-tighter text-black opacity-80 translate-x-2 -translate-y-2 select-none pointer-events-none"
          >
            인간?
          </h1>
          {/* Main Giant Glowing Red Text */}
          <h1
            className="relative font-cinzel text-7xl sm:text-9xl md:text-[14rem] lg:text-[18rem] font-black tracking-tighter text-[#FF1E27] drop-shadow-[0_0_50px_rgba(255,0,0,0.9)] animate-bounce select-none"
            style={{
              textShadow: '0 0 40px #ff0033, 0 0 80px #990011, 0 0 120px #ff0000',
            }}
          >
            인간?
          </h1>
        </div>

        {/* Eerie Lore Dialogue */}
        <div className="max-w-2xl mt-4 space-y-2 font-serif-kr text-sm sm:text-base text-red-200/90 leading-relaxed drop-shadow-md">
          <p className="font-bold text-red-400 tracking-wider text-base sm:text-lg">
            “...누가 이 거룩한 살롱에 제 발로 걸어 들어온 거지?”
          </p>
          <p className="opacity-80 text-xs sm:text-sm">
            순백의 유리관과 은빛 식기가 차갑게 진동합니다.
            <br />
            천사들과 미식가들이 당신의 당도 높은 체향을 감지하고 숨을 멈추었습니다.
          </p>
        </div>

        {/* Action Buttons to Enter Dark Salon */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={onProceedToDarkSalon}
            className="w-full sm:w-auto rounded-xl border-2 border-red-500 bg-red-950/90 px-8 py-3.5 font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-white shadow-[0_0_25px_rgba(255,0,0,0.5)] transition-all hover:bg-red-900 hover:border-red-400 hover:scale-105 active:scale-95 cursor-pointer"
          >
            비밀 살롱의 이면으로 입장하기 (ENTRÉE)
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-red-900/60 bg-black/60 px-6 py-3 font-cinzel text-xs tracking-wider text-red-300 hover:bg-red-950/40 hover:text-white transition-all cursor-pointer"
          >
            창 닫기 (FERMER)
          </button>
        </div>
      </div>
    </div>
  );
};
