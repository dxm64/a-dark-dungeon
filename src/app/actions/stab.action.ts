import { Enemy } from "../enemies/enemy";
import { StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Stab extends Action {
  constructor() {
    super();

    this.id = 'stab';
    this.label = 'Stab';
    this.enabled = true;
    this.visible = false;
    this.cooldown = 3000;
  }

  execute(state: StateManager) {
    if (state.stamina - 10 >= 0) {
      state.stamina -= 10;

      if(state.darkness != 1.0 && state.enemies.length > 0) {
        const hit: Enemy = state.enemies[Math.floor(Math.random() * state.enemies.length)];

        hit.takeDamage(state, 10);
        state.writeLog(`You stab with your dagger and hit a ${hit.name}.`)
      } else {
        state.writeLog('You stab with your dagger, but only hit the air.');
      }
    } else {
      state.writeLog('Your body refuses to move from the fatigue.');
    }
  }

}
