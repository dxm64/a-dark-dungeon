import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Stab extends Action {
  execute(state: StateManager) {
    if (state.stamina - 10 >= 0) {
      state.stamina -= 5;
      state.writeLog('You stab your dagger, but nothing\'s there.');
    } else {
      state.writeLog('You wipe your sweat of your forehead.');
    }
  }

}
