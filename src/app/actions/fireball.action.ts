import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Fireball extends Action {
  execute(state: StateManager) {
    if (state.mana - 20 >= 0) {
      state.mana -= 20;
      state.writeLog('You shoot a bright fireball, it hits nothing.');
    } else {
      state.writeLog('A tiny flame is visible but it quickly fizzles out. You are drained of magic.');
    }
  }

}
