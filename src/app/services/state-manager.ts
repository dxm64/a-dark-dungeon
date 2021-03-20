import { Injectable } from '@angular/core';
import { Action } from '../actions/action';
import { Fireball } from '../actions/fireball.action';
import { Focus } from '../actions/focus.action';
import { Mage } from '../actions/mage.action';
import { Rest } from '../actions/rest.action';
import { Rogue } from '../actions/rogue.action';
import { Slash } from '../actions/slash.action';
import { Stab } from '../actions/stab.action';
import { Torch } from '../actions/torch.action';
import { Warrior } from '../actions/warrior.action';
import { eAction } from '../enums/action.enum';
import { Log } from '../models/log.model';
import { TweeningService } from './tween.service';

@Injectable({ providedIn: 'root' })
export class StateManager {
  maxLogLines = 20;
  logs: Log[] = [
    { message: 'The room is dark.', color: 'gray' },
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
    new Torch({ id: 'torch', label: 'Light torch', enabled: true, visible: true, cooldown: 300 }),

    new Warrior({ id: 'warrior', label: 'Warrior', enabled: true, visible: false, cooldown: 1000 }),
    new Rogue({ id: 'rogue', label: 'Rogue', enabled: true, visible: false, cooldown: 1000 }),
    new Mage({ id: 'mage', label: 'Mage', enabled: true, visible: false, cooldown: 1000 }),

    new Slash({ id: 'slash', label: 'Slash', enabled: true, visible: false, cooldown: 3000 }),
    new Stab({ id: 'stab', label: 'Stab', enabled: true, visible: false, cooldown: 3000 }),
    new Fireball({ id: 'fireball', label: 'Fireball', enabled: false, visible: false, cooldown: 3000 }),
    new Focus({ id: 'focus', label: 'Focus', enabled: false, visible: false, cooldown: 5000 }),
    new Rest({ id: 'rest', label: 'Rest', enabled: true, visible: false, cooldown: 5000 }),
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

  constructor(private _tween: TweeningService) {
    this.gameLoop();
  }

  gameLoop() {
    const framerate = 1000 / 60;
    setInterval(() => {
      this._tween.processQueue();
    }, framerate)
  }

  buttonPressed(id: string) {
    const action = this.actions.filter(action => action.id === id).pop();

    if(action) action.execute(this);
    else this.writeLog('UNDEFINED ACTION');
  }

  showClassChoice(visible: boolean) {
    this.actions[eAction.pickWarriorClass].visible = visible;
    this.actions[eAction.pickRogueClass].visible = visible;
    this.actions[eAction.pickMageClass].visible = visible;
  }

  writeLog(message: string, color?: string) {
    this.logs.unshift({ message, color })

    if (this.logs.length > this.maxLogLines) this.logs = this.logs.slice(0, this.maxLogLines)
  }
}
