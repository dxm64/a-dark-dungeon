export default class Tween {
  public beginValue: number;
  public endValue: number;
  public easing: Function;
  public time: number;
  public complete: Function;
  public start?: number;
  public loopFunction?: (value: number) => void;
  public ended?: boolean = false;
  public type?: string = 'generic';
}
