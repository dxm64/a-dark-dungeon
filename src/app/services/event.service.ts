import { Injectable } from '@angular/core';
import { Subscriber, Observable, BehaviorSubject } from 'rxjs';

export type EventType =
  | 'blank'

export type ObjectType<T> =
  T extends 'blank' ? void :
  never;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  observables: { [key: string]: Observable<any> } = {};
  subjects: { [key: string]: BehaviorSubject<any> } = {};
  subscribersOnHold: { [key: string]: Subscriber<any>[] } = {};
  constructor() { }

  emit<T extends EventType>(eventType: T, data?: ObjectType<T>) {
    try {
      if (this.subjects[eventType] === undefined) {
        this.subjects[eventType] = new BehaviorSubject<ObjectType<T>>(null);

        if (this.subscribersOnHold[eventType]) {
          this.subscribersOnHold[eventType].forEach((sub) => {
            this.subjects[eventType].observers.push(sub);
          });
          this.subscribersOnHold[eventType] = undefined;
        }

        this.observables[eventType] = this.subjects[eventType].asObservable();
      }

      this.subjects[eventType].next(data);
    } catch (exception) {
      console.log('EVENT ERROR: ', eventType, data, exception);
    }
  }

  listen<T extends EventType>(eventType: T): Observable<ObjectType<T>> {
    if (this.observables[eventType] === undefined) {
      if (this.subscribersOnHold[eventType] === undefined) {
        this.subscribersOnHold[eventType] = [];
      }
      return new Observable<ObjectType<T>>((sub) => {
        this.subscribersOnHold[eventType].push(sub);
      });
    } else {
      return this.observables[eventType];
    }
  }
}
