import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Utensils,
  AlertCircle,
  Lock,
  ExternalLink,
  ShieldAlert,
  X,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface BlockedNameInfo {
  url: string;
  imageUrl: string;
  category: string;
  matchedLabel: string;
}

const getBlockedInfo = (rawName: string): BlockedNameInfo | null => {
  const trimmed = rawName.trim();
  const normalized = trimmed.toLowerCase().replace(/\s+/g, '');
  if (!normalized) return null;

  // 1. '먕먀먁', '먕'
  if (['먕먀먁', '먕'].includes(normalized)) {
    return {
      url: 'https://share.crack.wrtn.ai/2bm9d2',
      imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/1.png',
      category: '먕먀먁 / 먕',
      matchedLabel: trimmed,
    };
  }

  // 2. 'The 미식', '미식', '미보', '더미식', 'the 미식', '더 미식', '미식 바보'
  if (['the미식', '미식', '미보', '더미식', '미식바보'].includes(normalized)) {
    return {
      url: 'https://share.crack.wrtn.ai/8mcvhe',
      imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/2.png',
      category: 'The 미식 / 미식 / 미보 / 더 미식',
      matchedLabel: trimmed,
    };
  }

  // 3. '다병', '병다'
  if (['다병', '병다'].includes(normalized)) {
    return {
      url: 'https://share.crack.wrtn.ai/dlb43r',
      imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/3.png',
      category: '다병 / 병다',
      matchedLabel: trimmed,
    };
  }

  // 4. '밤콩솜솜', '밤솜', '솜솜', '밤콩'
  if (['밤콩솜솜', '밤솜', '솜솜', '밤콩'].includes(normalized)) {
    return {
      url: 'https://share.crack.wrtn.ai/fygrde',
      imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/4.png',
      category: '밤콩솜솜 / 밤솜 / 솜솜 / 밤콩',
      matchedLabel: trimmed,
    };
  }

  return null;
};

export interface ImpersonatedCharacterInfo {
  name: string;
  title: string;
  team: string;
  gender: '남성' | '여성' | '무성';
  imageUrl: string;
  speech: string;
}

