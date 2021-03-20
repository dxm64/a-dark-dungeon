import { Action } from "./action";
import { StateManager } from "../services/state-manager";

export class Focus extends Action {
  execute(state: StateManager) {
    state.mana = Math.min(state.mana + 10, state.maxMana);

    state.writeLog('You focus your magical energy.');
  }

}
