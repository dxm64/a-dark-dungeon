import { Enemy } from "./enemy";

export default class Bat extends Enemy {
  constructor() {
    super();

    this.id = 'bat';
    this.name = 'Bat';
    this.color = '#8a4ac2';
    this.health = 15;
    this.alive = true;
  }
}