const SALON_ATTENDEE_IMPERSONATIONS: Array<{
  name: string;
  title: string;
  team: string;
  gender: '남성' | '여성' | '무성';
  imageUrl: string;
  keywords: string[];
  speech: string;
}> = [
  {
    name: '카미시로 무이',
    title: '실전형 수집가 / 결벽의 천사',
    team: 'A팀: 프레셔스',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/52/main/122.png',
    keywords: ['카미시로 무이', '카미시로무이', '카미시로', '무이'],
    speech: '“하? 손 치워. 감히 누굴 사칭하는 거야? 더러운 낯짝으로 내 이름을 팔다니 역겨워 죽겠네. 너, 내가 아니잖아. 당장 꺼져서 다시 제대로 적어.”',
  },
  {
    name: '세베린 모르',
    title: '이중인격의 세공사 / 영구 보존관',
    team: 'A팀: 프레셔스',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/52/main/333.png',
    keywords: ['세베린 모르', '세베린모르', '세베린'],
    speech: '“……이상하네. 거울을 본 것 같지 않은데? 당신은 내가 아니잖아요……. 내 완벽한 조각상과 유리관에 흠집을 낼 셈인가요? 불완전한 사칭은 용납 못 해요. 다시 예약하세요.”',
  },
  {
    name: '아즈라엘 린',
    title: '동결 사제 / 빙결의 수집광',
    team: 'A팀: 프레셔스',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/52/main/222.png',
    keywords: ['아즈라엘 린', '아즈라엘린', '아즈라엘'],
    speech: '“……왜 내 이름을 쓰고 있어? 너한테선 내가 가진 영구 동결의 냄새가 나지 않아. 넌…… 내가 아니잖아. 체온이 너무 뜨거워. 다시 써.”',
  },
  {
    name: '벨투아',
    title: '가학적 악마 미식가 / 자극파',
    team: 'B팀: 텐션',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/11-%EB%B2%A8%ED%88%AC%EC%95%84.png',
    keywords: ['벨투아'],
    speech: '“어라? 무슨 뻔뻔한 장난이죠? 그 가련하고 얄팍한 얼굴, 어디를 봐도 내가 아니잖아요? 후후, 사칭하려다 들켜서 떨리는 표정…… 아주 볼만하네요. 다시 예약이나 해보시죠.”',
  },
  {
    name: '엔드노트',
    title: '최적의 고통 설계자 / 살롱 수석 판정관',
    team: 'B팀: 텐션',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/12-%EC%97%94%EB%93%9C%EB%85%B8%ED%8A%B8.png',
    keywords: ['엔드노트'],
    speech: '“생체 데이터 대조 결과, 오차율 100%. 명백한 사칭이군요. 당신은 제가 아닙니다. 살롱의 보안 룰을 기만하려 들다니 경솔하군요. 처음부터 다시 작성하십시오.”',
  },
  {
    name: '요미츠쿠라 텐',
    title: '온화한 미소의 배신자 / 쾌락주의 악마',
    team: 'B팀: 텐션',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/13-%EC%9A%94%EB%AF%B8%EC%B8%A0%EC%BF%A0%EB%9D%BC%20%ED%85%90.png',
    keywords: ['요미츠쿠라 텐', '요미츠쿠라텐', '요미츠쿠라', '텐'],
    speech: '“허허, 보배야. 내 이름을 빌려 쓰다니 꽤나 당돌하구나. 하지만 아무리 흉내를 내보아도…… 너는 내가 아니잖니? 그런 서투른 거짓말은 통하지 않는단다. 다시 예약해 보렴.”',
  },
  {
    name: '요미츠쿠라 유이',
    title: '잔혹한 나비 / 자극파의 파괴자',
    team: 'B팀: 텐션',
    gender: '여성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/44/main/14-%EC%9A%94%EB%AF%B8%EC%B8%A0%EC%BF%A0%EB%9D%BC%20%EC%9C%A0%EC%9D%B4.png',
    keywords: ['요미츠쿠라 유이', '요미츠쿠라유이', '유이'],
    speech: '“뭐야아? 지금 장난쳐? 내 이름을 멋대로 써놓고 뭐 하는 짓이야? 딱 봐도 너, 나 아니잖아! 그런 엉터리 거짓말 하면 확 찢어버린다? 얼른 다시 예약해!”',
  },
  {
    name: '리',
    title: '봉인된 입술의 제압자 / 메스가키 천사',
    team: 'C팀: 헌터',
    gender: '여성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/54/main/%ED%95%A9%EC%9E%91%20%EA%B8%B0%EB%B3%B8%20%ED%94%8C%ED%95%84.png',
    keywords: ['리', '라', '루'],
    speech: '“하? 식재료 주제에 지금 날 보고 그딴 소리가 나와?! 넌 죽었다 깨어나도 내가 아니잖아, 멍청아! 당장 똑바로 다시 예약 안 해?!”',
  },
  {
    name: '마다라',
    title: '쾌락주의 도축사 / 붉은 안대의 추격자',
    team: 'C팀: 헌터',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/42/main/%EB%A7%88%EB%8B%A4%EB%9D%BC.png',
    keywords: ['마다라'],
    speech: '“크하하! 이 꼬맹이가 간이 배 밖으로 튀어나왔군. 내 이름을 팔아먹어? 뼈마디랑 살점 냄새만 맡아도 넌 내가 아니잖아. 도축칼 맛보기 싫으면 얼른 다시 제대로 적어라.”',
  },
  {
    name: '오르티체',
    title: '미식 지배자 / C팀 총괄 뇌신경',
    team: 'C팀: 헌터',
    gender: '여성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/42/main/%EC%98%A4%EB%A5%B4%ED%8B%B0%EC%B2%B4%200.png',
    keywords: ['오르티체'],
    speech: '“어머, 기가 차서 말이 안 나오네. 감히 내 이름을 함부로 올리다니 분수를 모르는군요. 뼛속까지 다른 게 훤히 보이는데…… 당신, 내가 아니잖아요? 예의를 갖춰서 다시 예약하세요.”',
  },
  {
    name: '에르뷔스',
    title: '무통각의 해체인 / 단식 날개의 천사',
    team: 'C팀: 헌터',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/42/main/%EC%97%90%EB%A5%B4%EB%B7%94%EC%8A%A4.png',
    keywords: ['에르뷔스'],
    speech: '“...누나들한테 들었어. 사칭하는 건 썰어버려도 된대. ...너, 나 아니잖아. 다시 해.”',
  },
  {
    name: '이도',
    title: '쌍둥이 큐레이터 / 결핍의 모사꾼',
    team: 'D팀: 큐레이터 (위선)',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/42/main/9%20%EC%9D%B4%EB%8F%84%209.png',
    keywords: ['이도'],
    speech: '“응? 잠깐만요…… 왜 내 이름을 쓰고 있어요? 네 편이 되어주려고 했는데…… 넌 내가 아니잖아. 그런 거짓말은 나쁜 아이나 하는 건데? 다시 제대로 적어줘요.”',
  },
  {
    name: '오도',
    title: '쌍둥이 큐레이터 / 관음의 우울자',
    team: 'D팀: 큐레이터 (위선)',
    gender: '남성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/42/main/%EC%98%A4%EB%8F%84.png',
    keywords: ['오도'],
    speech: '“...춥다. 왜 내 이름을 적었어? 흉내 내지 마…… 너, 나 아니잖아. 더러워. ...다시 해.”',
  },
  {
    name: '홍시',
    title: '감각의 탯줄 / 탐식의 모조생명체',
    team: 'D팀: 큐레이터 (위선)',
    gender: '무성',
    imageUrl: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/42/main/10%20%ED%99%8D%EC%8B%9C%2010.png',
    keywords: ['홍시'],
    speech: '“...!!-! 캬아아악! (얼굴 없는 백색 괴수가 붉은 핏줄을 곤두세우며 턱을 쩍 벌립니다. 단내와 비릿한 피 냄새를 뿜으며 당신이 자신이 아니라는 것에 격렬하게 발작합니다. ...다시 작성하십시오.)”',
  },
];

