import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'p-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  @Input({ required: true }) isAnyTimerRunning: boolean;
  @Input({ required: true }) isCurrentTimerPaused: boolean;

  @Output() startPressed: EventEmitter<null> = new EventEmitter();
  @Output() stopPressed: EventEmitter<null> = new EventEmitter();
  @Output() pausePressed: EventEmitter<null> = new EventEmitter();
  @Output() continuePressed: EventEmitter<null> = new EventEmitter();
}
