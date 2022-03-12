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

export const $allWorkingTimers = app.createStore<StatsCounter[]>([]);
export const $currentWorkingTimer = app.createStore(0);

export const startWorkingTimer = app.createEvent();
export const increaseCurrentWorkingTimer = app.createEvent<number>();
export const increaseAllWorkingTimer = app.createEvent<number>();
export const pauseWorkingTimer = app.createEvent();
export const resetWorkingTimer = app.createEvent();
export const restartWorkingTimer = app.createEvent();
export const stopWorkingTimer = app.createEvent();
export const skipWorkingTimer = app.createEvent();

export const $allPausingTimers = app.createStore<StatsCounter[]>([]);
export const increaseAllPausingTimer = app.createEvent<number>();
export const $currentPausingTimer = app.createStore(0);
export const resetPausingTimer = app.createEvent();

export const $breakingTimer = app.createStore(0);
export const startBreakingTimer = app.createEvent();
export const increaseBreakingTimer = app.createEvent();
export const skipBreakingTimer = app.createEvent();
export const resetBreakingTimer = app.createEvent();
export const stopBreakingTimer = app.createEvent();
export const finishBreakingTimer = app.createEvent();

export const $finishedTimersCounters = app.createStore<StatsCounter[]>([]);
export const $finishedTodayTimersCounter = $finishedTimersCounters
  .map((counterArr) => counterArr.filter((counter) => counter.date === currentDate));
export const increaseFinishedCounter = app.createEvent();

export const $stopsCounters = app.createStore<StatsCounter[]>([]);

export const $timerState = app.createStore<TimerState>('new');
export const changeTimerState = app.createEvent<TimerState>();

export const pushNotificationFx = app.createEffect();
export const setWorkTimestampToLSFx = app.createEffect();
export const setStartPauseToLSFx = app.createEffect();
export const setStopPauseToLSFx = app.createEffect();
export const setBreakTimestampToLSFx = app.createEffect();
export const clearPauseTimestampFromLSFx = app.createEffect();

export const initStatsStore = (data: StatsCounter[], date: string) => {
  const todayTime = data.filter((item) => item.date === date);

  if (todayTime.length > 0) return data;
  return [
    ...data,
    {
      counter: 0,
      date: currentDate,
    },
  ];
};

export const increaseCounter = (date: string, counters: StatsCounter[], value = 1): StatsCounter[] => counters.map((counter) => {
  if (counter.date !== date) return counter;

  return {
    ...counter,
    counter: counter.counter + value,
  };
});
