import { Event } from 'effector';
import { TimerState } from './Timers';

export type TimerType = 'work' | 'pause' | 'break';

interface Btn {
  event: Event<any>,
  type: TimerType,
  state: TimerState,
}

export interface PrimaryBtn extends Btn {
  name: 'Старт' | 'Пауза' | 'Продолжить',
}

export interface SecondaryBtn extends Btn {
  name: 'Стоп' | 'Сделано' | 'Пропустить',
}
