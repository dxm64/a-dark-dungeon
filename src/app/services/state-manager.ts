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

  actions = [
    { id: 'torch', label: 'Light torch', enabled: true, visible: true, cooldown: 1000 },
    { id: 'slash', label: 'Slash', enabled: true, visible: true, cooldown: 100 },
    { id: 'focus', label: 'Focus', enabled: true, visible: true, cooldown: 10 },
    { id: 'fireball', label: 'Fireball', enabled: true, visible: true, cooldown: 10 },
  ]

  darkness = 1.0;
  darknessInterval: any;

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
  }

  buttonPressed(id: string) {
    switch(id) {
      case 'torch': {
        this.darkness = 0.0;

        clearInterval(this.darknessInterval);
        this.darknessInterval = setInterval(() => {
          this.darkness += 0.001;
          if(this.darkness > 1.0) {
            this.darkness = 1.0;
            clearInterval(this.darknessInterval);

            this.writeLog("You can't see anything.")
          }
        }, 10)

        this.writeLog('Torch lit. You can see in front of you.');
      } break;
      case 'slash': {
        this.writeLog('You slash your sword, but you only hit the air.');
      } break;
      case 'focus': {
        this.mana = Math.min(this.mana + 10, this.maxMana);

        this.writeLog('You focus your magical energy.');
      } break;
      case 'fireball': {
        if(this.mana - 20 >= 0) {
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

  writeLog(message: string) {
    this.logs.push(message)

    if(this.logs.length > this.maxLogLines) this.logs = this.logs.slice(this.logs.length - this.maxLogLines)
  }
}
