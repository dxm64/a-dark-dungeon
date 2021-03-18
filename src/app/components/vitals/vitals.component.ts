import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vitals',
  templateUrl: 'vitals.component.html',
  styleUrls: ['vitals.component.css']
})
export class VitalsComponent implements OnInit {
  health = 0.75
  mana = 0.5
  stamina = 0.3

  constructor() { }

  ngOnInit() { }
}
