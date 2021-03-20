import { Action } from "./action";
import { eAction } from '../enums/action.enum'
import { StateManager } from "../services/state-manager";

export class Mage extends Action {
  execute(state: StateManager) {
    state._playerClass = 'mage';
    state.level = 1;
    state.showClassChoice(false);
    state.actions[eAction.fireball].visible = true;
    state.actions[eAction.fireball].enabled = true;
    state.actions[eAction.focus].visible = true;
    state.actions[eAction.focus].enabled = true;

    state.writeLog('You are a powerful magical user, you can sense the mana passing through your nerves.', state.classes['mage'].color)
  }

}
