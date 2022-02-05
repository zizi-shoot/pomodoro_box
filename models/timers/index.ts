import { app } from '../app';
import { TimerState } from '../../typings';

export const $workLimit = app.createStore(15); // 25 мин
export const $smallBreakLimit = app.createStore(5); // 5 мин
export const $largeBreakLimit = app.createStore(10); // 30 мин
export const $breakLimit = app.createStore(0);
export const $pauseLimit = app.createStore(60); // 1 мин

export const $completedTimersCounter = app.createStore(0);
export const $stopsCounter = app.createStore(0);
export const $totalWorkTime = app.createStore(0);
export const $totalPauseTime = app.createStore(0);

export const $timerState = app.createStore<TimerState>('new');

export const $activeTimePassed = app.createStore(0);
export const $pauseTimePassed = app.createStore(0);
export const $breakTimePassed = app.createStore(0);

export const changeTimerState = app.createEvent<TimerState>();

export const increaseCompletedCounter = app.createEvent();
export const increaseStopsCounter = app.createEvent();

export const startWorkingTimer = app.createEvent();
export const increaseWorkingTime = app.createEvent();
export const resetWorkingTimer = app.createEvent();

export const startPausingTimer = app.createEvent();
export const increasePausingTime = app.createEvent();
export const resetPausingTimer = app.createEvent();

export const startBreakingTimer = app.createEvent();
export const increaseBreakingTime = app.createEvent();
export const resetBreakingTimer = app.createEvent();

export const stopTimer = app.createEvent();
