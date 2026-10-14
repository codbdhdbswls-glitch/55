import React, { useState } from 'react';
import { GLOSSARY, SALON_RULES } from '../data/salonData';
import { GlossaryItem } from '../types';
import { BookOpen, X, Search, Quote, Bookmark, Sparkles } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ingredients' | 'conditions' | 'rules'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  // Filter glossary items
  const filteredItems = GLOSSARY.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.frenchOrEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exampleSentence.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-[#1A1614]/60">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Lexicon / Book Container */}
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border-2 border-[#D5C2AF] bg-[#FAF7F2] shadow-2xl">
        {/* Book Header with Gold Accent */}
        <div className="flex items-center justify-between border-b border-[#E5DACD] bg-[#F3ECE1] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CDBBA7] bg-[#EBE2D5] shadow-xs">
              <BookOpen className="h-5 w-5 text-[#6B1E29]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-base font-bold tracking-widest text-[#241E1A] sm:text-lg">
                  GLOSSAIRE DU SALON GLACÉ
                </span>
                <span className="rounded bg-[#6B1E29] px-2 py-0.5 text-[10px] font-semibold text-[#FAF8F5]">
                  대외비
                </span>
              </div>
              <p className="text-xs font-serif-kr text-[#78695A]">
                살롱 《 GLACÉ 》 전용 은어 사전 — 신체 부위 및 상태 제과 용어
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D5C7B4] bg-[#FAF8F5] text-[#5C4F42] transition-colors hover:bg-[#6B1E29] hover:text-[#FAF8F5]"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="border-b border-[#E8DFCFA] bg-[#FAF7F2] px-6 py-3.5 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C7A68]" />
            <input
              type="text"
              placeholder="은어 명칭, 불어 표기, 의미 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-[#D9CDBC] bg-[#FAF8F5] py-2 pl-10 pr-4 text-xs text-[#2A231C] placeholder-[#9E8E7E] focus:border-[#6B1E29] focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A68] hover:text-[#2A231C]"
              >
                지우기
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#29221D] text-[#FAF8F5]'
                  : 'bg-[#F0E9DF] text-[#695C4E] hover:bg-[#E6DCCF]'
              }`}
            >
              전체 ({GLOSSARY.length})
            </button>
            <button
              onClick={() => setActiveCategory('ingredients')}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${
                activeCategory === 'ingredients'
                  ? 'bg-[#29221D] text-[#FAF8F5]'
                  : 'bg-[#F0E9DF] text-[#695C4E] hover:bg-[#E6DCCF]'
              }`}
            >
              1. 신체 및 부위 (Ingredients)
            </button>
            <button
              onClick={() => setActiveCategory('conditions')}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${
                activeCategory === 'conditions'
                  ? 'bg-[#29221D] text-[#FAF8F5]'
                  : 'bg-[#F0E9DF] text-[#695C4E] hover:bg-[#E6DCCF]'
              }`}
            >
              2. 상태 및 행동 (Conditions)
            </button>
          </div>
        </div>

        {/* Glossary Item Cards Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Salon Absolute Speech Code Banner */}
          <div className="rounded-xl border border-[#D9C4B0] bg-[#FAF0E4] p-3 text-xs leading-relaxed text-[#6B503B]">
            <strong className="font-semibold text-[#4A3423] block mb-1">
              살롱 내 언어 규율 고지:
            </strong>
            본 살롱에서는 '식인'이라는 야만적 단어가 금지되며 <strong>'시식'</strong>, 비명은 <strong>'탄산감'</strong>, 눈물과 땀은 <strong>'추출액'</strong>으로 치환하여 품격을 유지합니다.
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8A7968]">
              일치하는 은어가 존재하지 않습니다.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#E2D6C6] bg-[#FCFAF7] p-4 shadow-2xs hover:border-[#C4B29E] transition-colors"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#EDE3D6] pb-2 mb-2">
                  <div>
                    <h4 className="font-serif-kr text-base font-bold text-[#231B17]">
                      {item.term}
                    </h4>
                    <span className="font-garamond text-xs italic text-[#7E6E5F]">
                      {item.frenchOrEnglish}
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider font-cinzel ${
                      item.category === 'ingredients'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}
                  >
                    {item.category === 'ingredients' ? 'INGREDIENT' : 'CONDITION'}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[#4A3F36]">
                  {item.meaning}
                </p>

                {item.contextNote && (
                  <p className="mt-2 text-[11px] leading-relaxed text-[#756250] bg-[#F5EDE1] p-2 rounded-md">
                    <strong>배경 주석:</strong> {item.contextNote}
                  </p>
                )}

                {/* Example sentence */}
                <div className="mt-3 rounded-lg border-l-2 border-[#6B1E29] bg-[#FAF5F2] py-2 px-3 text-xs italic text-[#59493E]">
                  <Quote className="inline h-3 w-3 mr-1 text-[#8C6F5A]" />
                  {item.exampleSentence}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Book Footer */}
        <div className="flex items-center justify-between border-t border-[#E5DACD] bg-[#F3ECE1] px-6 py-3 text-xs text-[#78695B]">
          <span>살롱 《 GLACÉ 》 VVIP 에티켓 규범집 제3조</span>
          <button
            onClick={onClose}
            className="font-medium text-[#6B1E29] hover:underline"
          >
            사전 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
