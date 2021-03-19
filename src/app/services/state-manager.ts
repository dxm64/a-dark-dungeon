import { Injectable } from '@angular/core';
import { Action } from '../models/action.model';

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
    { id: 'torch', label: 'Light torch', enabled: true, visible: true, cooldown: 1000 },

    { id: 'warrior', label: 'Warrior', enabled: true, visible: false, cooldown: 1000 },
    { id: 'rogue', label: 'Rogue', enabled: true, visible: false, cooldown: 1000 },
    { id: 'mage', label: 'Mage', enabled: true, visible: false, cooldown: 1000 },

    { id: 'slash', label: 'Slash', enabled: true, visible: false, cooldown: 100 },
    { id: 'stab', label: 'Stab', enabled: true, visible: false, cooldown: 50 },
    { id: 'fireball', label: 'Fireball', enabled: false, visible: false, cooldown: 10 },
    { id: 'focus', label: 'Focus', enabled: false, visible: false, cooldown: 10 },
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
    switch (id) {
      case 'warrior': {
        this._playerClass = 'warrior';
        this.level = 1;
        this.showClassChoice(false);
        console.log(this.actions[eActions.slash], eActions.slash)
        this.actions[eActions.slash].visible = true;
        this.actions[eActions.focus].visible = true;

        this.writeLog('You are fierce warrior, ready to die in battle and take down a whole army with you.')
      } break;
      case 'rogue': {
        this._playerClass = 'rogue';
        this.level = 1;
        this.showClassChoice(false);
        this.actions[eActions.stab].visible = true;
        this.actions[eActions.focus].visible = true;

        this.writeLog('You are thief, a swift and deadly assassin.')
      } break;
      case 'mage': {
        this._playerClass = 'mage';
        this.level = 1;
        this.showClassChoice(false);
        this.actions[eActions.fireball].visible = true;
        this.actions[eActions.fireball].enabled = true;
        this.actions[eActions.focus].visible = true;
        this.actions[eActions.focus].enabled = true;

        this.writeLog('You are a powerful magical user, you can sense the mana passing through your nerves.')
      } break;

      case 'torch': {
        this.darkness = 0.0;

        clearInterval(this.darknessInterval);
        this.darknessInterval = setInterval(() => {
          this.darkness += 0.001;
          if (this.darkness > 1.0) {
            this.darkness = 1.0;
            clearInterval(this.darknessInterval);

            this.writeLog("You can't see anything.")
          }
        }, 10)

        this.writeLog('Torch lit. You can see in front of you.');

        if (this.firstTorch) {
          this.firstTorch = false;

          setTimeout(() => {
            this.writeLog('You are trying to remember who you are...');
            this.showClassChoice(true);
          }, 1000);
        }
      } break;
      case 'slash': {
        this.writeLog('You slash your sword, but you only hit the air.');
      } break;
      case 'stab': {
        this.writeLog('You stab your dagger, but nothing\'s there.');
      } break;
      case 'focus': {
        this.mana = Math.min(this.mana + 10, this.maxMana);

        this.writeLog('You focus your magical energy.');
      } break;
      case 'fireball': {
        if (this.mana - 20 >= 0) {
          this.mana -= 20;
          this.writeLog('You shoot a bright fireball, it hits nothing.');
        } else {
          this.writeLog('A tiny flame is visible but it quickly fizzles out. You are drained of magic.');
        }
      } break;
      default: {
        this.writeLog('This button does nothing.');
      } break;
    }
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
