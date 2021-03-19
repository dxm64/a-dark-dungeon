import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StateManager {
  maxLogLines = 20;
  logs: string[] = [
    'The room is dark.',
  ]

  health = 75;
  maxHealth = 100;

  mana = 50;
  maxMana = 100;

  stamina = 30;
  maxStamina = 100;

  level = 0;
  _playerClass: string = 'unknown';

  classes = {
    'unknown': { name: '???', color: 'lightgray' },
    'warrior': { name: 'Warrior', color: 'orange' },
    'mage': { name: 'Mage', color: 'cornflowerBlue' },
    'rogue': { name: 'Rogue', color: '#4fbd4f' },
  }

  visibility = 1.0;

  get playerClass() {
    return this.classes[this._playerClass];
  }

  get healthBar() {
    return this.health / this.maxHealth;
  }

  get manaBar() {
    return this.mana / this.maxMana;
  }

  get staminaBar() {
    return this.stamina / this.maxStamina;
  }

  constructor() { }

  writeLog(message: string) {
    this.logs.push(message)

    if(this.logs.length > this.maxLogLines) this.logs = this.logs.slice(this.logs.length - this.maxLogLines)
  }
}
