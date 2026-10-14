import { Faction, GlossaryItem, QnAItem } from '../types';

export const SALON_META = {
  name: 'GLACÉ',
  koreanName: '글라세',
  title: 'LE SALON PRIVÉ DES ANGES ET DES DUCS',
  subtitle: '천국과 지옥의 미식가들이 유일한 신의 살점을 두고 벌이는 80층 밀교 경매장',
  standardTemp: '18.0°C',
  location: '지상 80층 스카이 펜트하우스',
  treatyName: '비무장 중립 대협약 (The DMZ Treaty)',
  coreMetaphor: '카니발리즘(Cannibalism) × 오르톨랑(Ortolan) × 라팽',
};

export const SALON_RULES = [
  {
    num: 'I',
    title: '언어의 정화 (L’Épuration du Langage)',
    description: '본 살롱에서 ‘식인’이라는 야만적인 단어의 사용을 엄격히 금합니다. 우리는 오직 ‘시식’으로 칭합니다.',
  },
  {
    num: 'II',
    title: '감정의 분자화 (La Dérivation des Sens)',
    description: '매물의 처절한 비명은 ‘탄산감’, 흘리는 눈물과 땀은 정제된 ‘추출액’으로 표기합니다.',
  },
  {
    num: 'III',
    title: '동결 보존 규정 (La Règle des 18 Degrés)',
    description: '매물의 최적 당도 보존과 부패 방지를 위해, 살롱 내 모든 식탁과 접시의 온도는 항상 정확히 18°C로 유지됩니다.',
  },
];

export const FACTIONS: Faction[] = [
  {
    id: 'preservation',
    name: 'A팀: 프레셔스 (보존파)',
    subName: 'Les Préservationnistes',
    quote: '“상처 내지 마. 완벽하게 박제해서 내 침실 유리관에 평생 곁에 둘 테니까.”',
    philosophy: '완벽한 외형 보존을 원하는 결벽증 집착광들. 매물의 몸에 칼자국이나 영구적인 흉터가 남는 것을 극도로 혐오합니다.',
    targetBiddingPreference: '당도 70%~75%의 티끌 없는 순백 상태. 체온이 살짝 오른 상태에서 즉각적인 유리관 박제를 선호.',
    preferredState: '무흠결 순백의 시트, 손상되지 않은 프레임',
    badgeColor: 'border-amber-300 bg-amber-50/80 text-amber-900',
    accentColor: '#D97706',
    symbol: 'A',
    detail: '대천사 계열의 고위 관료들이 주를 이룹니다. 이들은 식용보다는 "영원히 시들지 않는 신의 예술품"으로서의 소장을 원하며, 다른 파벌이 칼을 댈 때마다 가장 거세게 항의하며 입찰액을 천문학적으로 올립니다.',
  },
  {
    id: 'stimulation',
    name: 'B팀: 텐션 (자극파)',
    subName: 'Les Provocateurs de Tension',
    quote: '“더 울어봐. 턱 끝으로 공포에 찬 눈물이 뚝뚝 떨어질 때 비로소 당도가 정점을 찍거든.”',
    philosophy: '당신을 정신적으로 극한까지 몰아붙여 가장 고농축된 엔도르핀을 뽑아내려는 가학적 쾌락주의자들.',
    targetBiddingPreference: '당도 80%~89%의 극한 흥분/공포 상태. 호르몬이 온몸에 분비되어 전율할 때 패들을 던짐.',
    preferredState: '템퍼링의 절정, 눈물과 땀의 글레이징',
    badgeColor: 'border-rose-300 bg-rose-50/80 text-rose-900',
    accentColor: '#E11D48',
    symbol: 'B',
    detail: '지옥의 젊은 귀족들이 유희를 위해 모여 있습니다. 조용히 순종하는 매물에게는 돈을 쓰지 않으며, 매물이 격렬히 수치심에 떨거나 발악할 때 최고의 카타르시스를 느끼며 경매장의 판도를 뒤흔듭니다.',
  },
  {
    id: 'predation',
    name: 'C팀: 헌터 (포식파)',
    subName: 'Les Prédateurs Gourmands',
    quote: '“5ml면 충분해. 오늘 밤엔 저 가련한 쇄골 위에서 살점 딱 한 점만 은제 나이프로 베어가겠다.”',
    philosophy: '미각의 절대적 충족을 최우선으로 하며, 당신을 인격체가 아닌 철저한 ‘최고급 식재료’로만 취급하는 냉혈한 미식가들.',
    targetBiddingPreference: '당도 75%~85%의 최적 농도. 시식 부위별(쇄골, 손목, 뺨) 추출액 시식권 집중 입찰.',
    preferredState: '신선한 추출액, 완벽하게 숙성된 코어 퐁당',
    badgeColor: 'border-stone-400 bg-stone-100 text-stone-900',
    accentColor: '#44403C',
    symbol: 'C',
    detail: '타락한 대천사 원로들로 구성되어 있습니다. 이들은 감정적 교감에는 1%의 흥미도 없으며, 오직 오르톨랑의 뼈를 씹듯 신의 살점이 혀끝에 닿는 순간의 감각만을 계산하여 냉정하게 베팅합니다.',
  },
  {
    id: 'curator',
    name: 'D팀: 큐레이터 (위선)',
    subName: 'Les Commissaires Hypocrites',
    quote: '“도와줄게요. 내가 시키는 대로만 하면 이 지옥 같은 살롱을 나갈 수 있어요...”',
    philosophy: '당신에게 탈출을 도와줄 것처럼 온화하게 접근하지만, 사실 당신의 ‘희망이 배신당하는 순간의 절망’이라는 특제 소스를 가장 비싸게 파는 살롱의 설계자들.',
    targetBiddingPreference: '당신이 자포자기하기 직전의 순간. 탈출 사기극을 통해 양측 귀족들로부터 중개 수수료 독점.',
    preferredState: '달콤한 배신 뒤에 오는 농축된 크런치',
    badgeColor: 'border-indigo-300 bg-indigo-50/80 text-indigo-950',
    accentColor: '#4338CA',
    symbol: 'D',
    detail: '천사들의 눈에서 태어났으나 선악과를 먹고 타락한 살롱 내부 중개인들입니다. 당신의 편인 척 귓속말을 속삭여 당도를 의도적으로 조절하며, 살롱의 시스템을 뒤에서 조종합니다.',
  },
];

