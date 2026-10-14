import React from 'react';
import { X, Sparkles, Feather, Music, Disc, Play, ExternalLink, Award, Copy, Check } from 'lucide-react';

interface AuthorCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

interface CreatorMessage {
  name: string;
  image: string;
  message: string;
}

const CREATORS: CreatorMessage[] = [
  {
    name: '다병',
    image: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/48/main/3.png',
    message: '생각보다 착한 친구들 입니다..',
  },
  {
    name: '먕먀먁',
    image: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/48/main/1.png',
    message: '세상에 나쁜 천사는 없다.......! 화이팅 !',
  },
  {
    name: 'The 미식',
    image: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/48/main/2.png',
    message: '잘 부탁드립니다.',
  },
  {
    name: '밤콩솜솜',
    image: 'https://raw.githubusercontent.com/codbdhdbswls-glitch/48/main/4.png',
    message: '자신 있으면 힘내서 살아서 와라!! 뫄, 자신있남!!!',
  },
];

export const AuthorCommentModal: React.FC<AuthorCommentModalProps> = ({
  isOpen,
  onClose,
  isDarkMode = true,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `《살롱 GLACÉ》 제작자 코멘터리 (Creator's Note)\n\n"플레이 해주시고 관심 가져주신 모든 유저님들과 다소 부족함이 많았으나 참여해주신 제작자님들께 감사 인사를 드립니다. 다소 난해하고 호불호가 갈리는 주제임에도 시간을 내주셔서 덕분에 멋진 아이들과 여러 파벌 이야기를 볼 수 있었습니다.\n\n플레이 해주시고 관심을 보여주신 유저님들께도 관심을 보여주신 덕에 제작자님들과 함께 머리 맞대고 짠 시간이 아깝지 않았습니다.\n\n다시 한번 더 감사 인사를 드리며 유저님들과 제작자님들 모두가 올해 모든 일이 행복함이 가득하길 바라겠습니다."`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/85 animate-fade-in">
      {/* Backdrop listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        className={`relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border shadow-2xl ${
          isDarkMode
            ? 'border-[#4D3A2C] bg-[#161210] text-[#E0D7CE]'
            : 'border-[#D5C2AF] bg-[#FAF8F5] text-[#2C2724]'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between border-b px-6 py-4 shrink-0 ${
            isDarkMode ? 'border-[#332822] bg-[#1E1714]' : 'border-[#E8DFD5] bg-[#F3EDE4]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Feather className="h-4 w-4" />
            </span>
            <div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-amber-950/80 text-amber-300 border border-amber-700/60 font-cinzel">
                  SECRET UNLOCKED
                </span>
                <span className="text-[10px] text-amber-400/90 font-medium">
                  제작자 공식 코멘터리
                </span>
              </div>
              <h3 className="font-serif-kr text-base sm:text-lg font-bold tracking-wider">
                찾아주셔서 감사합니다.
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-[#3D3530] bg-[#241F1D] text-[#B0A498] hover:text-white hover:bg-[#382F2A]'
                  : 'border-[#D5C7B4] bg-[#FAF8F5] text-[#5C4F42] hover:text-black'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">공유</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-[#3D3530] bg-[#241F1D] text-[#B0A498] hover:bg-[#382F2A] hover:text-white'
                  : 'border-[#D5C7B4] bg-[#FAF8F5] text-[#5C4F42] hover:bg-[#6B1E29] hover:text-white'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 font-serif-kr text-xs sm:text-sm leading-relaxed">
          {/* Unlock Badge Banner */}
          <div
            className={`rounded-xl border p-4 sm:p-5 flex items-center gap-3.5 ${
              isDarkMode
                ? 'border-amber-900/60 bg-gradient-to-r from-amber-950/40 via-[#261E1A] to-[#1E1714] text-amber-200/90'
                : 'border-amber-300 bg-amber-50/70 text-amber-900'
            }`}
          >
            <Sparkles className="h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <h4 className="font-bold text-sm sm:text-base text-amber-300">
                축하합니다! 살롱의 최심부 기밀이 해금되었습니다.
              </h4>
            </div>
          </div>

          {/* Section 1: 초기 기획 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2 border-amber-900/40">
              <span className="font-cinzel font-bold text-amber-400 text-sm">CHAPTER I</span>
              <h4 className="text-base sm:text-lg font-bold">
                초기 기획
              </h4>
            </div>

            {/* Mobile View (4개 문단 분리) */}
            <div className="block sm:hidden space-y-3.5 text-xs leading-relaxed">
              <p>
                《살롱 GLACÉ》는 ‘카니발리즘’이라는 가장 원초적이고 야만적인 식인 행위를 처음에는 어떻게 풀어낼지 고민하다 여러 요소중 오르톨랑과 천사와 악마를 추가하여 계획 했습니다.
              </p>
              <p>
                피비린내 나는 도축장을 연상시키는 대신, 리넨 테이블보와 은제 커트러리, 클래식 샹들리에 대체하여 그 속에서 벌여지는 4개의 파벌이 저마다 다른 분위기와 목적을 나타내고 어째서 이런 행위가 발생 했는지에 대해서 고민을 많이 했었습니다.
              </p>
              <p>
                그러다보니 기존과 최대한 다르게 해볼 수 없을까 하다보니 현재 글라세가 나온것 같습니다.
              </p>
              <p>
                식재료인 인간의 공포와 고통, 수치심을 '당도'로 바꾸어 수치로 계량하여 탐닉하는 VVIP들의 모습을 통해 위선과 탐욕의 극치를 표현하고자 했는데 그게 잘 전달 되었기를 바랍니다.
              </p>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block space-y-3 text-sm leading-relaxed">
              <p>
                《살롱 GLACÉ》는 ‘카니발리즘’이라는 가장 원초적이고 야만적인 식인 행위를 처음에는 어떻게 풀어낼지 고민하다 여러 요소중 오르톨랑과 천사와 악마를 추가하여 계획 했습니다.
              </p>
              <p>
                피비린내 나는 도축장을 연상시키는 대신, 리넨 테이블보와 은제 커트러리, 클래식 샹들리에 대체하여 그 속에서 벌여지는 4개의 파벌이 저마다 다른 분위기와 목적을 나타내고 어째서 이런 행위가 발생 했는지에 대해서 고민을 많이 했었습니다.
              </p>
              <p>
                그러다보니 기존과 최대한 다르게 해볼 수 없을까 하다보니 현재 글라세가 나온것 같습니다. 식재료인 인간의 공포와 고통, 수치심을 '당도'로 바꾸어 수치로 계량하여 탐닉하는 VVIP들의 모습을 통해 위선과 탐욕의 극치를 표현하고자 했는데 그게 잘 전달 되었기를 바랍니다.
              </p>
            </div>
          </section>

          {/* Section 2: 전하는 말 (참여 제작자 + 감사 인사 통합) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2 border-amber-900/40">
              <span className="font-cinzel font-bold text-amber-400 text-sm">CHAPTER II</span>
              <h4 className="text-base sm:text-lg font-bold">
                전하는 말
              </h4>
            </div>

            <div className="space-y-4">
              {CREATORS.map((creator) => (
                <div
                  key={creator.name}
                  className={`flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    isDarkMode
                      ? 'border-[#332A24] bg-[#1A1412]'
                      : 'border-[#E5DDD2] bg-[#F7F2EB]'
                  }`}
                >
                  {/* Left: Creator Profile Photo (Circular Frame) */}
                  <div className="relative shrink-0">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-amber-600/70 shadow-md bg-black/40 flex items-center justify-center">
                      <img
                        src={creator.image}
                        alt={creator.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full rounded-full object-cover object-center block"
                      />
                    </div>
                  </div>

                  {/* Right: Name + Speech Bubble (말풍선) */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-bold text-sm sm:text-base text-amber-300 font-cinzel">
                        {creator.name}
                      </span>
                    </div>

                    {/* Speech Bubble with Arrow */}
                    <div
                      className={`relative rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed border shadow-xs ${
                        isDarkMode
                          ? 'border-amber-900/40 bg-[#241A17] text-[#E8DDD2]'
                          : 'border-amber-200 bg-[#FFFDF9] text-[#2C2724]'
                      }`}
                    >
                      {/* Speech Bubble Tail Arrow pointing to the avatar */}
                      <div
                        className={`absolute -left-2 top-3 h-0 w-0 border-y-[6px] border-y-transparent border-r-[8px] ${
                          isDarkMode ? 'border-r-[#241A17]' : 'border-r-[#FFFDF9]'
                        }`}
                      />
                      <p className="font-serif-kr">
                        {creator.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: 추천 노래 (나토리 - 식탁 + 레코드판 플레이어) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2 border-amber-900/40">
              <span className="font-cinzel font-bold text-amber-400 text-sm">CHAPTER III</span>
              <h4 className="text-base sm:text-lg font-bold">
                추천 노래
              </h4>
            </div>

            {/* Clickable Music Card */}
            <a
              href="https://youtu.be/Ph5xcTn_I1I?si=V_6aTDW-Q0e6uhsB"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col sm:flex-row items-center justify-between gap-5 p-5 sm:p-6 rounded-2xl border transition-all duration-300 shadow-xl cursor-pointer ${
                isDarkMode
                  ? 'border-red-900/60 bg-gradient-to-r from-[#211114] via-[#1B0F12] to-[#140C0E] hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]'
                  : 'border-[#DFC6B4] bg-gradient-to-r from-[#FFF5F2] via-[#FDF0EC] to-[#F7E7E2] hover:border-[#6B1E29] hover:shadow-xl'
              }`}
            >
              {/* Left Side: Playlist Info */}
              <div className="flex-1 space-y-2.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/20 text-red-400 border border-red-500/40">
                    <Music className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-serif-kr font-bold tracking-wide text-red-400">
                    추천 노래
                  </span>
                </div>

                <div>
                  <h5 className="font-serif-kr text-base sm:text-lg font-bold text-red-200 group-hover:text-red-300 transition-colors">
                    나토리(なとり) - 식탁(食卓)
                  </h5>
                  <p className="text-xs opacity-75 font-serif-kr mt-0.5">
                    Natori - Shokutaku (The Dining Table)
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-red-600/30 text-red-200 border border-red-500/50 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xs">
                    <Play className="h-3 w-3 fill-current" />
                    <span>음원 바로 감상하기 (YouTube)</span>
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </span>
                </div>
              </div>

              {/* Right Side: Realistic Spinning Vinyl Record */}
              <div className="relative shrink-0 flex items-center justify-center p-2">
                {/* Vinyl Disc with Grooves & Continuous Rotation */}
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-[#111111] shadow-[0_8px_24px_rgba(0,0,0,0.7)] border-2 border-neutral-700 flex items-center justify-center overflow-hidden animate-[spin_8s_linear_infinite] group-hover:[animation-duration:4s]">
                  {/* Outer Concentric Grooves */}
                  <div className="absolute inset-1.5 rounded-full border border-neutral-700/50" />
                  <div className="absolute inset-3.5 rounded-full border border-neutral-800" />
                  <div className="absolute inset-5 rounded-full border border-neutral-700/40" />
                  <div className="absolute inset-7 rounded-full border border-neutral-800" />

                  {/* Vinyl Sheen Light Highlights */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

                  {/* Center Record Label (Red & Gold) */}
                  <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 flex-col items-center justify-center rounded-full bg-gradient-to-br from-red-800 via-rose-900 to-amber-950 border border-amber-400/80 text-amber-200 shadow-inner select-none">
                    <span className="text-[9px] font-bold font-serif-kr tracking-tight">
                      食卓
                    </span>
                    <span className="text-[7px] font-cinzel opacity-80">
                      GLACÉ
                    </span>
                    {/* Center Spindle Hole */}
                    <div className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-neutral-900 border border-amber-300/60" />
                  </div>
                </div>

                {/* Turntable Stylus / Needle Indicator Badge */}
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-xs">
                  <Disc className="h-3.5 w-3.5" />
                </div>
              </div>
            </a>
          </section>

          {/* Section 4: 최종 감사 메시지 (에필로그 대체) */}
          <section
            className={`rounded-xl border p-5 sm:p-6 space-y-3 ${
              isDarkMode
                ? 'border-amber-700/60 bg-[#201815] text-[#F0E4D8]'
                : 'border-[#DFCBB8] bg-[#F7EFE6] text-[#3D332A]'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <Award className="h-4 w-4" />
              <span>모든 분들께 전하는 감사 인사</span>
            </div>

            {/* Mobile View (4개 문단 구분) */}
            <div className="block sm:hidden space-y-3 leading-relaxed text-xs">
              <p>
                플레이 해주시고 관심 가져주신 모든 유저님들과 다소 부족함이 많았으나 참여해주신 제작자님들께 감사 인사를 드립니다.
              </p>
              <p>
                다소 난해하고 호불호가 갈리는 주제임에도 시간을 내주셔서 덕분에 멋진 아이들과 여러 파벌 이야기를 볼 수 있었습니다.
              </p>
              <p>
                플레이 해주시고 관심을 보여주신 유저님들께도 관심을 보여주신 덕에 제작자님들과 함께 머리 맞대고 짠 시간이 아깝지 않았습니다.
              </p>
              <p>
                다시 한번 더 감사 인사를 드리며 유저님들과 제작자님들 모두가 올해 모든 일이 행복함이 가득하길 바라겠습니다.
              </p>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block space-y-3 leading-relaxed text-sm">
              <p>
                플레이 해주시고 관심 가져주신 모든 유저님들과 다소 부족함이 많았으나 참여해주신 제작자님들께 감사 인사를 드립니다. 다소 난해하고 호불호가 갈리는 주제임에도 시간을 내주셔서 덕분에 멋진 아이들과 여러 파벌 이야기를 볼 수 있었습니다.
              </p>
              <p>
                플레이 해주시고 관심을 보여주신 유저님들께도 관심을 보여주신 덕에 제작자님들과 함께 머리 맞대고 짠 시간이 아깝지 않았습니다.
              </p>
              <p>
                다시 한번 더 감사 인사를 드리며 유저님들과 제작자님들 모두가 올해 모든 일이 행복함이 가득하길 바라겠습니다.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Bar */}
        <div
          className={`flex items-center justify-end border-t px-6 py-3.5 shrink-0 text-xs ${
            isDarkMode ? 'border-[#332822] bg-[#1E1714]' : 'border-[#E8DFD5] bg-[#F3EDE4]'
          }`}
        >
          <button
            onClick={onClose}
            className={`rounded-full px-4 py-1.5 font-bold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-amber-500/20 text-amber-300 border border-amber-600/50 hover:bg-amber-500/30'
                : 'bg-[#6B1E29] text-white hover:bg-[#852634]'
            }`}
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
