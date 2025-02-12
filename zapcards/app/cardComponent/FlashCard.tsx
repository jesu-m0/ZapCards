import React from 'react';
import EnglishFlag from '../assets/flags/flag-english.svg'; 
import GermanFlag from '../assets/flags/flag-german.svg'; 
import SpanishFlag from '../assets/flags/flag-spanish.svg';

interface FlashCardProps {
  card: {
    english: string;
    german: string;
    spanish: string;
  };
  isFlipped: boolean;
  frontLanguage: string;
}

const languageFlags = {
  english: <EnglishFlag className="inline-block w-6 h-6 mr-2" />,
  german: <GermanFlag className="inline-block w-6 h-6 mr-2" />,
  spanish: <SpanishFlag className="inline-block w-6 h-6 mr-2" />,
};

export function FlashCard({ card, isFlipped, frontLanguage }: FlashCardProps) {
  const availableLanguages = Object.keys(card);
  const frontText = (
    <span>
      {languageFlags[frontLanguage]}
      {card[frontLanguage]}
    </span>
  );
  const backLanguages = availableLanguages.filter(lang => lang !== frontLanguage);
  const backText = backLanguages.map(lang => (
    <div key={lang} className="flex items-center">
      {languageFlags[lang]}
      {card[lang]}
    </div>
  ));

  return (
    <div className="relative w-full h-[300px] perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
            <p className="text-3xl font-semibold text-gray-800 text-center">{frontText}</p>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
            <div className="space-y-2 text-3xl font-semibold text-gray-800 text-center">
              {backText}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}