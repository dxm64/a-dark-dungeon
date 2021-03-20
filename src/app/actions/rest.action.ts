import { StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Rest extends Action {
  constructor() {
    super();

    this.id = 'rest';
    this.label = 'Rest';
    this.enabled = true;
    this.visible = false;
    this.cooldown = 5000;
  }

  execute(state: StateManager) {
    state.stamina = Math.min(state.stamina + 10, state.maxStamina);

    state.writeLog('You rest for a few moments.');
  }
}
