import { state } from '@angular/animations';
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
import Arachnid from '../enemies/arachnid.enemy';
import Bat from '../enemies/bat.enemy';
import Cockroach from '../enemies/cockroach.enemy';
import { Enemy } from '../enemies/enemy';
import Slime from '../enemies/slime.enemy';
import { eAction } from '../enums/action.enum';
import { Log } from '../models/log.model';
import Tween from '../models/tween.model';
import { LerpService } from './lerp.service';
import { TweeningService } from './tween.service';

@Injectable({ providedIn: 'root' })
export class StateManager {
  maxLogLines = 20;
  logs: Log[] = [
    { message: 'The room is dark.', color: 'gray' },
  ]

  health = 100;
  maxHealth = 100;

  mana = 100;
  maxMana = 100;
  manaReplenishRate = 0.01;

  stamina = 100;
  maxStamina = 100;
  staminaReplenishRate = 0.01;

  level = 0;
  _playerClass: string = 'unknown';

  classes = {
    'unknown': { name: '???', color: 'lightgray' },
    'warrior': { name: 'Warrior', color: 'orange' },
    'mage': { name: 'Mage', color: 'cornflowerBlue' },
    'rogue': { name: 'Rogue', color: '#4fbd4f' },
  }

  actions: Action[] = [
    new Torch(),

    new Warrior(),
    new Rogue(),
    new Mage(),

    new Slash(),
    new Stab(),
    new Fireball(),
    new Focus(),
    new Rest(),
  ]

  enemyTypes = [{ id: 'slime', type: Slime }, { id: 'cockroach', type: Cockroach }, { id: 'bat', type: Bat }, { id: 'arachnid', type: Arachnid }]
  enemies: Enemy[] = [
    new Slime(),
    new Cockroach(),
    new Bat(),
    new Arachnid(),
  ]


  darkness = 1.0;

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

  constructor(public _tween: TweeningService, public _lerp: LerpService) {
    this.gameLoop();
  }

  gameLoop() {
    const framerate = 1000 / 60;
    setInterval(() => {
      this._tween.processQueue();

      this.stamina = Math.min(this.stamina + this.staminaReplenishRate, this.maxStamina);
      this.mana = Math.min(this.mana + this.manaReplenishRate, this.maxMana)
    }, framerate)

    setInterval(() => {
      if(this.enemies.length < 3) {
        const spawnType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)].type;
        const enemy = new spawnType();

        this.enemies.push(enemy);

        if(this.darkness == 1.0) {
          this.writeLog('You hear a noise in the dark.');
        } else {
          this.writeLog(`${enemy.name} appears in front of you.`);
        }
      }
    }, 10000);
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
