import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';

@Component({
  selector: 'app-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.css']
})
export class LogComponent implements OnInit {
  @Input() logs: Log[] = [];

  constructor() { }

  ngOnInit() { }
}
