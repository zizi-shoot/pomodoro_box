import { app } from '../app';
import { TimerState } from '../../typings';

export const $workLimit = app.createStore(1500); // 25 мин
export const $smallBreakLimit = app.createStore(300); // 5 мин
export const $largeBreakLimit = app.createStore(1800); // 30 мин
export const $breakLimit = app.createStore(0);

export const $totalWorkTime = app.createStore(0);
export const $workTimePassed = app.createStore(0);
export const startWorkingTimer = app.createEvent();
export const increaseWorkingTimer = app.createEvent();
export const resetWorkingTimer = app.createEvent();
export const stopWorkingTimer = app.createEvent();
export const skipWorkingTimer = app.createEvent();

export const $totalPauseTime = app.createStore(0);
export const startPausingTimer = app.createEvent();
export const increasePausingTimer = app.createEvent();
export const resetPausingTimer = app.createEvent();
export const stopPausingTimer = app.createEvent();

export const $breakTimePassed = app.createStore(0);
export const startBreakingTimer = app.createEvent();
export const increaseBreakingTimer = app.createEvent();
export const resetBreakingTimer = app.createEvent();
export const stopBreakingTimer = app.createEvent();

export const $completedTimersCounter = app.createStore(0);
export const increaseCompletedCounter = app.createEvent();

export const $stopsCounter = app.createStore(0);

export const $timerState = app.createStore<TimerState>('new');
export const changeTimerState = app.createEvent<TimerState>();
