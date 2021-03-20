import { Enemy } from "./enemy";

export default class Arachnid extends Enemy {
  constructor() {
    super();

    this.id = 'arachnid';
    this.name = 'Arachnid';
    this.color = '#7d7964';
    this.health = 25;
    this.alive = true;
  }
}
