import React from 'react';
import { X, Calendar, Utensils } from 'lucide-react';
import { ReservationForm } from './ReservationForm';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteReservation: (bookingData: any) => void;
  onTriggerHumanGlitch: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onCompleteReservation,
  onTriggerHumanGlitch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/75 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 overflow-hidden rounded-3xl border-2 border-[#C9B7A2] bg-[#FAF8F5] text-[#2C2724] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#EADFCF] bg-[#F2EDE4] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B1E29] text-white">
              <Utensils className="h-4 w-4 text-amber-200" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm font-bold tracking-wider text-[#1F1916] uppercase">
                살롱 《 GLACÉ 》 80F VVIP 테이블 예약
              </h3>
              <p className="text-[10px] text-[#7A6C5F] font-serif-kr">
                지상 80층 DMZ 펜트하우스 • 사전 승인 참관 신청서
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D5C7B7] bg-white text-[#524438] hover:bg-[#FAF5EE] hover:text-[#1F1916] transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body with Shared Reservation Form */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          <ReservationForm
            onCompleteReservation={(data) => {
              onCompleteReservation(data);
              onClose();
            }}
            onTriggerHumanGlitch={() => {
              onClose();
              onTriggerHumanGlitch();
            }}
          />
        </div>

        {/* Modal Footer Stamp */}
        <div className="border-t border-[#E8DEC8] bg-[#F4EEE4] px-6 py-3 text-center text-[10px] font-cinzel tracking-widest text-[#8C7A68]">
          80TH FLOOR SKY PENTHOUSE • SALON GLACÉ PRIVATE DINING
        </div>
      </div>
    </div>
  );
};
