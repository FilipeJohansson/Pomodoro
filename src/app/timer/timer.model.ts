export interface TimerModel {
    backgroundColor: Colors
    name: string
    time: Time
}

export interface Time {
    minutes: number
    seconds: number
}

export enum Colors {
    GREEN = 'bg-green',
    BLUE = 'bg-blue'
}