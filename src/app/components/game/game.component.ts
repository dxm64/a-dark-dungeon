import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {
  logs: string[] = [
    'The room is dark.',
  ]

  constructor() { }

  ngOnInit() {
  }

  lightTorch(id) {
    this.logs.push('Torch lit. You can see in front of you.')
  }

  slash(id) {
    this.logs.push('You slash your sword. You missed the monster.')
  }
}
