import { Topic } from './types';

export const topics: Topic[] = [
      {
        id: "Food",
        title: "Food",
        description: "Vocabulary related to food in different languages.",
        cards: [
          { english: "apple", german: "Apfel", spanish: "manzana" },
          { english: "bread", german: "Brot", spanish: "pan" },
          { english: "cheese", german: "Käse", spanish: "queso" },
        ],
      },
      {
        id: "House",
        title: "House",
        description: "Vocabulary of things in the house.",
        cards: [
          { english: "chair", german: "Stuhl", spanish: "silla" },
          { english: "table", german: "Tisch", spanish: "mesa" },
          { english: "window", german: "Fenster", spanish: "ventana" },
        ],
      },
      {
        id: "Animals",
        title: "Animals",
        description: "Words related to animals.",
        cards: [
          { english: "dog", german: "Hund", spanish: "perro" },
          { english: "cat", german: "Katze", spanish: "gato" },
          { english: "elephant", german: "Elefant", spanish: "elefante" },
        ],
      },
      {
        id: "Verbs",
        title: "Verbs (past, participle and infinitive)",
        description: "List of verbs in their different forms.",
        cards: [
          { english: "eat", german: "essen", spanish: "comer" },
          { english: "ate", german: "aß", spanish: "comió" },
          { english: "eaten", german: "gegessen", spanish: "comido" },
        ],
      },
      {
        id: "CommonWords",
        title: "1500 most common words",
        description: "The most used words in everyday conversations.",
        cards: [
          { english: "hello", german: "hallo", spanish: "hola" },
          { english: "thank you", german: "danke", spanish: "gracias" },
          { english: "please", german: "bitte", spanish: "por favor" },
        ],
      },
      {
        id: "Sports",
        title: "Sports",
        description: "Common sports terms.",
        cards: [
          { english: "soccer", german: "Fußball", spanish: "fútbol" },
          { english: "tennis", german: "Tennis", spanish: "tenis" },
          { english: "basketball", german: "Basketball", spanish: "baloncesto" },
          { english: "goalkeeper", german: "Torwart", spanish: "portero" },
          { english: "center", german: "Mitte", spanish: "centro" },
          { english: "shot", german: "Schuss", spanish: "tiro" },
          { english: "pass", german: "Pass", spanish: "pase" },
          { english: "defender", german: "Verteidiger", spanish: "defensor" },
          { english: "midfielder", german: "Mittelfeldspieler", spanish: "centrocampista" },
          { english: "forward", german: "Stürmer", spanish: "delantero" },
          { english: "referee", german: "Schiedsrichter", spanish: "árbitro" },
          { english: "penalty", german: "Strafstoß", spanish: "penalti" },
          { english: "corner", german: "Ecke", spanish: "córner" },
          { english: "kickoff", german: "Anstoß", spanish: "saque inicial" },
        ],
      },
      {
        id: "Adjectives",
        title: "Adjectives",
        description: "List of common adjectives.",
        cards: [
          { english: "big", german: "groß", spanish: "grande" },
          { english: "small", german: "klein", spanish: "pequeño" },
          { english: "fast", german: "schnell", spanish: "rápido" },
        ],
      },
    ];