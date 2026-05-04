import type { Pokemon } from '../models/Pokemon';
import type { Move } from '../models/Move';

export class BattleEngine {
  static calculateDamage(_attacker: Pokemon, _defender: Pokemon, move: Move): number {
    // Simple formula for initial phase: Random variation of power
    const variance = 0.85 + Math.random() * 0.15;
    const damage = Math.floor(move.power * variance);
    return damage;
  }

  static applyDamage(defender: Pokemon, damage: number): Pokemon {
    return {
      ...defender,
      currentHp: Math.max(0, defender.currentHp - damage)
    };
  }

  static isDefeated(pokemon: Pokemon): boolean {
    return pokemon.currentHp <= 0;
  }
}
