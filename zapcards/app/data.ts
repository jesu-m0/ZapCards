import { Topic } from './types';

export const topics: Topic[] = [
  {
    id: 'food',
    title: 'Food & Drinks',
    description: 'Learn essential Spanish vocabulary for food and beverages',
    cards: [
      ["Water", "Agua"],
      ["Bread", "Pan"],
      ["Milk", "Leche"],
      ["Coffee", "Café"],
      ["Apple", "Manzana"],
      ["Banana", "Plátano"],
      ["Chicken", "Pollo"],
      ["Rice", "Arroz"],
      ["Fish", "Pescado"],
      ["Orange", "Naranja"]
    ]
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Master Spanish numbers from 1 to 10',
    cards: [
      ["One", "Uno"],
      ["Two", "Dos"],
      ["Three", "Tres"],
      ["Four", "Cuatro"],
      ["Five", "Cinco"],
      ["Six", "Seis"],
      ["Seven", "Siete"],
      ["Eight", "Ocho"],
      ["Nine", "Nueve"],
      ["Ten", "Diez"]
    ]
  }
];