import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() id = 'Unknown'
  @Input() label = 'Label'

  @Input() animationSpeed = 100;

  animation = 0.0
  animInterval: any;

  @Input() disabled = false;

  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  startAnim() {
    this.animation = 1.0;

    clearInterval(this.animInterval);
    this.animInterval = setInterval(() => {
      this.animation -= 0.01;
      if(this.animation < 0.0) {
        this.animation = 0.0;
        this.stopAnim();
      }
    }, 1000 / this.animationSpeed);
  }

  stopAnim() {
    clearInterval(this.animInterval);
  }

  click() {
    if(!this.disabled && this.animation == 0.0) {
      this.clicked.emit(this.id)
      this.startAnim();
    }
  }

}
