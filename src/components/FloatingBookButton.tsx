import React, { useState } from 'react';
import { BookMarked, Sparkles } from 'lucide-react';

interface FloatingBookButtonProps {
  onClick: () => void;
  isReserved?: boolean;
}

export const FloatingBookButton: React.FC<FloatingBookButtonProps> = ({
  onClick,
  isReserved = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {isHovered && (
        <div
          className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-semibold shadow-lg animate-fade-in ${
            isReserved
              ? 'border-amber-700/60 bg-[#1E1916] text-[#E0D5C7]'
              : 'border-[#D5C2AE] bg-[#FAF7F2] text-[#483B2F]'
          }`}
        >
          <Sparkles className={`h-3 w-3 ${isReserved ? 'text-amber-400' : 'text-[#6B1E29]'}`} />
          <span>{isReserved ? '살롱 GLACÉ 비밀 은어 사전' : '살롱 GLACÉ 다이닝 용어집'}</span>
        </div>
      )}

      {/* Floating Book Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none ${
          isReserved
            ? 'border-amber-600/70 bg-[#1F1714] text-amber-400 hover:border-amber-400 hover:bg-amber-950 hover:text-amber-200'
            : 'border-[#D5C2AF] bg-[#FAF7F2] text-[#6B1E29] hover:border-[#6B1E29] hover:bg-[#6B1E29] hover:text-[#FAF8F5]'
        }`}
        aria-label="살롱 전용 은어 사전 열기"
      >
        {/* Soft pulse glow ring */}
        <span
          className={`absolute -inset-1 rounded-full opacity-40 blur-xs transition-opacity group-hover:opacity-75 ${
            isReserved ? 'bg-amber-600/30' : 'bg-[#E5D5C2]'
          }`}
        />

        <BookMarked className="relative h-6 w-6 transition-transform group-hover:rotate-6" />

        {/* Small badge chip indicator */}
        <span
          className={`absolute top-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ${
            isReserved
              ? 'bg-amber-500 ring-[#171413]'
              : 'bg-[#6B1E29] ring-[#FAF8F5]'
          }`}
        />
      </button>
    </div>
  );
};
