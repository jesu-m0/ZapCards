"use client";
import React, { useState } from "react";
import { topics } from "./data";
import { FlashCard } from "./cardComponent/FlashCard";
import GermanFlag from './assets/flags/flag-german.svg'; 
import EnglishFlag from './assets/flags/flag-english.svg'; 
import SpanishFlag from './assets/flags/flag-spanish.svg';

// Función para mezclar el array usando el algoritmo Fisher-Yates
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
  }
  return array;
}

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedFrontLanguage, setSelectedFrontLanguage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStatuses, setCardStatuses] = useState([]);
  const [pendingIncorrectCards, setPendingIncorrectCards] = useState([]); // Array para tarjetas incorrectas

  // Manejar la selección de un tema y mezclar las tarjetas
  const handleTopicSelect = (topic) => {
    const shuffledCards = shuffleArray([...topic.cards]); // Mezclar tarjetas
    setSelectedTopic({ ...topic, cards: shuffledCards }); // Asignar tarjetas mezcladas
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedFrontLanguage(null);
    setCardStatuses(new Array(shuffledCards.length).fill('pending')); // Resetear estados de tarjetas
    setPendingIncorrectCards([]); // Limpiar tarjetas incorrectas pendientes
  };

  // Manejar la selección del idioma frontal
  const handleLanguageSelect = (frontLanguage) => {
    setSelectedFrontLanguage(frontLanguage);
  };

  // Mover a la siguiente tarjeta
  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedTopic.cards.length);
    setIsFlipped(false);
  };

  // Voltear la tarjeta
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Marcar tarjeta como correcta
  const handleCorrect = () => {
    const newStatuses = [...cardStatuses];
    newStatuses[currentIndex] = 'correct';
    setCardStatuses(newStatuses);
    setIsFlipped(false); // Reiniciar estado de volteo
    setTimeout(() => {
      handleNextCard();
    }, 500); // Retardo para la animación
  };

  // Marcar tarjeta como incorrecta
  const handleIncorrect = () => {
    const newStatuses = [...cardStatuses];
    newStatuses[currentIndex] = 'incorrect';
    setCardStatuses(newStatuses);

    // Agregar la tarjeta incorrecta al array de pendientes
    const incorrectCard = selectedTopic.cards[currentIndex];
    setPendingIncorrectCards((prevIncorrectCards) => [...prevIncorrectCards, incorrectCard]);

    setIsFlipped(false); // Reiniciar estado de volteo
    setTimeout(() => {
      handleNextCard();
    }, 500); // Retardo para la animación
  };

  // Volver al menú de temas
  const handleBack = () => {
    setSelectedTopic(null);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedFrontLanguage(null);
    setCardStatuses([]);
    setPendingIncorrectCards([]); // Limpiar tarjetas incorrectas pendientes
  };

  // Renderizar pantalla de selección de tema
  if (!selectedTopic) {
    return (
      <div className="m-4">
        <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-sm p-6 rounded-2xl text-center">
            <p className="font-black text-4xl">Selecciona una opción</p>
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

  // Renderizar pantalla de selección de idioma
  if (!selectedFrontLanguage) {
    const availableLanguages = Object.keys(selectedTopic.cards[0]);
    return (
      <div className="m-4">
        <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-sm p-6 rounded-2xl text-center">
            <p className="font-black text-4xl">Idioma del frente</p>
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

  // Obtener la tarjeta actual y calcular el progreso
  const currentCard = selectedTopic.cards[currentIndex];
  const correctCount = cardStatuses.filter(status => status === 'correct').length;
  const totalCards = selectedTopic.cards.length;

  // Si hay tarjetas incorrectas pendientes, agregarlas al final del array
  if (currentIndex >= totalCards && pendingIncorrectCards.length > 0) {
    setSelectedTopic((prevTopic) => ({
      ...prevTopic,
      cards: [...prevTopic.cards, ...pendingIncorrectCards],
    }));
    setPendingIncorrectCards([]); // Limpiar tarjetas incorrectas pendientes
    setCurrentIndex(totalCards); // Continuar desde el final del array original
  }

  // Renderizar pantalla de finalización
  if (currentIndex >= totalCards && pendingIncorrectCards.length === 0) {
    return (
      <div className="m-4">
        <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="w-full max-w-sm p-6 rounded-2xl text-center">
            <button onClick={handleBack} className="text-xl font-semibold text-blue-600 hover:underline">
              Volver a Temas
            </button>
          </div>
          <div className="w-full max-w-sm p-6 border rounded-2xl text-center bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Felicidades! 🎉
            </h2>
            <p className="text-gray-600">¡Has dominado este tema!</p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => handleTopicSelect(selectedTopic)}
                className="w-full px-6 py-2 bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-colors"
              >
                Practicar de Nuevo
              </button>
              <button
                onClick={handleBack}
                className="w-full px-6 py-2 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors"
              >
                Elegir Otro Tema
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar pantalla de flashcards
  return (
    <div className="m-4">
      <p className="text-3xl font-bold"><span className="text-sky-500">Z</span>apCards</p>
      <div className="flex flex-col items-center gap-6 mt-6">
        <div className="w-full max-w-sm p-6 rounded-2xl text-center">
          <button onClick={handleBack} className="text-xl font-semibold text-blue-600 hover:underline">
            Volver a Temas
          </button>
        </div>
        <div className="w-full max-w-sm p-6 border rounded-2xl text-center bg-gray-100 shadow-lg">
          <FlashCard card={currentCard} isFlipped={isFlipped} frontLanguage={selectedFrontLanguage} />
          <button onClick={handleFlip} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            Voltear Tarjeta
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
          Progreso: {correctCount}/{totalCards} tarjetas
        </div>
      </div>
    </div>
  );
}