"use client";

import React, { useState } from "react";
import { topics } from "./data";
import { FlashCard } from "./cardComponent/FlashCard";

import GermanFlag from './assets/flags/flag-german.svg'; 
import EnglishFlag from './assets/flags/flag-english.svg'; 
import SpanishFlag from './assets/flags/flag-spanish.svg';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedFrontLanguage, setSelectedFrontLanguage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStatuses, setCardStatuses] = useState([]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedFrontLanguage(null);
    setCardStatuses(new Array(topic.cards.length).fill('pending'));
  };

  const handleLanguageSelect = (frontLanguage) => {
    setSelectedFrontLanguage(frontLanguage);
  };

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedTopic.cards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCorrect = () => {
    const newStatuses = [...cardStatuses];
    newStatuses[currentIndex] = 'correct';
    setCardStatuses(newStatuses);
    setIsFlipped(false); // Reset flip state
    setTimeout(() => {
      handleNextCard();
    }, 500); // Delay for the flip animation
  };

  const handleIncorrect = () => {
    const newStatuses = [...cardStatuses];
    newStatuses[currentIndex] = 'incorrect';
    setCardStatuses(newStatuses);
    setIsFlipped(false); // Reset flip state
    setTimeout(() => {
      handleNextCard();
    }, 500); // Delay for the flip animation
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedFrontLanguage(null);
    setCardStatuses([]);
  };

  if (!selectedTopic) {
    return (
      <div className="m-4">
        <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-sm p-6 rounded-2xl text-center">
            <p className="font-black text-4xl">Select an option</p>
          </div>
          {topics.map((topic) => (
            <div key={topic.id} className="w-full max-w-sm p-6 border rounded-2xl text-center bg-gray-100 shadow-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer" onClick={() => handleTopicSelect(topic)}>
              <a className="text-xl font-semibold text-blue-600">{topic.title}</a>
              <p className="mt-2 text-sm text-gray-700">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedFrontLanguage) {
    const availableLanguages = Object.keys(selectedTopic.cards[0]);
    return (
      <div className="m-4">
        <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-sm p-6 rounded-2xl text-center">
            <p className="font-black text-4xl">Front side lenguaje</p>
          </div>
          {availableLanguages.map((lang) => (
            <div key={lang} className="w-full max-w-sm p-6 border rounded-2xl text-center bg-gray-100 shadow-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer" onClick={() => handleLanguageSelect(lang)}>
              <div className="flex items-center justify-center">
                {lang === 'english' && <EnglishFlag className="inline-block w-6 h-6 mr-2" />}
                {lang === 'german' && <GermanFlag className="inline-block w-6 h-6 mr-2" />}
                {lang === 'spanish' && <SpanishFlag className="inline-block w-6 h-6 mr-2" />}
                <a className="text-xl font-semibold text-blue-600">{lang.charAt(0).toUpperCase() + lang.slice(1)}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentCard = selectedTopic.cards[currentIndex];
  const correctCount = cardStatuses.filter(status => status === 'correct').length;
  const totalCards = selectedTopic.cards.length;

  if (currentIndex >= totalCards) {
    return (
      <div className="m-4">
        <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-sm p-6 rounded-2xl text-center">
            <button onClick={handleBack} className="text-xl font-semibold text-blue-600 hover:underline">
              Back to Topics
            </button>
          </div>
          <div className="w-full max-w-sm p-6 border rounded-2xl text-center bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Congrats! 🎉
            </h2>
            <p className="text-gray-600">You&apos;ve mastered this topic!</p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => handleTopicSelect(selectedTopic)}
                className="w-full px-6 py-2 bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-colors"
              >
                Practice Again
              </button>
              <button
                onClick={handleBack}
                className="w-full px-6 py-2 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors"
              >
                Choose Another Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-4">
      <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
      <div className="flex flex-col items-center gap-6 mt-6">
        <div className="w-full max-w-sm p-6 rounded-2xl text-center">
          <button onClick={handleBack} className="text-xl font-semibold text-blue-600 hover:underline">
            Back to Topics
          </button>
        </div>
        <div className="w-full max-w-sm p-6 border rounded-2xl text-center bg-gray-100 shadow-lg">
          <FlashCard card={currentCard} isFlipped={isFlipped} frontLanguage={selectedFrontLanguage} />
          <button onClick={handleFlip} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            Flip Card
          </button>
        </div>
        <div className="flex justify-center gap-4">
            <button onClick={handleCorrect} className="p-3 rounded-full bg-lime-500 text-white hover:bg-lime-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
            <button onClick={handleIncorrect} className="p-3 rounded-full bg-red-400 text-white hover:bg-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        <div className="mt-4 text-gray-600">
          Progress: {correctCount}/{totalCards} cards
        </div>
      </div>
    </div>
  );
}