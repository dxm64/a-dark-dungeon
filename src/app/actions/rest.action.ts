import { eActions, StateManager } from "../services/state-manager";
import { Action } from "./action";

export class Rest extends Action {
  execute(state: StateManager) {
    state.stamina = Math.min(state.stamina + 10, state.maxStamina);

    state.writeLog('TEMPLATE_STRING_REGEN_STAMINA');
  }

}
