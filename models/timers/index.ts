import dayjs from 'dayjs';
import { app } from '../app';
import { TimerState, StatsCounter } from '../../types';

const currentDate = dayjs().format('DD-MM-YY');

export const $workLimit = app.createStore(1500); // 25 мин
export const $smallBreakLimit = app.createStore(300); // 5 мин
export const $largeBreakLimit = app.createStore(1800); // 30 мин
export const $breakLimit = app.createStore(0);
export const $smallBreakAmount = app.createStore(4);

export const changeWorkLimit = app.createEvent<number>();
export const changeSmallBreakLimit = app.createEvent<number>();
export const changeLargeBreakLimit = app.createEvent<number>();
export const changeSmallBreakAmount = app.createEvent<number>();
export const resetSettings = app.createEvent();

export const $totalWorkTime = app.createStore<StatsCounter[]>([]);
export const $workTimePassed = app.createStore(0);
export const startWorkingTimer = app.createEvent();
export const increaseWorkingTimer = app.createEvent();
export const resetWorkingTimer = app.createEvent();
export const stopWorkingTimer = app.createEvent();
export const skipWorkingTimer = app.createEvent();

export const $totalPauseTime = app.createStore<StatsCounter[]>([]);
export const startPausingTimer = app.createEvent();
export const increasePausingTimer = app.createEvent();
export const resetPausingTimer = app.createEvent();
export const stopPausingTimer = app.createEvent();

export const $breakTimePassed = app.createStore(0);
export const startBreakingTimer = app.createEvent();
export const increaseBreakingTimer = app.createEvent();
export const resetBreakingTimer = app.createEvent();
export const stopBreakingTimer = app.createEvent();

export const $finishedTimersCounters = app.createStore<StatsCounter[]>([]);
export const $finishedTodayTimersCounter = $finishedTimersCounters
  .map((counterArr) => counterArr.filter((counter) => counter.date === currentDate));
export const increaseFinishedCounter = app.createEvent();

export const $stopsCounters = app.createStore<StatsCounter[]>([]);

export const $timerState = app.createStore<TimerState>('new');
export const changeTimerState = app.createEvent<TimerState>();
