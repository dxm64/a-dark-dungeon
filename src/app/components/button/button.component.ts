import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LerpService } from 'src/app/services/lerp.service';
import { TweeningService } from 'src/app/services/tween.service';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() id = 'Unknown'
  @Input() label = 'Label'

  @Input() cooldownTime = 1000;
  @Input() cooldown = 0.0

  @Input() disabled = false;

  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _tween: TweeningService, private _lerp: LerpService) { }

  ngOnInit() {
  }

  startCooldown() {
    this._tween.start(1.0, 0.0, this.cooldownTime, (value) => { this.cooldown = value; }, this._lerp.noEase, () => {});
  }

  click() {
    if (!this.disabled && this.cooldown == 0.0) {
      this.clicked.emit(this.id)
      this.startCooldown();
    }
  }

}