const checkCharacterImpersonation = (
  rawName: string,
  rawSpecialRequest: string,
  userGender: string
): ImpersonatedCharacterInfo | null => {
  const textToSearch = `${rawName} ${rawSpecialRequest}`.trim();
  if (!textToSearch) return null;

  for (const char of SALON_ATTENDEE_IMPERSONATIONS) {
    // 성별 일치 조건: 단, 성별까지 같아야 뜰 수 있게 적용 ('무성'은 '무성/비공개'와 일치)
    const isGenderMatch =
      char.gender === userGender ||
      (char.gender === '무성' && userGender === '무성/비공개') ||
      (char.gender === '무성' && (userGender.includes('무성') || userGender.includes('비공개')));
    if (!isGenderMatch) continue;

    for (const kw of char.keywords) {
      if (kw.length >= 3) {
        if (textToSearch.includes(kw)) {
          return {
            name: char.name,
            title: char.title,
            team: char.team,
            gender: char.gender,
            imageUrl: char.imageUrl,
            speech: char.speech,
          };
        }
      } else {
        // 단어 경계 및 파생어 (본인, 관련, 지인, 님, 등)
        const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(
          `(^|[^가-힣a-zA-Z0-9])(${escaped})(본인|관련|지인|사람|친구|입니다|이|가|는|은|의|를|을|님|씨|야|이야|임|측)?([^가-힣a-zA-Z0-9]|$)`
        );
        if (pattern.test(textToSearch) || rawName.trim() === kw) {
          return {
            name: char.name,
            title: char.title,
            team: char.team,
            gender: char.gender,
            imageUrl: char.imageUrl,
            speech: char.speech,
          };
        }
      }
    }
  }

  return null;
};

