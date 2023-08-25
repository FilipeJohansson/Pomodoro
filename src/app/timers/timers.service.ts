import { Injectable, signal } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Injectable({
  providedIn: 'root'
})
export class TimersService {
  timersObject: TimerComponent[] = []
  timerRunningIndex: number = 0

  isAnyTimerRunning = signal<boolean>(false)
  isCurrentTimerPaused = signal<boolean>(false)
  currentRunningTimer = signal<TimerComponent | undefined>(undefined);

  addTimer = (timer: TimerComponent) => this.timersObject.push(timer)

  startNextTimer() {
    this.currentRunningTimer.set(this.timersObject[this.timerRunningIndex])
    this.currentRunningTimer()?.startTimer()
    this.isAnyTimerRunning.set(true)
  }

  pauseCurrentTimer() {
    this.currentRunningTimer()?.pauseTimer()
    this.isCurrentTimerPaused.set(true)
  }

  continueCurrentTimer() {
    this.currentRunningTimer()?.continueTimer()
    this.isCurrentTimerPaused.set(false)
  }

  stopCurrentTimer() {
    this.timerRunningIndex = 0;
    this.isCurrentTimerPaused.set(false)
    this.timersObject.forEach(timer => timer.stopTimer())
    this.isAnyTimerRunning.set(false)
  }

  endTimer() {
    this.timerRunningIndex = (++this.timerRunningIndex) > (this.timersObject.length - 1) ? 0 : this.timerRunningIndex++
    this.startNextTimer()
  }
}
