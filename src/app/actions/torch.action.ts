import { Action } from "./action";
import { StateManager } from "../services/state-manager";

export class Torch extends Action {
  execute(state: StateManager) {
    state.darkness = 0.0;

    clearInterval(state.darknessInterval);
    state.darknessInterval = setInterval(() => {
      state.darkness += 0.001;
      if (state.darkness > 1.0) {
        state.darkness = 1.0;
        clearInterval(state.darknessInterval);

        state.writeLog("You can't see anything.")
      }
    }, 10)

    state.writeLog('Torch lit. You can see in front of you.');

    if (state.firstTorch) {
      state.firstTorch = false;

      setTimeout(() => {
        state.writeLog('You are trying to remember who you are...');
        state.showClassChoice(true);
      }, 1000);
    }
  }

}