interface ReservationFormProps {
  onCompleteReservation: (bookingData: any) => void;
  onTriggerHumanGlitch: () => void;
  isInline?: boolean;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  onCompleteReservation,
  onTriggerHumanGlitch,
  isInline = false,
}) => {
  const [guestName, setGuestName] = useState('');
  const [gender, setGender] = useState<'여성' | '남성' | '무성/비공개'>('여성');
  const [partySize, setPartySize] = useState('1인 (단독 예약)');
  const [timeSlot, setTimeSlot] = useState('22:00');
  const [timeSlotError, setTimeSlotError] = useState('');
  const [agreeRules, setAgreeRules] = useState(false);
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // '본인이 맞습니까?' Verification Modal States (for The 미식, 먕먀먁, etc.)
  const [activeBlockedInfo, setActiveBlockedInfo] = useState<BlockedNameInfo | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);

  // 참석자 사칭 경고 모달 ('너는 내가 아니잖아')
  const [impersonationWarning, setImpersonationWarning] = useState<ImpersonatedCharacterInfo | null>(null);

  // Available Time Slots list
  const availableSlots = [
    { time: '18:00', label: '18:00 (오르톨랑 프리뷰 코스)', available: false, reason: '예약 마감' },
    { time: '19:30', label: '19:30 (천상계 공식 만찬)', available: false, reason: '예약 마감' },
    { time: '21:00', label: '21:00 (살롱 프리-옥션 테이스팅)', available: false, reason: '예약 마감' },
    { time: '22:00', label: '22:00 (80F 펜트하우스 메인 옥션)', available: true, reason: '예약 가능' },
    { time: '23:30', label: '23:30 (미드나잇 템퍼링 코스)', available: false, reason: '예약 마감' },
    { time: '01:00', label: '01:00 (비공개 프라이빗 나이트)', available: false, reason: '예약 마감' },
  ];

  const handleTimeSlotChange = (slotTime: string) => {
    setTimeSlot(slotTime);
    if (slotTime !== '22:00') {
      setTimeSlotError('해당 시간대는 이미 예약이 차있습니다. 오직 [22:00] 시간대만 예약 가능합니다.');
    } else {
      setTimeSlotError('');
    }
  };

  const handleGuestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestName(e.target.value);
  };

  const isTimeValid = timeSlot === '22:00';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeRules || !isTimeValid) return;

    // 1. Check for '인간' Easter Egg in guestName or specialRequest
    if (guestName.includes('인간') || specialRequest.includes('인간')) {
      onTriggerHumanGlitch();
      return;
    }

    // 2. Check for special names ('The 미식', '먕먀먁', '다병', '밤콩솜솜' 등) -> '본인이 맞습니까?' 모달 띄우기
    const blocked = getBlockedInfo(guestName);
    if (blocked) {
      setActiveBlockedInfo(blocked);
      setShowVerificationModal(true);
      return;
    }

    // 3. Check for Salon Attendees Impersonation ('너는 내가 아니잖아' 검증: 성별까지 같아야 뜸)
    const impersonated = checkCharacterImpersonation(guestName, specialRequest, gender);
    if (impersonated) {
      setImpersonationWarning(impersonated);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onCompleteReservation({
        guestName: guestName.trim() || '익명의 귀빈',
        gender,
        partySize,
        timeSlot,
        specialRequest,
        confirmedAt: new Date().toLocaleTimeString(),
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className={`w-full ${isInline ? 'max-w-2xl mx-auto' : ''}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. 성함 입력 */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E4F] mb-1.5">
            예약자 성함 / VIP 명의 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="예약자 성함을 입력해주세요. (예: 샤를로트)"
            value={guestName}
            onChange={handleGuestNameChange}
            className="w-full rounded-xl border border-[#D5C4B0] bg-[#FFF] px-4 py-3 text-sm text-[#2A231C] placeholder-[#9E8E7E] focus:border-[#6B1E29] focus:ring-1 focus:ring-[#6B1E29] focus:outline-none transition-all shadow-xs"
          />
        </div>

        {/* 2. 성별 & 인원 수 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E4F] mb-1.5">
              VIP 성별 구분
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['여성', '남성', '무성/비공개'] as const).map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGender(g)}
                  className={`rounded-xl border py-2.5 text-xs font-medium transition-all cursor-pointer ${
                    gender === g
                      ? 'border-[#6B1E29] bg-[#6B1E29] text-white shadow-xs'
                      : 'border-[#D5C4B0] bg-white text-[#524438] hover:bg-[#F7F2EB]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E4F] mb-1.5">
              예약 인원 (단독 테이블)
            </label>
            <div className="relative">
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#D5C4B0] bg-white px-4 py-2.5 text-xs text-[#2A231C] focus:border-[#6B1E29] focus:outline-none"
              >
                <option value="1인 (단독 예약)">1인 (독점 참관 VVIP 테이블)</option>
              </select>
              <Users className="pointer-events-none absolute right-3.5 top-3 h-4 w-4 text-[#8C7A68]" />
            </div>
            <p className="mt-1 text-[11px] text-[#8C7A68]">
              * 80층 보안 규칙상 동반인 없는 1인 단독 테이블만 배정됩니다.
            </p>
          </div>
        </div>

        {/* 3. 예약 희망 시간대 */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E4F] mb-1.5">
            예약 시간대 선택 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableSlots.map((slot) => {
              const isSelected = timeSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => handleTimeSlotChange(slot.time)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#6B1E29] bg-[#6B1E29] text-white shadow-md'
                      : slot.available
                      ? 'border-[#D5C4B0] bg-white text-[#2A231C] hover:border-[#6B1E29]'
                      : 'border-neutral-200 bg-neutral-100 text-neutral-400 opacity-60'
                  }`}
                >
                  <span className="font-cinzel text-xs font-bold tracking-wider">{slot.time}</span>
                  <span
                    className={`text-[10px] mt-0.5 ${
                      isSelected ? 'text-amber-200' : slot.available ? 'text-emerald-700 font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    {slot.reason}
                  </span>
                </button>
              );
            })}
          </div>

          {timeSlotError && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 animate-shake">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{timeSlotError}</span>
            </div>
          )}
        </div>

        {/* 4. 특수 요구사항 */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E4F] mb-1.5">
            특수 요구사항 (Demandes Spéciales)
          </label>
          <textarea
            rows={3}
            placeholder="코스 진행 시 특별히 원하시는 기호나 특수 요청사항이 있으신 경우 작성해주십시오."
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="w-full rounded-xl border border-[#D5C4B0] bg-white px-4 py-2.5 text-xs text-[#2A231C] placeholder-[#9E8E7E] focus:border-[#6B1E29] focus:outline-none focus:ring-1 focus:ring-[#6B1E29]"
          />
        </div>

        {/* 5. 보안 서약 체크박스 */}
        <div className="rounded-xl border border-[#DEC0B8] bg-[#FFF8F6] p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={agreeRules}
              onChange={(e) => setAgreeRules(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#D5C4B0] text-[#6B1E29] focus:ring-[#6B1E29]"
            />
            <div className="text-xs text-[#524438] leading-relaxed">
              <span className="font-bold text-[#6B1E29]">살롱 글라세(GLACÉ) 보안 및 VVIP 서약 동의</span>
              <p className="mt-1 text-[11px] text-[#7A6A5E]">
                지상 80층 DMZ에서 목격한 모든 의전, 코스, 참석자들의 신원 및 행위에 대해 영구적 비밀 유지를 서약하며, 살롱 내 지침에 이의 없이 따를 것을 확약합니다.
              </p>
            </div>
          </label>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={!agreeRules || !isTimeValid || isSubmitting}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-cinzel text-xs font-bold tracking-[0.2em] shadow-lg transition-all ${
            agreeRules && isTimeValid && !isSubmitting
              ? 'bg-[#1F1916] text-[#FAF8F5] hover:bg-[#6B1E29] active:scale-98 cursor-pointer'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>
            {isSubmitting ? '예약 보안 서약 인증 중...' : '살롱 VVIP 예약 확정하기 (CONFIRMER)'}
          </span>
        </button>
      </form>

      {/* ========================================================================= */}
      {/* 1. 살롱 참석자 사칭 경고 모달 ("너는 내가 아니잖아")                          */}
      {/* ========================================================================= */}
      {impersonationWarning && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 backdrop-blur-md bg-black/90 animate-fade-in">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border-2 border-red-900/80 bg-[#161211] text-[#F5EDE3] shadow-[0_0_50px_rgba(185,28,28,0.3)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-red-950/80 bg-[#251214] px-5 sm:px-6 py-4">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
                <div>
                  <h3 className="font-serif-kr text-base font-bold tracking-wide text-red-200">
                    신원 대조 불일치 • 사칭 감지 경고
                  </h3>
                  <p className="text-[10px] font-cinzel tracking-wider text-red-400/80 uppercase">
                    Avertissement d'Usurpation d'Identité
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setImpersonationWarning(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-red-900/60 bg-[#1A0F11] text-[#C4B7AA] hover:bg-red-950 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-5 text-xs font-serif-kr leading-relaxed">
              {/* Character Identity Card with Portrait */}
              <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-red-950/60 bg-[#1F1716] p-4 shadow-inner">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-red-800/50 bg-black/50 shadow-md">
                  <img
                    src={impersonationWarning.imageUrl}
                    alt={impersonationWarning.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-red-300">
                    {impersonationWarning.gender}
                  </span>
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <span className="inline-block rounded-full border border-red-800/60 bg-red-950/80 px-2.5 py-0.5 text-[10px] font-bold text-red-300">
                    {impersonationWarning.team}
                  </span>
                  <h4 className="font-serif-kr text-lg sm:text-xl font-bold text-amber-200">
                    {impersonationWarning.name}
                  </h4>
                  <p className="text-[10px] text-red-400/90 pt-0.5">
                    * 살롱 참석자 명의 및 관련자 무단 도용 감지됨
                  </p>
                </div>
              </div>

              {/* Character Speech Callout */}
              <div className="rounded-xl border-l-4 border-l-red-500 border border-red-950 bg-[#251517] p-4 text-sm sm:text-base leading-relaxed text-[#F3E2D8] shadow-sm">
                <p className="font-serif-kr italic font-medium">
                  {impersonationWarning.speech}
                </p>
              </div>

              <div className="rounded-lg border border-[#3D2D29] bg-[#140F0E] px-2 sm:px-3 py-2.5 text-center overflow-x-auto">
                <p className="whitespace-nowrap text-[11px] sm:text-xs text-[#B0A093] font-serif-kr tracking-tight">
                  보안 조약에 따라 자신의 정확한 명의로만 입장하실 수 있습니다.
                </p>
              </div>

              {/* Re-try Action Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setImpersonationWarning(null)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6B1E29] via-[#8F2332] to-[#6B1E29] px-4 py-3.5 font-serif-kr text-sm font-bold tracking-wider text-white shadow-lg hover:from-[#7C2230] hover:to-[#7C2230] active:scale-98 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>다시 예약하기 (Re-try Reservation)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. '본인이 맞습니까?' Verification Modal with Image (기존 기능 유지)          */}
      {/* ========================================================================= */}
      {showVerificationModal && activeBlockedInfo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 backdrop-blur-md bg-black/85 animate-fade-in">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#5C2B30] bg-[#161211] text-[#F5EDE3] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#442226] bg-[#241617] px-5 sm:px-6 py-4">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="h-5 w-5 text-amber-400" />
                <h3 className="font-serif-kr text-base font-bold tracking-wide text-amber-200">
                  본인이 맞습니까?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVerificationModal(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-900/50 bg-[#1D1413] text-[#C4B7AA] hover:bg-amber-950 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-4 text-xs font-serif-kr leading-relaxed">
              {/* Target Image Frame */}
              <div className="overflow-hidden rounded-xl border border-[#442E28] bg-[#0A0807] p-2.5 flex items-center justify-center shadow-inner">
                <img
                  src={activeBlockedInfo.imageUrl}
                  alt={activeBlockedInfo.matchedLabel}
                  referrerPolicy="no-referrer"
                  className="max-h-[300px] sm:max-h-[350px] w-auto max-w-full rounded-lg object-contain"
                />
              </div>

              {/* Inquiry Text */}
              <div className="text-center space-y-1 pt-1">
                <h4 className="font-serif-kr text-base sm:text-lg font-bold text-amber-300">
                  ‘{activeBlockedInfo.matchedLabel}’ 본인이 맞습니까?
                </h4>
                <p className="text-[11px] text-[#C4B7AA] opacity-90 leading-relaxed">
                  살롱 보안 프로토콜에 따라 본인 확인 후 연결됩니다.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={activeBlockedInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      window.open(activeBlockedInfo.url, '_blank', 'noopener,noreferrer');
                    } catch {
                      window.location.href = activeBlockedInfo.url;
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6B1E29] via-[#8F2332] to-[#6B1E29] px-4 py-3.5 font-serif-kr text-sm font-bold tracking-wider text-white shadow-lg hover:from-[#7C2230] hover:to-[#7C2230] active:scale-98 transition-all cursor-pointer"
                >
                  <span>예, 본인이 맞습니다.</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowVerificationModal(false)}
                  className="w-full rounded-xl border border-[#3D332D] bg-[#1E1715] py-2.5 text-xs text-[#B5A596] hover:bg-[#2A201C] hover:text-[#EDE1D5] transition-all cursor-pointer font-serif-kr"
                >
                  아닙니다.
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
