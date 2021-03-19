import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Mage extends Action {
  execute(state: StateManager) {
    state._playerClass = 'mage';
    state.level = 1;
    state.showClassChoice(false);
    state.actions[eActions.fireball].visible = true;
    state.actions[eActions.fireball].enabled = true;
    state.actions[eActions.focus].visible = true;
    state.actions[eActions.focus].enabled = true;

    state.writeLog('You are a powerful magical user, you can sense the mana passing through your nerves.')
  }

}
