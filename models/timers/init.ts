import { forward, guard, sample } from 'effector';
import { interval } from 'patronum';
import dayjs from 'dayjs';
import {
  $workTimePassed,
  $breakLimit,
  $breakTimePassed,
  $finishedTimersCounters,
  $largeBreakLimit,
  $totalPauseTime,
  $smallBreakLimit,
  $stopsCounters,
  $timerState,
  $totalWorkTime,
  $workLimit,
  changeTimerState,
  increaseBreakingTimer,
  increaseFinishedCounter,
  increasePausingTimer,
  increaseWorkingTimer,
  resetBreakingTimer,
  resetPausingTimer,
  resetWorkingTimer,
  startBreakingTimer,
  startPausingTimer,
  startWorkingTimer,
  stopWorkingTimer,
  stopPausingTimer,
  stopBreakingTimer,
  skipWorkingTimer,
  $finishedTodayTimersCounter,
} from './index';
import { changeTimerType } from '../timerWindow';
import { $notCompletedTodayTasks } from '../tasks';
import { initApp } from '../app';

const currentDate = dayjs().format('DD-MM-YY');

$timerState.on(changeTimerState, (_, value) => value);

/**
 * Рабочий таймер
 *
 * Создание и обработка событий
 */

$totalWorkTime.on(initApp, (timeArr) => {
  const todayTime = timeArr.filter((time) => time.date === currentDate);

  if (todayTime.length) return timeArr;

  return [
    ...timeArr,
    {
      counter: 0,
      date: currentDate,
    },
  ];
});

$totalWorkTime.on(increaseWorkingTimer, (timeArr) => timeArr.map((time) => {
  if (time.date === currentDate) {
    return {
      ...time,
      counter: time.counter + 1,
    };
  }

  return time;
}));

$workTimePassed.on(increaseWorkingTimer, (time) => time + 1);
$workTimePassed.reset(resetWorkingTimer);

const workingTimer = interval({
  timeout: 1000,
  start: startWorkingTimer,
  stop: stopWorkingTimer,
});

guard({
  source: [$workTimePassed, $workLimit],
  clock: workingTimer.tick,
  filter: ([time, limit]) => time < limit,
  target: increaseWorkingTimer,
});

guard({
  source: [$workTimePassed, $workLimit],
  clock: workingTimer.tick,
  filter: ([time, limit]) => time === limit,
  target: [increaseFinishedCounter, resetWorkingTimer],
});

sample({
  clock: increaseFinishedCounter,
  fn: () => 'break',
  // @ts-ignore
  target: changeTimerType,
});

sample({
  clock: increaseFinishedCounter,
  fn: () => 'new',
  // @ts-ignore
  target: changeTimerState,
});

guard({
  source: $notCompletedTodayTasks,
  clock: startWorkingTimer,
  filter: (tasks) => tasks.length === 0,
  target: stopWorkingTimer,
});

forward({
  from: startWorkingTimer,
  to: stopPausingTimer,
});

forward({
  from: skipWorkingTimer,
  to: resetWorkingTimer,
});

forward({
  from: resetWorkingTimer,
  to: stopWorkingTimer,
});

/**
 * Таймер паузы
 *
 * Создание и обработка событий
 */

$totalPauseTime.on(initApp, (timeArr) => {
  const todayTime = timeArr.filter((time) => time.date === currentDate);

  if (todayTime.length) return timeArr;

  return [
    ...timeArr,
    {
      counter: 0,
      date: currentDate,
    },
  ];
});

$totalPauseTime.on(increasePausingTimer, (timeArr) => timeArr.map((time) => {
  if (time.date === currentDate) {
    return {
      ...time,
      counter: time.counter + 1,
    };
  }

  return time;
}));

$totalPauseTime.reset(resetPausingTimer);

const pausingTimer = interval({
  timeout: 1000,
  start: startPausingTimer,
  stop: stopPausingTimer,
});

forward({
  from: startPausingTimer,
  to: stopWorkingTimer,
});

sample({
  source: $totalPauseTime,
  clock: pausingTimer.tick,
  target: increasePausingTimer,
});

forward({
  from: resetPausingTimer,
  to: stopPausingTimer,
});

/**
 * Таймер перерыва
 *
 * Создание и обработка событий
 */

$breakTimePassed.on(increaseBreakingTimer, (time) => time + 1);
$breakTimePassed.reset(resetBreakingTimer);

const breakingTimer = interval({
  timeout: 1000,
  start: startBreakingTimer,
  stop: stopBreakingTimer,
});

sample({
  source: [$smallBreakLimit, $largeBreakLimit],
  clock: $finishedTodayTimersCounter,
  fn: ([small, large], counter) => (counter[0].counter === 4 ? large : small),
  target: $breakLimit,
});

guard({
  source: [$breakTimePassed, $breakLimit],
  clock: breakingTimer.tick,
  filter: ([time, limit]) => time < limit,
  target: increaseBreakingTimer,
});

guard({
  source: [$breakTimePassed, $breakLimit],
  clock: breakingTimer.tick,
  filter: ([time, limit]) => time === limit,
  target: resetBreakingTimer,
});

sample({
  source: [$breakTimePassed, $breakLimit],
  clock: guard({
    source: [$breakTimePassed, $breakLimit],
    clock: breakingTimer.tick,
    filter: ([time, limit]) => time === limit,
  }),
  fn: () => 'work',
  // @ts-ignore
  target: changeTimerType,
});

sample({
  source: [$breakTimePassed, $breakLimit],
  clock: guard({
    source: [$breakTimePassed, $breakLimit],
    clock: breakingTimer.tick,
    filter: ([time, limit]) => time === limit,
  }),
  fn: () => 'new',
  // @ts-ignore
  target: changeTimerState,
});

forward({
  from: resetBreakingTimer,
  to: stopBreakingTimer,
});

/**
 * Счётчик законченных помидорок
 *
 * Инициализация и обработка событий
 */

$finishedTimersCounters.on(initApp, (counterArr) => {
  const todayCounter = counterArr.filter((counter) => counter.date === currentDate);

  if (todayCounter.length) return counterArr;

  return [
    ...counterArr,
    {
      counter: 0,
      date: currentDate,
    },
  ];
});

$finishedTimersCounters.on(increaseFinishedCounter, (timeArr) => timeArr.map((time) => {
  if (time.date === currentDate) {
    return {
      ...time,
      counter: time.counter + 1,
    };
  }

  return time;
}));

/**
 * Счётчик остановок
 *
 * Инициализация и обработка событий
 */

$stopsCounters.on(initApp, (counterArr) => {
  const todayCounter = counterArr.filter((counter) => counter.date === currentDate);

  if (todayCounter.length) return counterArr;

  return [
    ...counterArr,
    {
      counter: 0,
      date: currentDate,
    },
  ];
});

$stopsCounters.on(skipWorkingTimer, (timeArr) => timeArr.map((time) => {
  if (time.date === currentDate) {
    return {
      ...time,
      counter: time.counter + 1,
    };
  }

  return time;
}));

// Инициализация приложения
initApp();
