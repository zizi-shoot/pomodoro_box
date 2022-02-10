import { forward, guard, sample } from 'effector';
import { interval } from 'patronum';
import {
  $activeTimePassed,
  $breakLimit,
  $breakTimePassed,
  $completedTimersCounter,
  $largeBreakLimit,
  $pauseLimit,
  $pauseTimePassed,
  $smallBreakLimit,
  $stopsCounter,
  $timerState,
  $totalPauseTime,
  $totalWorkTime,
  $workLimit,
  changeTimerState,
  increaseBreakingTime,
  increaseCompletedCounter,
  increasePausingTime,
  increaseWorkingTime,
  resetBreakingTimer,
  resetPausingTimer,
  resetWorkingTimer,
  startBreakingTimer,
  startPausingTimer,
  startWorkingTimer,
  stopTimer,
} from './index';
import { changeTimerType } from '../timerWindow';
import { $notCompletedTasks } from '../tasks';

$timerState.on(changeTimerState, (_, value) => value);

$completedTimersCounter.on(increaseCompletedCounter, (count) => count + 1);
$stopsCounter.on(resetWorkingTimer, (count) => count + 1);

$totalWorkTime.on(increaseWorkingTime, (time) => time + 1);
$activeTimePassed.on(increaseWorkingTime, (time) => time + 1);
$activeTimePassed.reset(resetWorkingTimer);

$pauseTimePassed.on(increasePausingTime, (time) => time + 1);
$totalPauseTime.on(increasePausingTime, (time) => time + 1);
$pauseTimePassed.reset(resetPausingTimer);

$breakTimePassed.on(increaseBreakingTime, (time) => time + 1);
$breakTimePassed.reset(resetBreakingTimer);

const workingTimer = interval({
  timeout: 1000,
  start: startWorkingTimer,
  stop: stopTimer,
});

const breakingTimer = interval({
  timeout: 1000,
  start: startBreakingTimer,
  stop: stopTimer,
});

const pausingTimer = interval({
  timeout: 1000,
  start: startPausingTimer,
  stop: stopTimer,
});

// Рабочий таймер

guard({
  source: [$activeTimePassed, $workLimit],
  clock: workingTimer.tick,
  filter: ([time, limit]) => time < limit,
  target: increaseWorkingTime,
});

guard({
  source: [$activeTimePassed, $workLimit],
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
  target: stopTimer,
});

// Таймер паузы

guard({
  source: [$pauseTimePassed, $pauseLimit],
  clock: pausingTimer.tick,
  filter: ([time, limit]) => time < limit,
  target: increasePausingTime,
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
  target: increaseBreakingTime,
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

// Сброс любого таймера

forward({
  from: [resetWorkingTimer, resetPausingTimer, resetBreakingTimer],
  to: stopTimer,
});
