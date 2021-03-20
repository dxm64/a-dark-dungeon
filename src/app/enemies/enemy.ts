import { StateManager } from "../services/state-manager";

export abstract class Enemy {
  id: string;
  name: string;
  color: string;

  health: number;
  alive: boolean;

  abstract takeDamage(state: StateManager, dmg: number);
}
