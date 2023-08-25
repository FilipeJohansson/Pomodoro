import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ButtonsComponent } from './buttons/buttons.component'
import { TimersComponent } from './timers/timers.component'
import { TimersService } from './timers/timers.service'

@Component({
  standalone: true,
  imports: [CommonModule, TimersComponent, ButtonsComponent],
  providers: [Title],
  selector: 'p-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  titleService = inject(Title)
  timersService = inject(TimersService)

  title = 'Pomodoro'

  constructor() {
    effect(() => {
      const timer = this.timersService.currentRunningTimer()
      const time = timer?.onTimeChange()

      if (timer && time) {
        let title = timer.name + ' - ' + this.timeToString(time.minutes) + ':' + this.timeToString(time.seconds)
        if (!this.timersService.currentRunningTimer()?.isRunning()) title = timer.name + ' - Paused'

        this.changeTitle(title)
      }

      if (this.timersService.currentRunningTimer()?.isStopped()) this.changeTitle(this.title)
    })
  }

  changeTitle(title: string) {
    this.titleService.setTitle(title)
  }

  timeToString(value: number): string {
    return value.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  onStartPressed = () => this.timersService.startNextTimer()
  onStopPressed = () => this.timersService.stopCurrentTimer()
  onPausePressed = () => this.timersService.pauseCurrentTimer()
  onContinuePressed = () => this.timersService.continueCurrentTimer()
  onMusicCheckboxChanged = (value: boolean) => this.timersService.musicController(value)
}
