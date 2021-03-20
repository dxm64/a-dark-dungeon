import { StateManager } from "../services/state-manager";
import { Enemy } from "./enemy";

export default class Slime extends Enemy {
  constructor() {
    super();

    this.id = 'slime';
    this.name = 'Slime';
    this.color = 'lightgreen';
    this.health = 20;
    this.alive = true;
  }

  takeDamage(state: StateManager, dmg: number) {
    this.health -= dmg;
    if(this.health <= 0) this.alive = false;

    state._tween.start(0, 6, this.alive ? 1000 : 500, (value) => {
      const v = Math.floor(value);
      if(v % 2 == 0) this.color = 'white';
      else this.color = 'red';
    }, state._lerp.noEase, () => {
      if(this.alive) {
        this.color = 'lightgreen';
      } else {
        state.enemies = state.enemies.filter(e => e != this);
      }
    }, 'slime_hit');
  }
}
