import { app } from '../app';
import { PrimaryBtn, SecondaryBtn, TimerType } from '../../typings';
import { resetWorkingTimer, startWorkingTimer } from '../timers';

export const $timerType = app.createStore<TimerType>('work');
export const changeTimerType = app.createEvent<TimerType>();

export const $primaryBtn = app.createStore<PrimaryBtn>({
  name: 'Старт',
  event: startWorkingTimer,
  type: 'work',
  state: 'started',
});

export const $secondaryBtn = app.createStore<SecondaryBtn>({
  name: 'Стоп',
  event: resetWorkingTimer,
  type: 'work',
  state: 'new',
});
