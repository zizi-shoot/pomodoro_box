import { app } from '../app';

export const $pomodoroTime = app.createStore(1500); // 25 мин
export const $smallBreakTime = app.createStore(300); // 5 мин

export const $completedTimersCounter = app.createStore(0);
export const $stopsCounter = app.createStore(0);
export const $totalWorkTime = app.createStore(0);
export const $totalPauseTime = app.createStore(0);

export const $activeTimePassed = app.createStore(0);
export const $pauseTimePassed = app.createStore(0);
export const $breakTimePassed = app.createStore(0);

export const increaseCompletedCounter = app.createEvent<void>();
export const increaseStopsCounter = app.createEvent<void>();

export const startTimer = app.createEvent<number>();
export const increaseTime = app.createEvent<void>();
export const stopTimer = app.createEvent<void>();
export const resetTimer = app.createEvent<void>();
