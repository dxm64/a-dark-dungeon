import { Action } from "./action";
import { eAction } from '../enums/action.enum'
import { StateManager } from "../services/state-manager";

export class Rogue extends Action {
  execute(state: StateManager) {
    state._playerClass = 'rogue';
    state.level = 1;
    state.showClassChoice(false);
    state.actions[eAction.stab].visible = true;
    state.actions[eAction.rest].visible = true;

    state.writeLog('You are thief, a swift and deadly assassin.')
  }

}
