import { Component, OnInit } from '@angular/core';
import { StateManager } from 'src/app/services/state-manager';

@Component({
  selector: 'app-vitals',
  templateUrl: 'vitals.component.html',
  styleUrls: ['vitals.component.css']
})
export class VitalsComponent implements OnInit {

  constructor(public state: StateManager) { }

  ngOnInit() { }
}
