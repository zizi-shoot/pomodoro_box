import dayjs from 'dayjs';
import { interval } from 'patronum';
import { guard, sample } from 'effector';
import { persist } from 'effector-storage/local';
import {
  $allPausingTimers,
  $allWorkingTimers,
  $breakingTimer,
  $breakLimit,
  $currentPausingTimer,
  $currentWorkingTimer,
  $finishedTimersCounters,
  $finishedTodayTimersCounter,
  $largeBreakLimit,
  $smallBreakAmount,
  $smallBreakLimit,
  $stopsCounters,
  $timerState,
  $workLimit,
  changeLargeBreakLimit,
  changeSmallBreakAmount,
  changeSmallBreakLimit,
  changeTimerState,
  changeWorkLimit,
  clearPauseTimestampFromLSFx,
  finishBreakingTimer,
  increaseAllPausingTimer,
  increaseAllWorkingTimer,
  increaseBreakingTimer,
  increaseCounter,
  increaseCurrentWorkingTimer,
  increaseFinishedCounter,
  initStatsStore,
  pauseWorkingTimer,
  pushNotificationFx,
  resetBreakingTimer,
  resetPausingTimer,
  resetSettings,
  resetWorkingTimer,
  restartWorkingTimer,
  setBreakTimestampToLSFx,
  setStartPauseToLSFx,
  setStopPauseToLSFx,
  setWorkTimestampToLSFx,
  skipBreakingTimer,
  skipWorkingTimer,
  startBreakingTimer,
  startWorkingTimer,
  stopBreakingTimer,
  stopWorkingTimer,
} from './index';
import { useNotify } from '../../hooks';
import { $isAllowedNotifications, initApp } from '../app';
import { changeTimerType } from '../timerWindow';
import { $notCompletedTodayTasks } from '../tasks';

const currentDate = dayjs().format('DD-MM-YY');

$timerState.on(changeTimerState, (_, value) => value);

/**
 * Настройки
 */

$workLimit.on(changeWorkLimit, (_, value) => value);
$smallBreakLimit.on(changeSmallBreakLimit, (_, value) => value);
$largeBreakLimit.on(changeLargeBreakLimit, (_, value) => value);
$smallBreakAmount.on(changeSmallBreakAmount, (_, value) => value);

$workLimit.reset(resetSettings);
$smallBreakLimit.reset(resetSettings);
$largeBreakLimit.reset(resetSettings);
$smallBreakAmount.reset(resetSettings);

pushNotificationFx.use((title) => {
  if (typeof title === 'string') {
    const notify = useNotify(title);
    // noinspection JSIgnoredPromiseFromCall
    notify();
  }
});

/**
 * Инициализация общих сторов по дням для статистики
 */

$allWorkingTimers.on(initApp, (storeData) => initStatsStore(storeData, currentDate));
$allPausingTimers.on(initApp, (storeData) => initStatsStore(storeData, currentDate));
$finishedTimersCounters.on(initApp, (storeData) => initStatsStore(storeData, currentDate));
$stopsCounters.on(initApp, (storeData) => initStatsStore(storeData, currentDate));

/**
 * Изменения общих сторов
 */

$finishedTimersCounters.on(
  increaseFinishedCounter,
  (counters) => increaseCounter(currentDate, counters),
);
$stopsCounters.on(
  skipWorkingTimer,
  (counters) => increaseCounter(currentDate, counters),
);

/**
 * Рабочий таймер
 *
 * Создание и обработка событий
 */

setWorkTimestampToLSFx.use(() => localStorage.setItem('startWork', Date.now().toString()));
$allWorkingTimers.on(
  increaseAllWorkingTimer,
  (timers, value) => increaseCounter(currentDate, timers, value),
);
$currentWorkingTimer.on(increaseCurrentWorkingTimer, (_, value) => value);
$currentWorkingTimer.reset(resetWorkingTimer);

const workingTimer = interval({
  timeout: 1000,
  start: startWorkingTimer,
  stop: stopWorkingTimer,
});

sample({
  clock: startWorkingTimer,
  target: setWorkTimestampToLSFx,
});

guard({
  source: $notCompletedTodayTasks,
  clock: restartWorkingTimer,
  filter: (tasks) => tasks.length === 0,
  target: stopWorkingTimer,
});

// Увеличение счётчика
sample({
  source: $currentPausingTimer,
  clock: guard({
    source: [$currentWorkingTimer, $workLimit],
    clock: workingTimer.tick,
    filter: ([time, limit]) => {
      const startPause = localStorage.getItem('startPause');
      const stopPause = localStorage.getItem('stopPause');

      if (startPause && !stopPause) return false;

      return time < limit;
    },
  }),
  fn: (pauseTimer) => {
    const startWork = localStorage.getItem('startWork');

    if (!startWork) return 0;

    return Math.round((Date.now() - +startWork) / 1000) - pauseTimer;
  },
  target: increaseCurrentWorkingTimer,
});

// Обработка завершения счётчика
guard({
  source: [$currentWorkingTimer, $workLimit],
  clock: workingTimer.tick,
  filter: ([time, limit]) => {
    const startPause = localStorage.getItem('startPause');
    const stopPause = localStorage.getItem('stopPause');

    if (startPause && !stopPause) return false;

    return time === limit;
  },
  target: [increaseFinishedCounter, stopWorkingTimer, resetWorkingTimer, resetPausingTimer],
});

