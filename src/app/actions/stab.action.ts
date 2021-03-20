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
      state.writeLog('You stab with your dagger, but only hit the air.');
    } else {
      state.writeLog('Your body refuses to move from the fatigue.');
    }
  }

}
