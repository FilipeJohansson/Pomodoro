import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HoldableDirective } from './holdable/holdable.directive';
import { TimerComponent } from './timer/timer.component';
import { TimersComponent } from './timers/timers.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HoldableDirective,
    TimersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
