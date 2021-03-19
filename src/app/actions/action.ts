import { StateManager } from "../services/state-manager";

export abstract class Action {
  id: string;
  label: string;
  enabled: boolean;
  visible: boolean;
  cooldown: number;

  constructor(obj: any) {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    })
  }

  abstract execute(state: StateManager);
}
