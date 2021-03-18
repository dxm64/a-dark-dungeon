import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vital',
  templateUrl: 'vital.component.html',
  styleUrls: ['vital.component.css']
})
export class VitalComponent implements OnInit {
  @Input() value = 1.0
  @Input() color = 'gray'

  constructor() { }

  ngOnInit() { }
}
