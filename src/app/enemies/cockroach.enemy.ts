import { Enemy } from "./enemy";

export default class Cockroach extends Enemy {
  constructor() {
    super();

    this.id = 'cockroach';
    this.name = 'Cockroach';
    this.color = '#656565';
    this.health = 1;
    this.alive = true;
  }
}
