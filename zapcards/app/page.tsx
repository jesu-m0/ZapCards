"use client";
import React, { useState } from "react";
import { topics } from "./data";
import { FlashCard } from "./cardComponent/FlashCard";
import GermanFlag from './assets/flags/flag-german.svg'; 
import EnglishFlag from './assets/flags/flag-english.svg'; 
import SpanishFlag from './assets/flags/flag-spanish.svg';

// Function to shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedFrontLanguage, setSelectedFrontLanguage] = useState(null);
  const [currentDeck, setCurrentDeck] = useState([]); // Array to hold the current deck of cards
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle topic selection and initialize the deck
  const handleTopicSelect = (topic) => {
    const shuffledCards = shuffleArray([...topic.cards]); // Shuffle cards
    setCurrentDeck(shuffledCards); // Initialize the deck with shuffled cards
    setSelectedTopic(topic);
    setSelectedFrontLanguage(null);
    setIsFlipped(false);
  };

  // Handle front language selection
  const handleLanguageSelect = (frontLanguage) => {
    setSelectedFrontLanguage(frontLanguage);
  };

  // Flip the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Mark card as correct
  const handleCorrect = () => {
    if (currentDeck.length === 0) return; // No cards left to process

    setIsFlipped(false); // Reset flip state
    setTimeout(() => {
          // Remove the current card (first element) from the deck
          const updatedDeck = [...currentDeck];
          updatedDeck.shift(); // Remove the first card
          setCurrentDeck(updatedDeck); // Update the deck
    },500)
  };

  // Mark card as incorrect
  const handleIncorrect = () => {
    if (currentDeck.length === 0) return; // No cards left to process

    setIsFlipped(false); // Reset flip state

    setTimeout(() => {
          // Move the current card (first element) to the end of the deck
          const updatedDeck = [...currentDeck];
          const incorrectCard = updatedDeck.shift(); // Remove the first card
          updatedDeck.push(incorrectCard); // Add it to the end
          setCurrentDeck(updatedDeck); // Update the deck
    },500)

  };

  // Go back to topic selection
  const handleBack = () => {
    setSelectedTopic(null);
    setCurrentDeck([]);
    setSelectedFrontLanguage(null);
    setIsFlipped(false);
  };

  // Render topic selection screen
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

  // Render language selection screen
  if (!selectedFrontLanguage) {
    const availableLanguages = Object.keys(selectedTopic.cards[0]);
    return (
      <div className="m-4">
        <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-sm p-6 rounded-2xl text-center">
            <p className="font-black text-4xl">Front side language</p>
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

  // Completion screen: Show only when all cards are correct
  if (currentDeck.length === 0) {
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

  // Get the current card
  const currentCard = currentDeck[0]; // Always show the first card in the deck

  // Render flashcard screen
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
          Progress: {selectedTopic.cards.length - currentDeck.length}/{selectedTopic.cards.length} cards
        </div>
      </div>
    </div>
  );
}