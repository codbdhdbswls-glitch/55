/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RestaurantMenuSection } from './components/RestaurantMenuSection';
import { WorldviewSection } from './components/WorldviewSection';
import { FactionsSection } from './components/FactionsSection';
import { ReservationSection } from './components/ReservationSection';
import { ReservationModal } from './components/ReservationModal';
import { QnASection } from './components/QnASection';
import { GlossaryModal } from './components/GlossaryModal';
import { FloatingBookButton } from './components/FloatingBookButton';
import { Footer } from './components/Footer';
import { HumanGlitchOverlay } from './components/HumanGlitchOverlay';
import { SalonFortuneModal } from './components/SalonFortuneModal';
import { AuthorCommentModal } from './components/AuthorCommentModal';

export default function App() {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false);
  const [isAuthorCommentOpen, setIsAuthorCommentOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [reservationData, setReservationData] = useState<any | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Light Mode Navigation: Default to 'reservation' (only reservation window shown initially)
  const [lightModeTab, setLightModeTab] = useState<'reservation' | 'philosophy' | 'menu'>('reservation');

  // Easter Egg: '인간' detected in Name or Special Request
  const [isHumanGlitchOpen, setIsHumanGlitchOpen] = useState(false);

  // Track active section on scroll for navbar highlighting in Dark Mode
  useEffect(() => {
    if (!isReserved) return;

    const handleScroll = () => {
      const sections = ['hero', 'worldview', 'reservation-and-profiles', 'factions', 'qna'];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReserved]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCompleteReservation = (data: any) => {
    setReservationData(data);
    setIsReserved(true);
    setIsReservationModalOpen(false);

    // Smooth scroll to the newly revealed salon content (살롱 안내)
    setTimeout(() => {
      scrollToSection('hero');
    }, 250);
  };

  const handleCancelReservation = () => {
    setIsReserved(false);
    setReservationData(null);
    setLightModeTab('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setIsReserved((prev) => !prev);
    if (isReserved) {
      // Switching from Dark to Light: set to default reservation view
      setLightModeTab('reservation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => scrollToSection('hero'), 100);
    }
  };

  const handleTriggerHumanGlitch = () => {
    setIsHumanGlitchOpen(true);
  };

  const handleProceedToDarkSalonFromGlitch = () => {
    setIsHumanGlitchOpen(false);
    setIsReserved(true);
    setReservationData({
      guestName: '인간 (경계 대상)',
      gender: '무성/비공개',
      partySize: '1인 (단독 예약)',
      timeSlot: '22:00',
      specialRequest: '인간',
      confirmedAt: new Date().toLocaleTimeString(),
    });
    setTimeout(() => {
      scrollToSection('hero');
    }, 300);
  };

  return (
    <div
      className={`min-h-screen font-serif-kr transition-colors duration-700 ${
        isReserved
          ? 'bg-[#0E0C0B] text-[#DED5CA] selection:bg-[#3D3025] selection:text-[#FAF8F5]'
          : 'bg-[#FAF8F5] text-[#2C2724] selection:bg-[#E8DDD0] selection:text-[#1F1916]'
      }`}
    >
      {/* Top Haute Cuisine Navbar */}
      <Navbar
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        activeSection={activeSection}
        isReserved={isReserved}
        onToggleTheme={handleToggleTheme}
        lightModeTab={lightModeTab}
        onSelectLightTab={(tab) => {
          setLightModeTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Experience */}
      <main>
        {/* ========================================================================= */}
        {/* LIGHT MODE: Default is Reservation Window, with tabs for Philosophy & Menu */}
        {/* ========================================================================= */}
        {!isReserved && (
          <div className="min-h-[82vh]">
            {/* 1. Reservation View (Default Main Screen: 예약창 단독 노출) */}
            {lightModeTab === 'reservation' && (
              <div className="animate-fade-in">
                <ReservationSection
                  isReserved={isReserved}
                  reservationData={reservationData}
                  onOpenReservationModal={() => setIsReservationModalOpen(true)}
                  onCancelReservation={handleCancelReservation}
                  onCompleteReservation={handleCompleteReservation}
                  onTriggerHumanGlitch={handleTriggerHumanGlitch}
                />
              </div>
            )}

            {/* 2. Dining Philosophy View (다이닝 철학 탭) */}
            {lightModeTab === 'philosophy' && (
              <div className="animate-fade-in">
                <HeroSection
                  onScrollToReservation={() => {
                    setLightModeTab('reservation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenGlossary={() => setIsGlossaryOpen(true)}
                  onOpenAuthorComment={() => setIsAuthorCommentOpen(true)}
                  isReserved={false}
                />
              </div>
            )}

            {/* 3. Chef Dining Course View (셰프 다이닝 코스 탭) */}
            {lightModeTab === 'menu' && (
              <div className="animate-fade-in">
                <RestaurantMenuSection
                  onScrollToReservation={() => {
                    setLightModeTab('reservation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* DARK MODE: The Full Secret DMZ Penthouse Salon Experience                 */}
        {/* ========================================================================= */}
        {isReserved && (
          <>
            {/* 1. Dark Secret Salon Hero */}
            <HeroSection
              onScrollToReservation={() => scrollToSection('reservation-and-profiles')}
              onOpenGlossary={() => setIsGlossaryOpen(true)}
              onOpenAuthorComment={() => setIsAuthorCommentOpen(true)}
              isReserved={true}
            />

            {/* 2. Worldview & Origins */}
            <WorldviewSection isReserved={isReserved} />

            {/* 3. Attendees Roster (A, B, C, D Teams) */}
            <ReservationSection
              isReserved={isReserved}
              reservationData={reservationData}
              onOpenReservationModal={() => setIsReservationModalOpen(true)}
              onCancelReservation={handleCancelReservation}
              onCompleteReservation={handleCompleteReservation}
              onTriggerHumanGlitch={handleTriggerHumanGlitch}
            />

            {/* 4. The 4 Gourmet Factions */}
            <FactionsSection isReserved={isReserved} />

            {/* 5. In-depth Q&A */}
            <QnASection isReserved={isReserved} />
          </>
        )}
      </main>

      {/* Fine Dining Footer */}
      <Footer isReserved={isReserved} />

      {/* Floating Buttons */}
      {isReserved && (
        <>
          <FloatingBookButton onClick={() => setIsGlossaryOpen(true)} isReserved={isReserved} />
          {/* Dark Mode Floating Fortune Button - Only Crystal Ball Emoji */}
          <button
            type="button"
            onClick={() => setIsFortuneModalOpen(true)}
            aria-label="살롱 밑낯 계시 룰렛"
            className="fixed bottom-20 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-700 bg-[#290B0F] text-white shadow-2xl hover:bg-[#4A1017] hover:border-red-500 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <span className="text-xl select-none group-hover:scale-115 transition-transform duration-300">
              🔮
            </span>
          </button>
        </>
      )}

      {/* Floating Fortune Roulette Button (Bottom Right) - Visible in Light mode - Only Crystal Ball Emoji */}
      {!isReserved && (
        <button
          type="button"
          onClick={() => setIsFortuneModalOpen(true)}
          aria-label="오늘의 살롱 운세 룰렛"
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C5A059] bg-[#6B1E29] text-white shadow-2xl hover:bg-[#852634] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        >
          <span className="text-xl select-none group-hover:scale-115 transition-transform duration-300">
            🔮
          </span>
        </button>
      )}

      {/* Salon Fortune Roulette Modal (Dual Mode Supported) */}
      <SalonFortuneModal
        isOpen={isFortuneModalOpen}
        onClose={() => setIsFortuneModalOpen(false)}
        onOpenAuthorComment={() => setIsAuthorCommentOpen(true)}
        isDarkMode={isReserved}
      />

      {/* Reservation Modal (For popup triggers if invoked) */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onCompleteReservation={handleCompleteReservation}
        onTriggerHumanGlitch={handleTriggerHumanGlitch}
      />

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* '인간?' Easter Egg Red Glitch Overlay with Screen Noise */}
      <HumanGlitchOverlay
        isOpen={isHumanGlitchOpen}
        onProceedToDarkSalon={handleProceedToDarkSalonFromGlitch}
        onClose={() => setIsHumanGlitchOpen(false)}
      />

      {/* Secret Author's Commentary Modal */}
      <AuthorCommentModal
        isOpen={isAuthorCommentOpen}
        onClose={() => setIsAuthorCommentOpen(false)}
        isDarkMode={isReserved}
      />
    </div>
  );
}
