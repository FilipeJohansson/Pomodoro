import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { TimersService } from '../timers/timers.service'
import { Colors, Time } from './timer.model'

@Component({
  selector: 'p-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  MAX_TIME: number = 60
  MIN_TIME: number = 1

  @Input() backgroundColor: Colors
  @Input() name: string
  @Input('time') currentTime: Time

  @Output() timeEnds: EventEmitter<boolean> = new EventEmitter()
  @Output() timer: EventEmitter<TimerComponent> = new EventEmitter()
  onTimeChange: EventEmitter<Time> = new EventEmitter()

  isRunning: boolean = false
  isAnyTimerRunning: boolean = false

  originalTime: Time = { minutes: 0, seconds: 0 }
  minutes: string
  seconds: string

  interval: any

  constructor(private timersService: TimersService) {
    this.timersService.isRunning.subscribe((isRunning: boolean) => {
      this.isAnyTimerRunning = isRunning
    })
  }

  ngOnInit(): void {
    this.timer.emit(this)

    this.setupTimer()
  }

  setupTimer() {
    this.originalTime = { ...this.currentTime }
    this.timeToString()
  }

  startTimer() {
    this.setupTimer()
    this.isRunning = true

    this.interval = setInterval(() => {
      if (this.isRunning) {
        this.updateTimer()
        this.timeToString()
      }
    }, 1000)
  }

  pauseTimer() {
    this.isRunning = false
  }

  continueTimer() {
    this.isRunning = true
  }

  stopTimer() {
    clearInterval(this.interval)

    this.isRunning = false
    this.currentTime = this.originalTime
    this.timeToString()
  }

  endTimer() {
    this.stopTimer()
    this.playEndSound()
    this.timeEnds.emit(true)
  }

  increaseMinutes() {
    this.currentTime.minutes = (this.currentTime.minutes++) >= this.MAX_TIME ? this.MAX_TIME : this.currentTime.minutes++
    this.originalTime.minutes = this.currentTime.minutes
    this.timeToString()
  }

  decreaseMinutes() {
    this.currentTime.minutes = (this.currentTime.minutes--) <= this.MIN_TIME ? this.MIN_TIME : this.currentTime.minutes--
    this.originalTime.minutes = this.currentTime.minutes
    this.timeToString()
  }

  updateTimer() {
    this.currentTime.seconds--

    if (this.currentTime.seconds <= 0) {
      this.currentTime.seconds = 59
      this.currentTime.minutes--

      if (this.currentTime.minutes < 0)
        this.endTimer()
    }

    if (this.currentTime.seconds <= 3 && this.currentTime.minutes <= 0)
      this.playBipSound()

    this.onTimeChange.emit(this.currentTime)
  }

  playEndSound() {
    let audio = new Audio();
    audio.src = "./assets/sounds/end.mp3"
    audio.load()
    audio.play()
  }

  playBipSound() {
    let audio = new Audio();
    audio.src = "./assets/sounds/bip.mp3"
    audio.load()
    audio.play()
  }

  timeToString() {
    this.minutes = this.currentTime.minutes.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    this.seconds = this.currentTime.seconds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

}