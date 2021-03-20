import { Action } from "./action";
import { StateManager } from "../services/state-manager";
import { Enemy } from "../enemies/enemy";

export class Fireball extends Action {
  constructor() {
    super();

    this.id = 'fireball';
    this.label = 'Fireball';
    this.enabled = false;
    this.visible = false;
    this.cooldown = 3000;
  }

  execute(state: StateManager) {
    if (state.mana - 20 >= 0) {
      state.mana -= 20;

      if(state.darkness != 1.0 && state.enemies.length > 0) {
        const hit: Enemy = state.enemies[Math.floor(Math.random() * state.enemies.length)];

        hit.takeDamage(state, 20);
        state.writeLog(`You shoot a bright fireball, it hits a ${hit.name}.`)
      } else {
        state.writeLog('You shoot a bright fireball, it hits nothing.');
      }
    } else {
      state.writeLog('A tiny flame is visible but it quickly fizzles out. You are drained of magic.');
    }
  }

}
