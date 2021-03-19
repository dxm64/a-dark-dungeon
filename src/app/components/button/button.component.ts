import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() id = 'Unknown'
  @Input() label = 'Label'

  @Input() cooldownSpeed = 100;

  cooldown = 0.0
  cooldownInterval: any;

  @Input() disabled = false;

  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  startCooldown() {
    this.cooldown = 1.0;

    clearInterval(this.cooldownInterval);
    this.cooldownInterval = setInterval(() => {
      this.cooldown -= 0.01;
      if(this.cooldown < 0.0) {
        this.cooldown = 0.0;
        this.stopCooldown();
      }
    }, 1000 / this.cooldownSpeed);
  }

  stopCooldown() {
    clearInterval(this.cooldownInterval);
  }

  click() {
    if(!this.disabled && this.cooldown == 0.0) {
      this.clicked.emit(this.id)
      this.startCooldown();
    }
  }

}
