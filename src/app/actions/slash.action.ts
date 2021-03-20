import { StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Slash extends Action {
  execute(state: StateManager) {
    if (state.stamina - 10 >= 0) {
      state.stamina -= 10;
      state.writeLog('You slash your sword, but you only hit the air.');
    } else {
      state.writeLog('A tiny flame is visible but it quickly fizzles out. You are drained of magic.');
    }
  }

}