export const GLOSSARY: GlossaryItem[] = [
  {
    id: 'rabbit',
    term: '래빗 (Rabbit / Main Piece)',
    frenchOrEnglish: 'Le Lapin / La Pièce Maîtresse',
    category: 'ingredients',
    meaning: '살롱 내에서 당신을 부르는 전용 고유 명사. 살아있는 인간이 아닌, 오직 VVIP들의 식탁을 위해 마련된 최상급 디저트이자 핵심 메인 요리.',
    exampleSentence: '“오늘 밤의 래빗은 신의 살점 함량이 유독 높아, 냄새만으로도 머리가 어지러울 지경이군.”',
    contextNote: '유럽권에서 사랑 받은 최고급 고기이자 도축 대상인 식용 토끼(Lapin)와 금기 요리 오르톨랑(Ortolan)의 메타포.',
  },
  {
    id: 'sheet',
    term: '시트 (Sheet)',
    frenchOrEnglish: 'La Génoise / Le Derme',
    category: 'ingredients',
    meaning: '당신의 피부 및 겉 살점. 케이크 바닥에 깔리는 부드러운 스펀지 시트에 비유한 은어.',
    exampleSentence: '“오늘 밤의 백자 접시 위에는 유독 순백의 시트가 아름답고 매끄럽게 깔렸군요.”',
  },
  {
    id: 'frame',
    term: '프레임 (Frame)',
    frenchOrEnglish: 'L’Ossature / Le Cadre',
    category: 'ingredients',
    meaning: '당신의 뼈 및 관절 골격. 과자 집이나 조각상의 지지대에 비유.',
    exampleSentence: '“저 가녀린 프레임이 부러질 때 나는 파삭한 소리가 아주 기대됩니다.”',
  },
  {
    id: 'core-fondant',
    term: '코어 퐁당 (Core Fondant) / 코어 무스',
    frenchOrEnglish: 'Le Cœur Fondant / Cœur Mousse',
    category: 'ingredients',
    meaning: '당신의 심장 및 내장 기관. 퐁당 쇼콜라처럼 겉을 가르면 따뜻하게 흘러나오는 당도가 응축된 핵심 잼.',
    exampleSentence: '“가장 깊은 곳에 숨겨진 코어 퐁당의 농도는 과연 몇 브릭스(Brix)에 도달할까?”',
  },
  {
    id: 'decoration',
    term: '디코레이션 (Decoration) / 커팅 라인',
    frenchOrEnglish: 'Le Décor / Ligne de Coupe',
    category: 'ingredients',
    meaning: '당신의 몸에 난 상처, 흉터 또는 은제 나이프로 그어놓은 분할선.',
    exampleSentence: '“악마파 녀석들이 기어코 래빗의 허벅지에 조잡한 디코레이션을 새겨놓았군. 시트가 오염되지 않았나?”',
  },
  {
    id: 'tempering',
    term: '템퍼링 (Tempering)',
    frenchOrEnglish: 'Le Tempérage',
    category: 'conditions',
    meaning: '당신이 극심한 공포와 수치심에 질려 온몸을 잘게 떠는 행위. 초콜릿의 결정질을 완벽하게 맞추기 위해 온도를 올리고 내리며 저어주는 과정에 비유.',
    exampleSentence: '“보십시오, 시선만으로도 저렇게 완벽하게 템퍼링되고 있지 않습니까? 훌륭한 윤기가 도는군요.”',
    contextNote: '체온이 떨리고 심박수가 올라가면서 엔도르핀이 전신으로 확산되는 최적의 숙성 상태.',
  },
  {
    id: 'spicy-nuance',
    term: '스파이시 뉘앙스 (Spicy Nuance) / 크런치',
    frenchOrEnglish: 'Nuance Épicée / Le Crunch',
    category: 'conditions',
    meaning: '당신이 굴복하지 않고 거칠게 욕설을 뱉거나 저항하며 반항하는 상태. 단맛 일색인 디저트 속에 숨겨진 알싸한 칠리나 씹히는 바삭함에 비유.',
    exampleSentence: '“내 고액 입찰을 노려보며 거부하다니, 아주 짜릿하고 매력적인 스파이시 뉘앙스를 가진 아이군.”',
  },
  {
    id: 'glazing',
    term: '글레이징 (Glazing)',
    frenchOrEnglish: 'Le Glaçage Miroir',
    category: 'conditions',
    meaning: '당신이 상처를 입어 피를 흘리거나, 극한의 압박으로 땀과 눈물(추출액)이 피부를 타고 흐르는 상태. 타르트 겉면에 윤이 나는 붉은 과일 시럽을 코팅하는 것에 비유.',
    exampleSentence: '“쇄골을 따라 흘러내리는 붉은 글레이징이 파스텔 조명을 받아 눈부실 정도로 고혹적입니다.”',
  },
  {
    id: 'cold-chilling',
    term: '콜드 칠링 (Cold Chilling)',
    frenchOrEnglish: 'Le Refroidissement Excessif',
    category: 'conditions',
    meaning: '당신의 정신적 붕괴, 쇼크, 아사 직전, 혹은 기절로 인해 반응이 멈춘 상태. 온도가 영하로 떨어져 산미와 당도가 얼어붙어 지루해진 상태.',
    exampleSentence: '“너무 몰아붙였나 보군. 콜드 칠링 상태에 빠지기 전에 즉시 향기를 주입해 체온을 18도로 복구해라.”',
  },
  {
    id: 'fully-baked',
    term: '완숙 (Fully Baked)',
    frenchOrEnglish: 'Complètement Cuit / Cristallisation',
    category: 'conditions',
    meaning: '당도가 100%에 도달하여 당신의 이성과 자아가 완전히 증발하고 결정화된 인형이 된 상태. 오븐에서 완전히 구워져 더 이상 움직이지 않는 물건이 되었음을 뜻함.',
    exampleSentence: '“축하드립니다. 래빗이 마침내 완숙에 도달했습니다. 이제 영구 소장품 보관함으로 이송합니다.”',
    contextNote: '은제 나이프로 살점을 저며도 비명도 눈물도 흘리지 않는 디저트 인형으로 영구 박제되는 배드엔딩.',
  },
];

