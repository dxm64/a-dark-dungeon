import { Injectable } from '@angular/core';
import Tween from '../models/tween.model';
import { LerpService } from './lerp.service';

@Injectable({providedIn: 'root'})
export class TweeningService {
  constructor(private _lerp: LerpService) {
    TweeningService.lerp = _lerp;
  }
  static lerp;
  static queues: Tween[][] = [];
  static processing: Tween[] = [];

  processQueue() {
    Object.keys(TweeningService.queues).map((key) => {
      if (
        !TweeningService.processing.some((x) => x.type == key) &&
        TweeningService.queues[key]
      ) {
        TweeningService.processing.push(TweeningService.queues[key].shift());
        if (TweeningService.queues[key].length == 0) {
          TweeningService.queues[key] = undefined;
        }
      }
    });

    TweeningService.processing.forEach((tween) => {
      if (!tween.start) {
        tween.start = Date.now();
      }
      TweeningService.processTween(tween);
    });
  }

  static processTween(tween: Tween) {
    if (tween) {
      const now = Date.now();

      const phase = Math.min(1, (now - tween.start) / tween.time);

      tween.loopFunction(
        TweeningService.lerp.evaluate(
          tween.beginValue,
          tween.endValue,
          tween.easing ? tween.easing(phase) : TweeningService.lerp.noEase(phase)
        )
      );

      if (phase === 1) {
        if (tween.complete) tween.complete();
        TweeningService.processing = TweeningService.processing.filter(
          (x) => x != tween
        );
      }
    }
  }

  start(
    beginValue: number,
    endValue: number,
    time: number,
    callback: (value: number) => void,
    easing: Function,
    complete: Function,
    type?: string
  ) {
    const tween: Tween = {
      time,
      complete,
      easing,
      beginValue,
      endValue,
      loopFunction: callback,
      type,
    };
    this.clear(type);
    TweeningService.processing.push(tween);
  }

  startWait(
    time: number,
    complete: Function,
    type?: string
  ) {
    const tween: Tween = {
      time,
      complete,
      easing: this._lerp.noEase,
      beginValue: 0,
      endValue: 100,
      loopFunction: () => { },
      type,
    };
    this.clear(type);
    TweeningService.processing.push(tween);
  }

  startMulti(
    startTime: number,
    segments: {
      time: number,
      beginValue?: number,
      endValue?: number,
      callback?: (value: number) => void,
      easing?: Function
    }[],
    complete: Function,
    type: string
  ) {
    segments.forEach((x, i) => {
      if (startTime >= x.time) {
        startTime = Math.max(0, startTime - x.time);
        return;
      }

      const beginValue = this._lerp.evaluate(x.beginValue, x.endValue, startTime / x.time);
      const time = x.time - startTime;

      if (x.callback) {
        this.queue(beginValue, x.endValue, time, x.callback, x.easing, i == segments.length - 1 ? complete : null, type);
      } else {
        if (i - 1 < 0) {
          console.error("First tween must have callback.");
        } else {
          const last = segments[i - 1];
          if (!last.callback) {
            console.error("Previous tween must have callback.");
          } else {
            this.queue(last.endValue, last.endValue, time, last.callback, x.easing, i == segments.length - 1 ? complete : null, type);
          }
        }
      }
      startTime = Math.max(0, startTime - x.time);
    });
  }

  queue(
    beginValue: number,
    endValue: number,
    time: number,
    callback: (value: number) => void,
    easing: Function,
    complete: Function,
    type = 'generic'
  ) {
    const tween: Tween = {
      time,
      complete,
      easing,
      beginValue,
      endValue,
      loopFunction: callback,
      type,
    };
    if (!TweeningService.queues[type]) TweeningService.queues[type] = [];
    TweeningService.queues[type].push(tween);
  }

  queueWait(
    time: number,
    complete: Function,
    type = 'generic'
  ) {
    const tween: Tween = {
      time,
      complete,
      easing: this._lerp.noEase,
      beginValue: 0,
      endValue: 100,
      loopFunction: () => { },
      type,
    };
    if (!TweeningService.queues[type]) TweeningService.queues[type] = [];
    TweeningService.queues[type].push(tween);
  }

  clear(type = 'generic', queue = false) {
    TweeningService.processing = TweeningService.processing.filter(
      (x) => x.type != type
    );
    if (queue) TweeningService.queues[type] = undefined;
  }
}
