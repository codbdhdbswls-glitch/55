export type FactionId = 'preservation' | 'stimulation' | 'predation' | 'curator';

export interface Faction {
  id: FactionId;
  name: string;
  subName: string;
  quote: string;
  philosophy: string;
  targetBiddingPreference: string;
  preferredState: string;
  badgeColor: string;
  accentColor: string;
  symbol: string;
  detail: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  frenchOrEnglish: string;
  category: 'ingredients' | 'conditions' | 'rules';
  meaning: string;
  exampleSentence: string;
  contextNote?: string;
}

export interface QnAItem {
  id: string;
  question: string;
  subtitle: string;
  category: string;
  answerParagraphs: string[];
  keyTakeaway: string;
}

export interface AuctionBid {
  id: string;
  bidder: string;
  bidderType: 'angel' | 'demon' | 'curator';
  amountGlace: number;
  message: string;
  timestamp: string;
  paddleColor: string;
}