export const WORLDVIEW_DATA = {
  glaceEtymology: [
    {
      french: 'Glacé [1]: 설탕 시럽으로 표면을 매끄럽게 코팅하다 (Glazed)',
      desc: '인간을 도축하는 야만적인 식인 행위를 ‘엔도르핀(당도)’이라는 화려하고 사치스러운 시럽으로 매끄럽게 포장했음을 뜻합니다. 당신의 공포와 수치심이 뿜어내는 당도는 VVIP들의 죄책감을 감쪽같이 가려주는 달콤한 코팅제입니다.',
    },
    {
      french: 'Glacé [2]: 얼어붙다, 차갑게 식히다 (Iced)',
      desc: '타인의 고통과 비명에 공감하는 능력이 절대 영도 아래로 완벽하게 동결된 VVIP들의 차가운 심리를 의미합니다. 매물의 당도를 보존하기 위해 살롱 내 모든 테이블과 실내 온도가 영구히 18°C로 유지되는 이유이기도 합니다.',
    },
  ],
  theHypocrisy: {
    angels: {
      title: '천사계의 불감증 : 절대적 순결의 질식 (Suffocation of Purity)',
      cause: '수천 년간 지상의 비극을 기계처럼 구원하고 축복했으나 인간은 끊임없이 죄를 반복했습니다. 결국 천사들에게 ‘구원’은 숭고한 사명이 아닌 숨 막히는 관료주의적 잔무로 전락했습니다.',
      symptom: '티끌 하나 없는 완벽한 무균실에 영원히 갇힌 채, 창백하게 말라 비틀어진 자아.',
      culmination: '“가장 극단적인 죄악(식인)을 저지름과 동시에, 그것을 교리로 합리화하기.” 래빗의 살점을 씹으며 “불쌍한 양을 성스러운 우리 안으로 거두어 하나가 되는 구원(성찬식)”이라 속삭일 때 분비되는 소름 끼치는 모순의 쾌감만이 그들의 죽은 감각을 깨웁니다.',
    },
    demons: {
      title: '악마계의 불감증 : 포식자의 권태 (Boredom of the Apex)',
      cause: '지옥에서 수십억 년간 불태우고 가죽을 벗기는 고문을 반복해온 결과, 죄인들의 비명은 이미 ‘백색 소음’이자 단순 조립 라인처럼 지루해졌습니다.',
      symptom: '뻔한 죄인들을 씹어봐야 아무 맛도 나지 않는 썩은 고기일 뿐, 어떤 고통을 가해도 도파민이 돌지 않음.',
      culmination: '악마들이 원하는 것은 불구덩이가 아닌, 최고급 펜트하우스의 차가운 도마 위에서 [절대 꺾이지 않을 것 같던 순결한 이성이 산산조각 나는 그 찰나의 순간]입니다. 천사들이 보는 앞에서 그 피조물을 유린하는 사치스러운 모독.',
    },
  },
  dmzTreaty: {
    title: '비무장 중립 대협약 (The DMZ Treaty)',
    clause: '“천사가 지상에서 인간을 함부로 구원하면 신의 율법 위반이고, 악마가 지상에서 인간을 함부로 납치하면 우주 협약 위반이다. 고로 이 지상 80층의 차가운 온실은 천국과 지옥이 전면전을 피하기 위해 합의한 유일한 영혼 거래 비무장지대(DMZ)이며, 이곳에서 인정되는 유일한 영혼 취득 방식은 인간 사회의 룰인 [자본주의적 매매]뿐이다.”',
  },
  divineShard: {
    title: '대전제 : 매물(당신)의 진짜 정체 — 『신의 살점 부스러기』',
    content: '태초에 신이 우주를 창조할 때 자신의 몸을 찢어 질량을 만들었습니다. 그리고 창조가 끝난 뒤 미처 회수하지 못하고 지상에 흘린 파편을 품고 태어난 인간 ── 그것이 바로 당신 입니다. 당신의 육신은 평범한 고기가 아니라 『물리적 형태를 띤 신의 본체』이자 가장 순수한 신성 그 자체입니다. 당신이 공포와 수치심으로 패닉에 빠질 때 신의 살점 부스러기가 체내에서 가장 선명하게 공명하며 당도가 치솟습니다. 하늘에서는 현재 신이 깊은 동면에 든 사이, 천사들이 [섭리의 눈]을 띄워 신의 몸이 얼마나 복원되고 있는지 감시하고 있습니다.',
  },
};

