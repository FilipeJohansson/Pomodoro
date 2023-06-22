import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { Colors, TimerModel } from '../timer/timer.model';
import { TimersService } from './timers.service';

@Component({
  selector: 'p-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.css']
})
export class TimersComponent implements OnInit {
  public colors = Colors

  timersData: TimerModel[] = [
    { backgroundColor: Colors.BLUE, name: 'WORK', time: { minutes: 0, seconds: 2 } },
    { backgroundColor: Colors.GREEN, name: 'BREAK', time: { minutes: 0, seconds: 2 } }
  ];

  timersObject: TimerComponent[] = []
  timerIndex: number = 0
  timerRunning: TimerComponent

  isRunning: boolean = false
  isPause: boolean = false

  constructor(private timersService: TimersService) {
    this.timersService.isRunning.subscribe((isRunning: boolean) => {
      this.isRunning = isRunning
    })
  }

  ngOnInit(): void { }

  onStartPressed() {
    this.startNextTimer()
    this.timersService.startTimers()
  }

  onPausePressed() {
    this.timerRunning.pauseTimer()
    this.isPause = true
  }

  onContinuePressed() {
    this.timerRunning.continueTimer()
    this.isPause = false
  }

  onStopPressed() {
    this.timerIndex = 0
    this.timersObject.forEach(timer => timer.stopTimer())
    this.timersService.endTimers()
  }

  startNextTimer() {
    this.timerRunning = this.timersObject[this.timerIndex]
    this.timerRunning.startTimer()
    this.timersService.changeTimer(this.timerRunning)
  }

  addTimer(timer: TimerComponent) {
    this.timersObject.push(timer)
  }

  timeEnds() {
    this.timerIndex = (++this.timerIndex) > (this.timersObject.length - 1) ? 0 : this.timerIndex++
    this.startNextTimer()
  }
}
