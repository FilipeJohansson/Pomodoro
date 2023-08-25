import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Signal, effect, signal } from '@angular/core'
import { HoldableDirective } from '../holdable/holdable.directive'
import { Colors, TimeModel } from './timer.model'

@Component({
  standalone: true,
  imports: [CommonModule, HoldableDirective],
  selector: 'p-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  readonly MAX_TIME: number = 90
  readonly MIN_TIME: number = 1

  @Input({ required: true }) backgroundColor: Colors
  @Input({ required: true }) name: string
  @Input({ required: true }) isAnyTimerRunning: Signal<boolean>
  @Input({ alias: 'time', required: true }) userDefinedTime: TimeModel

  @Output() timerEnds: EventEmitter<boolean> = new EventEmitter()
  @Output() timer: EventEmitter<TimerComponent> = new EventEmitter()

  currentRunningTime = signal<TimeModel>({ minutes: 0, seconds: 0 })
  userDefinedTimeChange = signal<TimeModel>({ minutes: 0, seconds: 0 })

  onTimeChange = signal<TimeModel | undefined>(undefined)
  currentRunningTimeString = signal<{ minutes: string, seconds: string }>({ minutes: '0', seconds: '0' })

  isRunning = signal<boolean>(false)
  isStopped = signal<boolean>(true)

  interval: any

  endSound: HTMLAudioElement = new Audio('./assets/sounds/end.mp3')
  bipSound: HTMLAudioElement = new Audio('./assets/sounds/bip.mp3')

  constructor() {
    effect(() => {
      this.timeToString(this.currentRunningTime())
    }, {allowSignalWrites: true})

    effect(() => {
      this.timeToString(this.userDefinedTimeChange())
    }, {allowSignalWrites: true})
  }

  ngOnInit(): void {
    this.timer.emit(this)

    this.resetTimer()
  }

  /**
   * Resets the timer to its user defined time
   */
  resetTimer() {
    this.currentRunningTime.set({ ...this.userDefinedTime })
  }

  startTimer() {
    this.resetTimer()

    this.isRunning.set(true)
    this.isStopped.set(false)

    this.interval = setInterval(() => {
      if (this.isRunning()) {
        this.updateTimer()
      }
    }, 1000)
  }

  pauseTimer() {
    this.isRunning.set(false)
  }

  continueTimer() {
    this.isRunning.set(true)
  }

  stopTimer() {
    clearInterval(this.interval)

    this.isRunning.set(false)
    this.isStopped.set(true)
    this.resetTimer()
  }

  timeEnded() {
    this.stopTimer()
    this.playEndSound()
    this.timerEnds.emit(true)
  }

  increaseMinutes() {
    this.userDefinedTime.minutes++
    if (this.userDefinedTime.minutes > this.MAX_TIME) this.userDefinedTime.minutes =  this.MAX_TIME
    this.userDefinedTimeChange.set(this.userDefinedTime)
  }

  decreaseMinutes() {
    this.userDefinedTime.minutes--
    if (this.userDefinedTime.minutes < this.MIN_TIME) this.userDefinedTime.minutes =  this.MIN_TIME
    this.userDefinedTimeChange.set(this.userDefinedTime)
  }

  updateTimer() {
    let currentRunningTimeTemp = this.currentRunningTime()

    currentRunningTimeTemp.seconds--

    if (currentRunningTimeTemp.seconds <= 0) {
      currentRunningTimeTemp.minutes--

      if (currentRunningTimeTemp.minutes < 0) this.timeEnded()
      else currentRunningTimeTemp.seconds = 59
    }

    if (this.isRunning()) {
      this.currentRunningTime.set(currentRunningTimeTemp)

      if (currentRunningTimeTemp.seconds <= 3 && currentRunningTimeTemp.minutes <= 0)
        this.playBipSound()
    }

    this.onTimeChange.set(this.currentRunningTime())
  }

  timeToString(time: TimeModel) {
    const minutes = time.minutes.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    const seconds = time.seconds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    this.currentRunningTimeString.set({ minutes: minutes, seconds: seconds })
  }

  playEndSound() {
    this.endSound.load()
    this.endSound.volume = 0.5

    this.endSound.play()
  }

  playBipSound() {
    this.bipSound.load()
    this.bipSound.volume = 0.5

    this.bipSound.play()
  }
}
