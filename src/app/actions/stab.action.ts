import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Stab extends Action {
  execute(state: StateManager) {
    if (state.stamina - 10 >= 0) {
      state.mana -= 5;
      state.writeLog('You stab your dagger, but nothing\'s there.');
    } else {
      state.writeLog('A tiny flame is visible but it quickly fizzles out. You are drained of magic.');
    }
  }

}
