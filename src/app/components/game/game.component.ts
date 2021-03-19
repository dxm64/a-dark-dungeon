import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {
  maxLogLines = 20;
  logs: string[] = [
    'The room is dark.',
  ]

  constructor() {
  }

  ngOnInit() {
  }

  lightTorch(id) {
    this.log('Torch lit. You can see in front of you.')
  }

  slash(id) {
    this.log('You slash your sword, but you missed the monster.')
  }

  log(message: string) {
    this.logs.push(message)

    if(this.logs.length > this.maxLogLines) this.logs = this.logs.slice(this.logs.length - this.maxLogLines)
  }
}
