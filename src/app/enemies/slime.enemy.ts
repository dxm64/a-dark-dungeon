import { StateManager } from "../services/state-manager";
import { Enemy } from "./enemy";

export default class Slime extends Enemy {
  constructor() {
    super();

    this.id = 'slime';
    this.name = 'Slime';
    this.color = 'lightgreen';
    this.health = 20;
    this.alive = true;
  }
}
