import { Event, forward, guard } from 'effector';
import { app } from '../app';
import {
  $activeTimePassed,
  $completedTimersCounter,
  $pomodoroTime,
  $stopsCounter,
  $totalWorkTime,
  increaseCompletedCounter,
  increaseStopsCounter,
  increaseTime,
  resetTimer,
  startTimer,
  stopTimer,
} from './index';

$completedTimersCounter.on(increaseCompletedCounter, (count) => count + 1);
$stopsCounter.on(increaseStopsCounter, (count) => count + 1);

$totalWorkTime.on(increaseTime, (count) => count + 1);
$activeTimePassed.on(increaseTime, (time) => time + 1);
$activeTimePassed.reset(resetTimer);

// eslint-disable-next-line no-promise-executor-return
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const createTimer = (start: Event<number>, stop: Event<void> = stopTimer) => {
  const $working = app.createStore(true);
  const tick = app.createEvent<number>();
  const timerFx = app.createEffect(() => wait());

  $working
    .on(start, () => true)
    .on(stop, () => false);

  const willTick = guard({
    // @ts-ignore
    source: timerFx.done.map(({ params }) => params - 1),
    filter: (seconds) => seconds >= 0,
  });

  guard({
    source: start,
    filter: timerFx.pending.map((is) => !is),
    target: tick,
  });

  forward({
    from: tick,
    to: timerFx,
  });

  guard({
    source: willTick,
    filter: $working,
    target: tick,
  });

  return { tick };
};

const timer = createTimer(startTimer);

forward({
  from: resetTimer,
  to: increaseStopsCounter,
});

guard({
  source: [$activeTimePassed, $pomodoroTime],
  clock: timer.tick,
  filter: ([time, pomodoroTime]) => time < pomodoroTime,
  target: increaseTime,
});

guard({
  source: [$activeTimePassed, $pomodoroTime],
  clock: timer.tick,
  filter: ([time, pomodoroTime]) => time === pomodoroTime,
  target: increaseCompletedCounter,
});
