import React, { useState } from 'react';
import { BookOpen, Thermometer, ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';
import { SALON_META } from '../data/salonData';

interface NavbarProps {
  onOpenGlossary: () => void;
  activeSection: string;
  isReserved: boolean;
  onToggleTheme: () => void;
  lightModeTab: 'reservation' | 'philosophy' | 'menu';
  onSelectLightTab: (tab: 'reservation' | 'philosophy' | 'menu') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGlossary,
  activeSection,
  isReserved,
  onToggleTheme,
  lightModeTab,
  onSelectLightTab,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const darkNavItems = [
    { id: 'hero', label: '살롱 안내', en: 'Accueil' },
    { id: 'worldview', label: '세계관 & 기원', en: 'L’Origine' },
    { id: 'reservation-and-profiles', label: '살롱 참석자 명부', en: 'Personnages' },
    { id: 'factions', label: '미식가 파벌', en: 'Les Connaisseurs' },
    { id: 'qna', label: '심층 Q&A', en: 'Questions' },
  ];

  const lightNavItems: Array<{
    tab: 'reservation' | 'philosophy' | 'menu';
    label: string;
    en: string;
  }> = [
    { tab: 'reservation', label: '예약하기', en: 'Réservation' },
    { tab: 'philosophy', label: '다이닝 철학', en: 'Philosophie' },
    { tab: 'menu', label: '셰프 다이닝 코스', en: 'Menu Dégustation' },
  ];

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLightTabClick = (tab: 'reservation' | 'philosophy' | 'menu') => {
    setIsMobileMenuOpen(false);
    onSelectLightTab(tab);
  };

  const handleToggleThemeClick = () => {
    setIsMobileMenuOpen(false);
    onToggleTheme();
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-700 ${
        isReserved
          ? 'border-[#2D2622] bg-[#12100F]/95 text-[#E0D8D0]'
          : 'border-[#E8E0D5] bg-[#FAF8F5]/95 text-[#2C2724]'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* Salon Logo - Click 'GLACÉ' to toggle Dark / Secret Salon mode */}
        <button
          onClick={handleToggleThemeClick}
          aria-label={isReserved ? 'Back (밝은 모드로 돌아가기)' : 'Skip (비밀 살롱 어두운 모드로 가기)'}
          className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none cursor-pointer shrink-0"
        >
          <div
            className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border shadow-sm transition-transform group-hover:scale-110 overflow-hidden ${
              isReserved
                ? 'border-amber-500/50 bg-[#1E1A18] shadow-[0_0_12px_rgba(245,158,11,0.2)] p-0.5'
                : 'border-[#6B1E29]/40 bg-[#F4EFEB] group-hover:border-[#6B1E29]'
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
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-widest text-[#6B1E29]">
                G
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                data-text={SALON_META.name}
                className={`font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] sm:tracking-[0.25em] transition-colors ${
                  isReserved
                    ? 'glitch-hover-active'
                    : 'group-hover:text-amber-500'
                }`}
              >
                {SALON_META.name}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] tracking-wider font-garamond italic text-[#8A7E72] hidden xs:block">
              Le Salon Privé des Anges & des Ducs
            </p>
          </div>
        </button>

        {/* Center Nav Links - Desktop Only (hidden md:flex prevents text cut-off on mobile) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {/* DARK MODE NAVIGATION */}
          {isReserved ? (
            darkNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group relative px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium tracking-wide transition-colors ${
                  activeSection === item.id
                    ? 'text-amber-400 font-semibold'
                    : 'text-[#A09386] hover:text-[#FAF8F5]'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{item.label}</span>
                  <span className="font-garamond text-[9px] italic tracking-wider opacity-60 hidden sm:inline">
                    {item.en}
                  </span>
                </div>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 bg-amber-400" />
                )}
              </button>
            ))
          ) : (
            /* LIGHT MODE NAVIGATION (Default: 예약하기, 다이닝 철학, 셰프 다이닝 코스) */
            lightNavItems.map((item) => {
              const isActive = lightModeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => onSelectLightTab(item.tab)}
                  className={`group relative px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium tracking-wide transition-all rounded-lg cursor-pointer ${
                    isActive
                      ? 'bg-[#6B1E29] text-white shadow-xs font-semibold'
                      : 'text-[#5C534A] hover:bg-[#F2ECE3] hover:text-[#1F1916]'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{item.label}</span>
                    <span
                      className={`font-garamond text-[9px] italic tracking-wider hidden sm:inline ${
                        isActive ? 'text-amber-200 opacity-90' : 'opacity-60'
                      }`}
                    >
                      {item.en}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </nav>

        {/* Right Info Badges & Mode Switch Button + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Skip / Back Button */}
          <button
            onClick={handleToggleThemeClick}
            className={`group flex items-center gap-1.5 rounded-full border px-3 sm:px-3.5 py-1.5 text-xs transition-all cursor-pointer ${
              isReserved
                ? 'border-amber-700/60 bg-[#251F1C] text-amber-300 hover:bg-amber-950 hover:border-amber-500 shadow-sm'
                : 'border-[#6B1E29]/40 bg-[#FAF5EE] text-[#6B1E29] hover:bg-[#6B1E29] hover:text-white shadow-xs'
            }`}
            aria-label={isReserved ? 'Back (밝은 모드로 돌아가기)' : 'Skip (비밀 살롱 어두운 모드로 가기)'}
          >
            {isReserved ? (
              <>
                <ArrowLeft className="h-3.5 w-3.5 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-cinzel text-xs font-bold tracking-wider">Back</span>
              </>
            ) : (
              <>
                <span className="font-cinzel text-xs font-bold tracking-wider">Skip</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#6B1E29] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </>
            )}
          </button>

          {/* Temperature Badge - Desktop only */}
          <div
            className={`hidden lg:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${
              isReserved
                ? 'border-[#332A25] bg-[#1E1917] text-[#C4B7AA]'
                : 'border-[#E2D6C6] bg-[#F6F1EA] text-[#524941]'
            }`}
          >
            <Thermometer className={`h-3.5 w-3.5 ${isReserved ? 'text-red-500' : 'text-[#3B82F6]'}`} />
            <span className="font-medium tracking-wider">살롱 온도</span>
            <span className={`font-bold ${isReserved ? 'text-red-500' : 'text-[#60A5FA]'}`}>18.0°C</span>
          </div>

          {/* Quick Glossary Drawer Trigger (Only in Dark/Reserved mode on desktop) */}
          {isReserved && (
            <button
              onClick={onOpenGlossary}
              className="hidden sm:flex items-center gap-2 rounded-full border border-amber-900/60 bg-[#241E1B] px-3.5 py-1.5 text-xs font-medium text-amber-300 transition-all shadow-xs hover:bg-amber-950/80 hover:text-amber-200 cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="tracking-wider">은어 사전</span>
            </button>
          )}

          {/* Mobile Menu List Button (ONLY ON MOBILE: md:hidden) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="목록 메뉴 열기"
            className={`md:hidden flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-xl border transition-all cursor-pointer ${
              isReserved
                ? 'border-[#443831] bg-[#221B18] text-[#E0D8D0] hover:bg-[#302622] hover:text-white'
                : 'border-[#D5C4B0] bg-[#FAF5EE] text-[#2C2724] hover:bg-[#F2ECE3]'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel (ONLY ON MOBILE: md:hidden) */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 py-3.5 shadow-xl transition-all animate-fade-in ${
            isReserved
              ? 'border-[#2D2622] bg-[#141110] text-[#E0D8D0]'
              : 'border-[#E8E0D5] bg-[#FAF8F5] text-[#2C2724]'
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {/* DARK MODE MOBILE MENU */}
            {isReserved ? (
              <>
                <div className="px-2 py-1 text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-amber-500/80">
                  Salon Navigation • 살롱 목차
                </div>
                {darkNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all text-left ${
                      activeSection === item.id
                        ? 'bg-amber-950/40 text-amber-300 border border-amber-800/50 font-semibold'
                        : 'text-[#C9BDB0] hover:bg-[#201A18] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-garamond text-[11px] italic text-[#8F8174]">
                      {item.en}
                    </span>
                  </button>
                ))}

                {/* Mobile Glossary Button in Dark Mode */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenGlossary();
                  }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-amber-800/60 bg-amber-950/30 px-3.5 py-2.5 text-xs font-medium text-amber-300 hover:bg-amber-900/50 transition-all"
                >
                  <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                  <span>살롱 은어 사전 열람하기</span>
                </button>
              </>
            ) : (
              /* LIGHT MODE MOBILE MENU */
              <>
                <div className="px-2 py-1 text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#8C7A68]">
                  Menu • 다이닝 메뉴 안내
                </div>
                {lightNavItems.map((item) => {
                  const isActive = lightModeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleLightTabClick(item.tab)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all text-left ${
                        isActive
                          ? 'bg-[#6B1E29] text-white font-semibold shadow-xs'
                          : 'text-[#4A3E34] hover:bg-[#F2ECE3] hover:text-[#1F1916]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`font-garamond text-[11px] italic ${
                          isActive ? 'text-amber-200' : 'text-[#8A7D71]'
                        }`}
                      >
                        {item.en}
                      </span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
