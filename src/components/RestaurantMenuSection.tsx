import React, { useState } from 'react';
import { Utensils, Wine, Sparkles, Clock, CheckCircle } from 'lucide-react';

interface RestaurantMenuSectionProps {
  onScrollToReservation: () => void;
}

export const RestaurantMenuSection: React.FC<RestaurantMenuSectionProps> = ({
  onScrollToReservation,
}) => {
  const [spinDeg, setSpinDeg] = useState(0);
  const courseItems = [
    {
      step: 'AMUSE-BOUCHE',
      title: '시그니처 아뮤즈 부쉬',
      desc: '계절 과실의 순수한 산미와 부드러운 글레이징 텍스처를 곁들인 한 입 크기의 엉트레.',
      spec: '18.0°C 최적 온도 서빙',
    },
    {
      step: 'ENTRÉE',
      title: '캐러멜라이즈드 벨벳 플레이트',
      desc: '정밀한 온도 조절을 통해 표면을 섬세하게 코팅하여 식재료 본연의 풍미를 응축한 전체 요리.',
      spec: '프렌치 장인 수제 글레이징',
    },
    {
      step: 'PLAT PRINCIPAL',
      title: '80F 펜트하우스 텐더 로스트',
      desc: '극상의 부드러움을 위해 저온에서 장시간 숙성한 최상급 메인 정찬 요리.',
      spec: '셰프 단독 집도 메인 코스',
    },
    {
      step: 'DESSERT & VIN',
      title: '퐁당 글라세 & 프라이빗 리저브',
      desc: '살롱 독점 빈티지 리저브 와인과 입안에서 차갑게 녹아내리는 크리스털 글라세 디저트.',
      spec: '1982 빈티지 마리아주',
    },
  ];

  return (
    <section id="restaurant-menu" className="border-b border-[#E8E0D5] bg-[#FAF8F5] py-20 text-[#2C2724]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setSpinDeg((prev) => prev + 720)}
            aria-label="포크와 나이프 회전"
            className="inline-flex items-center gap-2 rounded-full border border-[#D8CCBD] bg-[#F7F2EB] px-4 py-1 text-xs font-semibold tracking-[0.2em] text-[#7A6B5C] hover:border-[#6B1E29] transition-all cursor-pointer"
          >
            <span
              className="inline-flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-[#8C6239] select-none"
              style={{ transform: `rotate(${spinDeg}deg)` }}
            >
              <Utensils className="h-3.5 w-3.5 text-[#8C6239]" />
            </span>
            <span>MENU DÉGUSTATION</span>
          </button>
          <h2 className="mt-4 font-cinzel text-3xl font-bold tracking-wider sm:text-4xl text-[#1F1916]">
            셰프 다이닝 코스
          </h2>
          <p className="mt-2 font-serif-kr text-sm text-[#665749]">
            도심 지상 80층에서 펼쳐지는 정통 프렌치 오트 퀴진의 품격
          </p>
          <div className="mx-auto mt-4 h-[1px] w-20 bg-[#D9CDBC]" />
        </div>

        {/* 4 Courses Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {courseItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E6DDD1] bg-[#FAF7F2] p-6 shadow-xs transition-all hover:border-[#CBB9A5] hover:shadow-md"
            >
              <div className="flex items-center justify-between border-b border-[#EAE2D7] pb-3 mb-3">
                <span className="font-cinzel text-xs font-bold tracking-widest text-[#6B1E29]">
                  {item.step}
                </span>
                <span className="text-[11px] font-medium text-[#87786B] font-cinzel">
                  COURSE 0{idx + 1}
                </span>
              </div>
              <h3 className="font-serif-kr text-base font-bold text-[#241E1A]">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#594F45]">
                {item.desc}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-[#7A6857]">
                <CheckCircle className="h-3.5 w-3.5 text-[#6B1E29]" />
                <span>{item.spec}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation Callout in Menu */}
        <div className="mt-12 rounded-2xl border border-[#DECDBB] bg-[#F5EFE6] p-6 text-center shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left sm:text-left">
              <h4 className="font-serif-kr text-base font-bold text-[#2A221C]">
                100% 프라이빗 사전 예약제 운영
              </h4>
              <p className="text-xs text-[#6B5D50] mt-0.5">
                완벽한 다이닝과 1:1 맞춤 서비스를 위해 하루 한정된 인원만 정찬 테이블로 모십니다.
              </p>
            </div>
            <button
              onClick={onScrollToReservation}
              className="shrink-0 rounded-xl border border-[#6B1E29] bg-[#1F1916] px-6 py-3 font-cinzel text-xs font-bold tracking-wider text-[#FAF8F5] transition-all hover:bg-[#6B1E29] shadow-sm"
            >
              프라이빗 테이블 예약하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
