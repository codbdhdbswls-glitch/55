import React from 'react';
import { SALON_META } from '../data/salonData';

interface FooterProps {
  isReserved?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isReserved = false }) => {
  return (
    <footer
      className={`border-t py-14 text-center text-xs transition-colors duration-700 ${
        isReserved
          ? 'border-[#2D2622] bg-[#0E0C0B] text-[#8C7E72]'
          : 'border-[#E8E0D5] bg-[#F4EFE9] text-[#6B5E52]'
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Crest */}
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border shadow-xs overflow-hidden ${
            isReserved
              ? 'border-[#332A24] bg-[#1A1614] p-0.5'
              : 'border-[#D5C6B4] bg-[#FAF8F5]'
          }`}
        >
          {isReserved ? (
            <img
              src="https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/ChatGPT%20Image%202026%EB%85%84%209%EC%9B%94%2023%EC%9D%BC%20%EC%98%A4%EC%A0%84%2012_09_18.png"
              alt="Salon Logo"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <span
              className="font-cinzel text-xl font-bold text-[#6B1E29]"
            >
              G
            </span>
          )}
        </div>

        <div>
          <h4 className="font-cinzel text-lg font-bold tracking-[0.25em]">
            {SALON_META.name}
          </h4>
          <p className="font-garamond text-xs italic tracking-wider opacity-75">
            {SALON_META.title}
          </p>
        </div>

        <div
          className={`mx-auto max-w-lg border-t pt-6 text-[11px] leading-relaxed ${
            isReserved ? 'border-[#241E1A] text-[#73665C]' : 'border-[#E2D5C4] text-[#877869]'
          }`}
        >
          본 살롱의 모든 식재료는 신선도를 유지하고 있습니다.
          <br />
          “가장 순수한 토끼 고기의 신선도가 정점을 찍는 순간, 은제 나이프가 올라갑니다.”
        </div>

        <p className="font-cinzel text-[10px] tracking-widest opacity-50">
          © SALON GLACÉ PRIVATE AUCTION HOUSE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};
