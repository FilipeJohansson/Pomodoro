import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TimerComponent } from './timer/timer.component';
import { Time } from './timer/timer.model';
import { TimersService } from './timers/timers.service';

@Component({
  selector: 'p-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pomodoro'

  constructor(private titleService: Title,
    private timersService: TimersService) {
    this.timersService.changeTimerEvent.subscribe((timer: TimerComponent) => {
      timer.onTimeChange.subscribe((time: Time) => {
        let title = timer.name + ' - ' + time.minutes + ':' + time.seconds
        this.changeTitle(title)
      })

      this.timersService.isRunning.subscribe((isRunning: boolean) => {
        if (!isRunning)
          this.changeTitle(this.title)
      })
    })
  }

  changeTitle(title: string) {
    this.titleService.setTitle(title)
  }
}
