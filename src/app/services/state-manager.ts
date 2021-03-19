import { Injectable } from '@angular/core';
import { Action } from '../actions/action';
import { Fireball } from '../actions/fireball.action';
import { Focus } from '../actions/focus.action';
import { Mage } from '../actions/mage.action';
import { Rogue } from '../actions/rogue.action';
import { Slash } from '../actions/slash.action';
import { Stab } from '../actions/stab.action';
import { Torch } from '../actions/torch.action';
import { Warrior } from '../actions/warrior.action';

export enum eActions {
  lightTorch = 0,

  pickWarriorClass = 1,
  pickRogueClass = 2,
  pickMageClass = 3,

  slash = 4,
  stab = 5,
  fireball = 6,
  focus = 7,
}

@Injectable({ providedIn: 'root' })
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

  actions: Action[] = [
    new Torch({ id: 'torch', label: 'Light torch', enabled: true, visible: true, cooldown: 1000 }),

    new Warrior({ id: 'warrior', label: 'Warrior', enabled: true, visible: false, cooldown: 1000 }),
    new Rogue({ id: 'rogue', label: 'Rogue', enabled: true, visible: false, cooldown: 1000 }),
    new Mage({ id: 'mage', label: 'Mage', enabled: true, visible: false, cooldown: 1000 }),

    new Slash({ id: 'slash', label: 'Slash', enabled: true, visible: false, cooldown: 100 }),
    new Stab({ id: 'stab', label: 'Stab', enabled: true, visible: false, cooldown: 50 }),
    new Fireball({ id: 'fireball', label: 'Fireball', enabled: false, visible: false, cooldown: 10 }),
    new Focus({ id: 'focus', label: 'Focus', enabled: false, visible: false, cooldown: 10 }),
  ]

  darkness = 1.0;
  darknessInterval: any;

  firstTorch = true;

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

  constructor() {
    console.log(this.actions)
  }

  buttonPressed(id: string) {
    const action = this.actions.filter(action => action.id === id).pop();

    action.execute(this);
  }

  showClassChoice(visible: boolean) {
    this.actions[1].visible = visible;
    this.actions[2].visible = visible;
    this.actions[3].visible = visible;
  }

  writeLog(message: string) {
    this.logs.push(message)

    if (this.logs.length > this.maxLogLines) this.logs = this.logs.slice(this.logs.length - this.maxLogLines)
  }
}
