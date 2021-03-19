import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Warrior extends Action {
  execute(state: StateManager) {
    state._playerClass = 'warrior';
    state.level = 1;
    state.showClassChoice(false);
    console.log(state.actions[eActions.slash], eActions.slash)
    state.actions[eActions.slash].visible = true;
    state.actions[eActions.rest].visible = true;

    state.writeLog('You are fierce warrior, ready to die in battle and take down a whole army with you.')
  }

}
