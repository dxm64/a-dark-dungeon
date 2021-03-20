import { Action } from "./action";
import { StateManager } from "../services/state-manager";

export class Torch extends Action {
  constructor() {
    super();

    this.id = 'torch';
    this.label = 'Light torch',
    this.enabled = true;
    this.visible = true;
    this.cooldown = 300;
  }

  execute(state: StateManager) {
    if(state.stamina - 1 >= 0) {
      state.stamina -= 1;

      state.darkness = 0.0;
      state.writeLog('Torch lit. You can see in front of you.', '#edde93');

      state._tween.start(state.darkness, 1.0, 30000, (value) => {
        state.darkness = value;
      }, state._lerp.noEase, () => {
        state.writeLog("You can't see anything.", 'gray')
      }, 'darkness_creep');

      if (state.firstTorch) {
        state.firstTorch = false;

        setTimeout(() => {
          state.writeLog('You are trying to remember who you are...');
          state.showClassChoice(true);
        }, 1000);
      }
    } else {
      state.writeLog('You fail to light the torch.');
    }
  }
}
