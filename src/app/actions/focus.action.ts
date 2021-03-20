import { Action } from "./action";
import { StateManager } from "../services/state-manager";

export class Focus extends Action {
  constructor() {
    super();

    this.id = 'focus';
    this.label = 'Focus';
    this.enabled = false;
    this.visible = false;
    this.cooldown = 5000;
  }

  execute(state: StateManager) {
    state.mana = Math.min(state.mana + 10, state.maxMana);

    state.writeLog('You focus your magical energy.');
  }

}
