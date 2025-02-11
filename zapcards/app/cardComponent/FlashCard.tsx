import React from 'react';
import { FlashCard as FlashCardType } from '../types';

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
}

export function FlashCard({ card, isFlipped }: FlashCardProps) {
  const [front, back] = card;

  return (
    <div className="relative w-full h-[300px] perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
            <p className="text-3xl font-semibold text-gray-800 text-center">{front}</p>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
            <p className="text-3xl font-semibold text-gray-800 text-center">{back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}