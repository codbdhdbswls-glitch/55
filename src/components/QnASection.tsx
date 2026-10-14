import React, { useState } from 'react';
import { QNA_LIST } from '../data/salonData';
import { ChevronDown, HelpCircle, BookOpenCheck, Sparkles, Coffee } from 'lucide-react';

interface QnASectionProps {
  isReserved?: boolean;
}

export const QnASection: React.FC<QnASectionProps> = ({ isReserved = false }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'why-rabbit': true,
    'fully-baked-logic': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    QNA_LIST.forEach((item) => {
      all[item.id] = true;
    });
    setOpenItems(all);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  return (
    <section
      id="qna"
      className={`py-20 sm:py-28 border-b transition-colors duration-700 ${
        isReserved
          ? 'border-[#2D2622] bg-[#141110] text-[#E0D8D0]'
          : 'border-[#E8E0D5] bg-[#F7F4EE] text-[#2C2724]'
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span
            className={`font-cinzel text-xs font-semibold tracking-[0.25em] uppercase ${
              isReserved ? 'text-amber-500/80' : 'text-[#8C7D6E]'
            }`}
          >
            Chapitre IV : Questions et Élucidations
          </span>
          <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wider sm:text-4xl">
            살롱 심층 질의응답 (Q&A)
          </h2>
          <p
            className={`mt-3 font-serif-kr text-sm sm:text-base ${
              isReserved ? 'text-[#9E9083]' : 'text-[#5C5349]'
            }`}
          >
            살롱 《 GLACÉ 》의 잔혹하고 우아한 미학과 은어 체계에 얽힌 진실들.
          </p>
          <div
            className={`mx-auto mt-4 h-[1px] w-20 ${
              isReserved ? 'bg-amber-600/40' : 'bg-[#D9CDBC]'
            }`}
          />
        </div>

        {/* Global Expand/Collapse controls */}
        <div className="mt-8 flex justify-end gap-2 text-xs font-medium">
          <button
            onClick={expandAll}
            className={`rounded-md border px-3 py-1.5 transition-colors ${
              isReserved
                ? 'border-[#332A24] bg-[#1D1816] text-[#C4B7AA] hover:bg-[#28211E]'
                : 'border-[#D5C7B4] bg-[#FAF8F5] text-[#5A4D40] hover:bg-[#F2ECE1]'
            }`}
          >
            모두 펼치기
          </button>
          <button
            onClick={collapseAll}
            className={`rounded-md border px-3 py-1.5 transition-colors ${
              isReserved
                ? 'border-[#332A24] bg-[#1D1816] text-[#C4B7AA] hover:bg-[#28211E]'
                : 'border-[#D5C7B4] bg-[#FAF8F5] text-[#5A4D40] hover:bg-[#F2ECE1]'
            }`}
          >
            모두 접기
          </button>
        </div>

        {/* Q&A Accordion Items */}
        <div className="mt-4 space-y-4">
          {QNA_LIST.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-xl border shadow-2xs transition-all ${
                  isReserved
                    ? 'border-[#2D2622] bg-[#1A1614]'
                    : 'border-[#D8CEBE] bg-[#FCFAF7]'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`flex w-full items-center justify-between p-5 text-left transition-colors focus:outline-none ${
                    isReserved ? 'hover:bg-[#221C1A]' : 'hover:bg-[#F8F4EC]'
                  }`}
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-semibold font-cinzel uppercase ${
                          isReserved
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                            : 'bg-[#EFE7DC] text-[#786756]'
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="font-garamond text-xs italic opacity-60">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif-kr text-base font-bold sm:text-lg">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform ${
                      isOpen
                        ? isReserved
                          ? 'rotate-180 bg-amber-600 text-white border-amber-500'
                          : 'rotate-180 bg-[#29221D] text-[#FAF8F5]'
                        : isReserved
                        ? 'border-[#332A24] bg-[#221C19] text-[#A6978A]'
                        : 'border-[#D9CDBC] bg-[#FAF7F2] text-[#5C4F42]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`border-t px-6 py-5 text-sm leading-relaxed ${
                      isReserved
                        ? 'border-[#2D2622] bg-[#171312] text-[#C4B7AA]'
                        : 'border-[#EAE0D3] bg-[#FAF7F2] text-[#4A4036]'
                    }`}
                  >
                    <div className="space-y-3 font-serif-kr">
                      {item.answerParagraphs.map((p, idx) => (
                        <p key={idx} className="text-xs sm:text-sm leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Key Takeaway Badge */}
                    <div
                      className={`mt-5 flex items-start gap-2 rounded-lg border p-3 text-xs ${
                        isReserved
                          ? 'border-amber-900/60 bg-[#221B17] text-amber-200'
                          : 'border-[#DECDBB] bg-[#F3EBE0] text-[#5D4A39]'
                      }`}
                    >
                      <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-amber-400">핵심 요약: </strong>
                        <span>{item.keyTakeaway}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
