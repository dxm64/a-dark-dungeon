import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Rogue extends Action {
  execute(state: StateManager) {
    state._playerClass = 'rogue';
    state.level = 1;
    state.showClassChoice(false);
    state.actions[eActions.stab].visible = true;
    state.actions[eActions.focus].visible = true;

    state.writeLog('You are thief, a swift and deadly assassin.')
  }

}
