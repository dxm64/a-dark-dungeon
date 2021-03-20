import { Action } from "./action";
import { eAction } from '../enums/action.enum'
import { StateManager } from '../services/state-manager'

export class Warrior extends Action {
  execute(state: StateManager) {
    state._playerClass = 'warrior';
    state.level = 1;
    state.showClassChoice(false);
    console.log(state.actions[eAction.slash], eAction.slash)
    state.actions[eAction.slash].visible = true;
    state.actions[eAction.rest].visible = true;

    state.writeLog('You are fierce warrior, ready to die in battle and take down a whole army with you.', state.classes['warrior'].color)
  }

}
