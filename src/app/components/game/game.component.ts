import { Component, OnInit } from '@angular/core';
import { StateManager } from 'src/app/services/state-manager';

@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public state: StateManager) {
  }

  ngOnInit() {
  }

  lightTorch(id) {
    this.state.writeLog('Torch lit. You can see in front of you.')
  }

  slash(id) {
    this.state.writeLog('You slash your sword, but you missed the monster.')
  }
}
