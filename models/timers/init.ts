import { forward, guard, sample } from 'effector';
import { interval } from 'patronum';
import {
  $workTimePassed,
  $breakLimit,
  $breakTimePassed,
  $completedTimersCounter,
  $largeBreakLimit,
  $totalPauseTime,
  $smallBreakLimit,
  $stopsCounter,
  $timerState,
  $totalWorkTime,
  $workLimit,
  changeTimerState,
  increaseBreakingTimer,
  increaseCompletedCounter,
  increasePausingTimer,
  increaseWorkingTimer,
  resetBreakingTimer,
  resetPausingTimer,
  resetWorkingTimer,
  startBreakingTimer,
  startPausingTimer,
  startWorkingTimer, stopWorkingTimer, stopPausingTimer, stopBreakingTimer, skipWorkingTimer,
} from './index';
import { changeTimerType } from '../timerWindow';
import { $notCompletedTasks } from '../tasks';

$timerState.on(changeTimerState, (_, value) => value);

$completedTimersCounter.on(increaseCompletedCounter, (count) => count + 1);
$stopsCounter.on(skipWorkingTimer, (count) => count + 1);

$totalWorkTime.on(increaseWorkingTimer, (time) => time + 1);
$workTimePassed.on(increaseWorkingTimer, (time) => time + 1);
$workTimePassed.reset(resetWorkingTimer);

$totalPauseTime.on(increasePausingTimer, (time) => time + 1);
$totalPauseTime.reset(resetPausingTimer);

$breakTimePassed.on(increaseBreakingTimer, (time) => time + 1);
$breakTimePassed.reset(resetBreakingTimer);

const workingTimer = interval({
  timeout: 1000,
  start: startWorkingTimer,
  stop: stopWorkingTimer,
});

const breakingTimer = interval({
  timeout: 1000,
  start: startBreakingTimer,
  stop: stopBreakingTimer,
});

const pausingTimer = interval({
  timeout: 1000,
  start: startPausingTimer,
  stop: stopPausingTimer,
});

// Рабочий таймер

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
  target: [increaseCompletedCounter, resetWorkingTimer],
});

sample({
  clock: increaseCompletedCounter,
  fn: () => 'break',
  // @ts-ignore
  target: changeTimerType,
});

sample({
  clock: increaseCompletedCounter,
  fn: () => 'new',
  // @ts-ignore
  target: changeTimerState,
});

guard({
  source: $notCompletedTasks,
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

// Таймер паузы

forward({
  from: startPausingTimer,
  to: stopWorkingTimer,
});

sample({
  source: $totalPauseTime,
  clock: pausingTimer.tick,
  target: increasePausingTimer,
});

// Таймер перерыва

sample({
  source: [$smallBreakLimit, $largeBreakLimit],
  clock: $completedTimersCounter,
  fn: ([small, large], counter) => (counter === 4 ? large : small),
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

// Сброс таймеров

forward({
  from: resetWorkingTimer,
  to: stopWorkingTimer,
});

forward({
  from: resetPausingTimer,
  to: stopPausingTimer,
});

forward({
  from: resetBreakingTimer,
  to: stopBreakingTimer,
});
