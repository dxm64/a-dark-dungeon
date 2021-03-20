import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LerpService {
  constructor() {
    //this.tickerHolderCurve =this.tickerHolderCurve.bind(this);
  }

  evaluateBezier(
    x: number,
    y: number,
    phase: number,
    curve: (phase: number, x: number, y: number) => any
  ) {
    return curve(phase, x, y);
  }

  evaluate(
    a: number,
    b: number,
    phase: number,
    ease: (phase: number) => number = null
  ): number {
    if (ease) phase = ease(phase);
    return a * (1 - phase) + b * phase;
  }

  invert(a: number, b: number, phase: number, ease: Function = null) {
    if (ease) phase = ease(phase);
    return (phase - a) / (b - a);
  }

  noEase(t: number): number {
    return t;
  }

  easeIn(t: number): number {
    return (
      Math.pow(t, 5) * 2.5 -
      Math.pow(t, 4) * 4 +
      Math.pow(t, 3) * 2 +
      Math.pow(t, 2) * 0 +
      Math.pow(t, 1) * 0.5
    );
  }

  easeOut(t: number): number {
    return (
      Math.pow(t, 5) * 1.77635683940025e-15 -
      Math.pow(t, 4) +
      Math.pow(t, 3) * 3 -
      Math.pow(t, 2) * 4 +
      Math.pow(t, 1) * 3
    );
  }

  easeInOut(t: number): number {
    return -Math.pow(t, 3) * 2 + Math.pow(t, 2) * 3;
  }

  backPoints: { x: number; y: number }[] = [
    { x: 0.3, y: 0.7 },
    { x: 0.3, y: 0.93 },
    { x: 0.15, y: 0.93 },
    { x: 0.15, y: 0.4 },
    { x: 0.6, y: 0.5 },
  ];

  // tickerHolderCurve(t: number, x: number, y: number): PIXI.Point {
  //   return this._bezier.getPoint2D(
  //     this.backPoints.map((p) => new PIXI.Point(p.x * x, p.y * y)),
  //     this.easeInOut(t)
  //   );
  // }

}
