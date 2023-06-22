import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable, Subject, filter, interval, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[holdable]'
})
export class HoldableDirective {
  @Output() holdTime: EventEmitter<number> = new EventEmitter()

  state: Subject<string> = new Subject()

  cancel: Observable<string>

  constructor() {
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        this.holdTime.emit(0)
      })
    )
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel')
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    this.state.next('start')

    const n = 100
    interval(n).pipe(
      takeUntil(this.cancel),
      tap((v: number) => {
        this.holdTime.emit(v * n)
      }),
    ).subscribe()
  }

}
