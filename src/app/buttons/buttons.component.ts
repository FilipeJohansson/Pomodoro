import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'p-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  @Input({ required: true }) isAnyTimerRunning: boolean
  @Input({ required: true }) isCurrentTimerPaused: boolean

  @Output() startPressed = new EventEmitter()
  @Output() stopPressed = new EventEmitter()
  @Output() pausePressed = new EventEmitter()
  @Output() continuePressed = new EventEmitter()
  @Output() musicCheckboxChanged = new EventEmitter<boolean>()

  onMusicCheckboxChanged = (e) => this.musicCheckboxChanged.emit(e.target.checked)
}
