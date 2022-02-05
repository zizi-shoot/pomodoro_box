import { PrimaryBtn, SecondaryBtn, TimerType } from './TimerWindow';
import { TimerState } from './Timers';

export type ButtonMapping = {
  [N in TimerType]: {
    [M in TimerState]?: {
      primary: PrimaryBtn,
      secondary: SecondaryBtn,
    }
  }
}
