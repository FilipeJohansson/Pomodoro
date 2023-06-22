import { EventEmitter, Injectable } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Injectable({
  providedIn: 'root'
})
export class TimersService {
  isRunning: EventEmitter<boolean> = new EventEmitter()
  changeTimerEvent: EventEmitter<TimerComponent> = new EventEmitter()

  startTimers() {
    this.isRunning.emit(true)
  }
  
  endTimers() {
    this.isRunning.emit(false)
  }

  changeTimer(timer: TimerComponent) {
    this.changeTimerEvent.emit(timer)
  }
}
