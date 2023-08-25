import { Directive, EventEmitter, HostListener, Output, Signal, computed, signal } from '@angular/core'
import { HoldableStatus } from './holdable.model'

@Directive({
  selector: '[holdable]',
  standalone: true
})
export class HoldableDirective {
  @Output() holdTime: EventEmitter<number> = new EventEmitter()

  stateSignal = signal<HoldableStatus>(HoldableStatus.CANCELED)

  cancelSignal: Signal<boolean> = computed(() => this.stateSignal() === HoldableStatus.CANCELED)

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.stateSignal.set(HoldableStatus.CANCELED)
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    this.stateSignal.set(HoldableStatus.STARTED)

    const n = 150
    let interval = setInterval((v) => {
      if (this.cancelSignal())
        clearInterval(interval)
      this.holdTime.emit(v * n)
    }, n)
  }

}
