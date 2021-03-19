import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Focus extends Action {
  execute(state: StateManager) {
    state.mana = Math.min(state.mana + 10, state.maxMana);

    state.writeLog('You focus your magical energy.');
  }

}
