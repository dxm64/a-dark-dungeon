import { StateManager } from "../services/state-manager";

export abstract class Enemy {
  id: string;
  name: string;
  color: string;

  health: number;
  alive: boolean;

  takeDamage(state: StateManager, dmg: number) {
    this.health -= dmg;
    if(this.health <= 0) this.alive = false;

    const originalColor = this.color;
    state._tween.start(0, 6, this.alive ? 1000 : 500, (value) => {
      const v = Math.floor(value);
      if(v % 2 == 0) this.color = 'white';
      else this.color = 'red';
    }, state._lerp.noEase, () => {
      if(this.alive) {
        this.color = originalColor;
      } else {
        state.enemies = state.enemies.filter(e => e != this);
      }
    }, `${this.id}_hit`);
  }
}
