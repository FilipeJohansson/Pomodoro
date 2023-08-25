export interface TimerModel {
  backgroundColor: Colors
  name: string
  time: TimeModel
}

export interface TimeModel {
  minutes: number
  seconds: number
}

export enum Colors {
  GREEN = 'bg-green',
  BLUE = 'bg-blue',
  ORANGE = 'bg-orange',
  PURPLE = 'bg-purple',
}
