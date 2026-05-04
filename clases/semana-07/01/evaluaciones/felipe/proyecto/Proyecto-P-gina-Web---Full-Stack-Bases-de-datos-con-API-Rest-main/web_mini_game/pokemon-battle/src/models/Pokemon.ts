import type { Move } from './Move';

export interface Pokemon {
  id: string;
  name: string;
  level: number;
  maxHp: number;
  currentHp: number;
  moves: Move[];
  frontSprite: string;
  backSprite: string;
}

// Initial Data Factory
export const createCharmander = (): Pokemon => ({
  id: 'charmander',
  name: 'CHARMANDER',
  level: 5,
  maxHp: 100,
  currentHp: 100,
  frontSprite: 'web_mini_game/pokemon-battle/dist/charmander_front.gif',
  backSprite: 'web_mini_game/pokemon-battle/dist/charmander_back.gif',
  moves: [
    { id: 'scratch', name: 'Arañazo', power: 40, type: 'Normal', accuracy: 100 },
    { id: 'ember', name: 'Ascuas', power: 40, type: 'Fire', accuracy: 100 }
  ]
});

export const createSquirtle = (): Pokemon => ({
  id: 'squirtle',
  name: 'SQUIRTLE',
  level: 5,
  maxHp: 100,
  currentHp: 100,
  frontSprite: 'web_mini_game/pokemon-battle/dist/squirtle_front.gif',
  backSprite: 'web_mini_game/pokemon-battle/dist/squirtle_back.gif',
  moves: [
    { id: 'tackle', name: 'Placaje', power: 40, type: 'Normal', accuracy: 100 },
    { id: 'watergun', name: 'Pistola Agua', power: 40, type: 'Water', accuracy: 100 }
  ]
});