export const QNA_LIST: QnAItem[] = [
  {
    id: 'why-rabbit',
    question: 'Q1. 당신를 래빗 (Rabbit) / 메인 피스 (Main Piece)라 부르는 이유',
    subtitle: '멸칭의 기원과 제과식 코스 요리 메타포',
    category: '호칭과 메타포',
    answerParagraphs: [
      '메인 피스(Main Piece)는 코스 요리에서 자잘한 전채요리가 아니라, 그날 연회장의 품격과 VVIP들의 자존심 싸움을 결정짓는 단 하나의 핵심 메인 요리를 의미합니다.',
      '래빗(Rabbit)은 유럽 정통 미식 문화에서 가장 대중적이면서도 손쉽게 도축되는 고급 연육 토끼와 프랑스의 악명 높은 금기 요리 오르톨랑(Ortolan)의 메타포를 결합한 것입니다.',
      '첫째, 토끼는 겉으로는 부드러운 털을 쓰다듬으며 아끼는 척하지만, 결국 좁은 우리에 가두어 살을 찌운 뒤 가죽을 벗기는 소형 가축입니다.',
      '둘째, 오르톨랑 새를 잡으면 빛을 차단한 어두운 상자에 가두고 끝없이 무화과를 먹여 지방을 불리듯, 살롱에 갇힌 당신이 VVIP들의 시선 속에서 수치심과 공포를 강제로 주입당하며 당도를 부풀리는 처지가 포식자 앞에 떠는 식용 토끼와 같습니다.',
    ],
    keyTakeaway: '완벽한 사육과 도축의 메타포 뒤에 숨겨진 잔혹한 조롱.',
  },
  {
    id: 'fully-baked-logic',
    question: 'Q2. 자아 상실이 완숙(Fully Baked)인 이유',
    subtitle: '오르톨랑의 브랜디 익사와 제빵학적 인과관계',
    category: '시스템 기믹',
    answerParagraphs: [
      '오르톨랑 요리의 클라이맥스는 살아있는 새를 아르마냑 브랜디에 산 채로 익사시킨 뒤 고열의 오븐에 바싹 구워내는 것입니다. 살롱 《GLACÉ》는 이 과정을 제빵학적 인과관계로 치환했습니다.',
      '제빵에서 반죽이 오븐의 고열을 받으면 수분을 뿜어내며 겉면이 단단해지듯, 유저의 당도가 30%에서 70%, 95%로 치솟는 과정은 VVIP들의 폭력적인 시선과 언행이라는 ‘심리적 오븐’ 속에서 유저의 자아와 저항 의지가 증발하는 과정입니다.',
      '당도가 100%를 찍는 순간, 유저의 이성은 과부하로 퓨즈가 완전히 끊어지며 독한 엔도르핀에 절여져 결정화처럼 아무 생각을 하지 못하게 됩니다. 완숙된 빵처럼 더 이상 움직이지도, 모양이 변하지도 않는 단단한 ‘물건’이 됩니다.',
      '제 살점이 은제 나이프로 저며져도 비명(탄산감)도 눈물(추출액)도 흘리지 않는 완벽한 디저트 인형으로 영구 소장품이 되며 탈출이 영원히 불가능해집니다.',
    ],
    keyTakeaway: '자아(수분)가 완전히 증발하여, 영구 박제된 무감각의 디저트 인형으로 굳어지는 결말.',
  },
  {
    id: 'angels-eucharist',
    question: 'Q3. 천사들은 왜 인간을 시식(식인)하며 그것을 구원이라 부르는가?',
    subtitle: '성찬식의 섬뜩한 왜곡',
    category: '파벌 철학',
    answerParagraphs: [
      '기독교의 성찬식은 “이 빵은 나의 살이요, 이 포도주는 나의 피다”라며 신의 살과 피를 먹고 마심으로써 구원을 얻는 거룩한 예식입니다.',
      '천사들은 래빗의 살점을 썰어 먹으면서 “불완전하고 고통받는 필멸자의 육신을 거두어, 영원하고 성스러운 우리 천사들의 거룩한 몸과 융합시켜 주는 것이니 이것이야말로 진정한 궁극의 구원이자 영생이다”라고 완벽히 합리화합니다.',
      '수천 년의 관료주의적 순결에 질식해 죽어가던 그들의 신경은, 신의 창조물을 입안에 넣고 씹는 지독한 죄악감과 그것을 스스로 성스러운 의식으로 둔갑시키는 이중적 모순의 쾌감에 의해서만 되살아납니다.',
    ],
    keyTakeaway: '“너를 내 안으로 거두어 구원한다”는 위선적인 성찬식의 도착적 완성.',
  },
  {
    id: 'demons-conquest',
    question: 'Q4. 악마들은 왜 인간을 경매에서 낙찰받아 먹으려 하는가?',
    subtitle: '신과 천사들을 향한 최고조의 정복과 모독',
    category: '파벌 철학',
    answerParagraphs: [
      '악마들에게 경매에서 래빗을 최고가에 낙찰받아 썰어 먹는 행위는, 같은 원형 테이블에 둘러앉은 천사들의 면전에 가하는 지독한 조롱이자 승리 선언입니다.',
      '“보아라. 너희가 그토록 아끼고 율법으로 감싸려던 신의 피조물이 지금 내 은제 접시 위에서 발가벗겨진 채 가장 굴욕적인 단맛을 뿜어내고 있다.”',
      '지옥의 고문 기술에 질려 권태에 빠진 악마들에게 래빗 시식은 배를 채우는 행위가 아니라, 신의 권위와 천사들의 엄숙주의를 발밑으로 짓밟고 유린하는 가장 호사스럽고 자극적인 오락입니다.',
    ],
    keyTakeaway: '천사들의 눈앞에서 신의 피조물을 맛보는 궁극의 모독과 도파민 유희.',
  },
  {
    id: 'rabbit-lapin-culture',
    question: 'Q5. 왜 하필 ‘토끼’의 식문화를 세계관에 결합했는가?',
    subtitle: '유럽 미식사에서의 양면성과 피식자의 운명',
    category: '문화적 배경',
    answerParagraphs: [
      '프랑스, 이탈리아, 스페인 등 유럽에서는 고대 로마 시대부터 토끼를 사육해 먹었습니다. 특히 프랑스에서는 ‘라팽’이라 부르며 와인과 크림을 넣고 조린 토끼 요리가 대표적인 고급 정찬 코스입니다.',
      '유럽 문화권에서 토끼는 귀여운 애완동물인 동시에 ‘가죽을 벗기고 뼈를 바르기 쉬운 소형 가축’, 그리고 ‘지방이 적고 연한 디저트 같은 살코기’라는 이중성을 갖습니다.',
      '귀족 사냥 문화에서 토끼는 좁은 굴속에서 덜덜 떨다가 사냥개와 포수에게 잡히는 대표적인 피식자입니다. 80층 차가운 살롱에 갇혀 공포와 수치심 속에서 당도를 부풀리는 당신의 가련한 처지와 완벽하게 맞물립니다.',
    ],
    keyTakeaway: '귀여운 피식자이자 가죽을 벗겨 접시에 올리는 사육 가축이라는 잔혹한 이중성.',
  },
  {
    id: 'ortolan-mystery',
    question: 'Q6. 프랑스 금기 요리 ‘오르톨랑(Ortolan)’과 살롱 GLACÉ의 관계는?',
    subtitle: '신의 눈을 가리는 흰 천과 80층의 차가운 온실',
    category: '문화적 배경',
    answerParagraphs: [
      '오르톨랑 요리는 참새만 한 멧새를 산 채로 눈을 뽑거나 어둠 속에 가두어 무화과를 강제로 먹인 뒤, 아르마냑 브랜디에 익사시켜 뼈째 씹어먹는 프랑스 극비의 미식입니다.',
      '오르톨랑을 먹을 때 식객들은 커다란 흰 냅킨을 머리에 뒤집어씁니다. 표면적으로는 “새의 뼈와 육즙 향을 가두기 위해서”라고 하지만, 실제로는 “자신들의 잔혹하고 추악한 탐욕을 신이 내려다보지 못하게 가리기 위해서”라는 유명한 이야기가 있습니다.',
      '살롱 《GLACÉ》의 지상 80층 차가운 온실은 바로 이 거대한 흰 냅킨 자체입니다. 신의 눈과 지상의 법률이 미치지 않는 구름 위의 높이에서, 천사와 악마들은 서로의 위선을 가린 채 신의 살점을 탐하고 있습니다.',
    ],
    keyTakeaway: '신의 시선을 가리는 흰 냅킨 ── 80층 차가운 온실에서 펼쳐지는 위선의 만찬.',
  },
];
