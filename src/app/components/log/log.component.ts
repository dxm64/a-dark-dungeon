import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.css']
})
export class LogComponent implements OnInit {
  @Input() logs: string[] = [
    'The room is dark.',
  ]

  constructor() { }

  ngOnInit() { }
}
