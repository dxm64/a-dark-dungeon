import { Component, OnInit } from '@angular/core';
import { StateManager } from 'src/app/services/state-manager';

@Component({
  selector: 'app-dungeon',
  templateUrl: 'dungeon.component.html',
  styleUrls: ['dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  constructor(public state: StateManager) { }

  ngOnInit() { }
}
