export type FlashCard = {
    english: string;
    german: string;
    spanish: string;
    italian: string;
    french: string;
    portuguese: string;
};

export type CardStatus = 'correct' | 'incorrect' | 'pending';

export type Topic = {
  id: string;
  title: string;
  description: string;
  cards: FlashCard[];
};