export interface Timer {
  status: 'new' | 'started' | 'paused' | 'stopped',
  timePassed: number,
}

export interface Timers {
  [N: string]: Timer[],
}