sample({
  clock: guard({
    clock: increaseFinishedCounter,
    filter: $isAllowedNotifications,
  }),
  fn: () => 'Отличная работа! Пора отдохнуть',
  target: pushNotificationFx,
});

// Изменение типа и состояния окна таймера
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

// Обработка пропуска или остановки таймера
sample({
  source: $currentWorkingTimer,
  clock: [skipWorkingTimer, stopWorkingTimer],
  target: increaseAllWorkingTimer,
});

sample({
  clock: skipWorkingTimer,
  target: [resetWorkingTimer, stopWorkingTimer, resetPausingTimer],
});

/**
 * Обработка паузы
 */

setStartPauseToLSFx.use(() => localStorage.setItem('startPause', Date.now().toString()));
setStopPauseToLSFx.use(() => localStorage.setItem('stopPause', Date.now().toString()));
clearPauseTimestampFromLSFx.use(() => {
  localStorage.removeItem('startPause');
  localStorage.removeItem('stopPause');
});

$allPausingTimers.on(
  increaseAllPausingTimer,
  (timers, value) => increaseCounter(currentDate, timers, value),
);
$currentPausingTimer.on(setStopPauseToLSFx.doneData, (timer) => {
  const startPause = localStorage.getItem('startPause');
  const stopPause = localStorage.getItem('stopPause');

  if (!startPause || !stopPause) return timer;

  // noinspection JSIgnoredPromiseFromCall
  clearPauseTimestampFromLSFx('clear pause');

  return timer + Math.round((+stopPause - +startPause) / 1000);
});
$currentPausingTimer.reset(resetPausingTimer);

sample({
  clock: pauseWorkingTimer,
  fn: () => 'startPause',
  target: setStartPauseToLSFx,
});

sample({
  clock: restartWorkingTimer,
  fn: () => 'stopPause',
  target: setStopPauseToLSFx,
});

sample({
  source: $currentPausingTimer,
  clock: [skipWorkingTimer, stopWorkingTimer],
  target: increaseAllPausingTimer,
});

sample({
  clock: resetPausingTimer,
  target: clearPauseTimestampFromLSFx,
});

/**
 * Таймер перерыва
 *
 * Создание и обработка событий
 */

setBreakTimestampToLSFx.use(() => localStorage.setItem('startBreak', Date.now().toString()));
$breakingTimer.on(increaseBreakingTimer, (_, value) => value);
$breakingTimer.reset(resetBreakingTimer);

const breakingTimer = interval({
  timeout: 1000,
  start: startBreakingTimer,
  stop: stopBreakingTimer,
});

sample({
  clock: startBreakingTimer,
  target: setBreakTimestampToLSFx,
});

sample({
  source: [$smallBreakLimit, $largeBreakLimit, $smallBreakAmount],
  clock: $finishedTodayTimersCounter,
  fn: ([small, large, amount], counter) => (counter[0].counter % amount === 0 ? large : small),
  target: $breakLimit,
});

// Увеличение счётчика
sample({
  clock: guard({
    source: [$breakingTimer, $breakLimit],
    clock: breakingTimer.tick,
    filter: ([timer, limit]) => timer < limit,
  }),
  fn: () => {
    const startBreak = localStorage.getItem('startBreak');

    if (!startBreak) return 0;

    return Math.round((Date.now() - +startBreak) / 1000);
  },
  target: increaseBreakingTimer,
});

// Обработка завершения счётчика
guard({
  source: [$breakingTimer, $breakLimit],
  clock: breakingTimer.tick,
  filter: ([time, limit]) => time === limit,
  target: [stopBreakingTimer, resetBreakingTimer, finishBreakingTimer],
});

sample({
  clock: guard({
    clock: finishBreakingTimer,
    filter: $isAllowedNotifications,
  }),
  fn: () => 'Перерыв закончился! Пора поработать',
  target: pushNotificationFx,
});

// Изменение типа и состояния окна таймера
sample({
  clock: guard({
    source: [$breakingTimer, $breakLimit],
    clock: breakingTimer.tick,
    filter: ([time, limit]) => time === limit,
  }),
  fn: () => 'work',
  // @ts-ignore
  target: changeTimerType,
});

sample({
  clock: guard({
    source: [$breakingTimer, $breakLimit],
    clock: breakingTimer.tick,
    filter: ([time, limit]) => time === limit,
  }),
  fn: () => 'new',
  // @ts-ignore
  target: changeTimerState,
});

// Обработка пропуска или остановки таймера
sample({
  clock: skipBreakingTimer,
  target: [stopBreakingTimer, resetBreakingTimer],
});

// Инициализация приложения
initApp();

persist({ store: $workLimit });
persist({ store: $smallBreakLimit });
persist({ store: $largeBreakLimit });
persist({ store: $breakLimit });
persist({ store: $smallBreakAmount });
persist({ store: $allWorkingTimers });
persist({ store: $allPausingTimers });
persist({ store: $breakingTimer });
persist({ store: $finishedTimersCounters });
persist({ store: $stopsCounters });
