import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { TimerComponent } from '../timer/timer.component'
import { Colors, TimerModel } from '../timer/timer.model'
import { TimersService } from './timers.service'

@Component({
  standalone: true,
  imports: [CommonModule, TimerComponent],
  selector: 'p-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimersComponent {
  timersService = inject(TimersService)

  // TODO send time to a shared file
  timersData: TimerModel[] = [
    { backgroundColor: Colors.BLUE, name: 'WORK', time: { minutes: 0, seconds: 5 } },
    { backgroundColor: Colors.GREEN, name: 'BREAK', time: { minutes: 0, seconds: 7 } },
  ]

  onAddTimer = (timer: TimerComponent) => this.timersService.addTimer(timer)
  onTimerEnds = () => this.timersService.endTimer()
}
