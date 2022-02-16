import dayjs from 'dayjs';
import hotkeys from 'hotkeys-js';
import {
  generateFinishedTimers,
  generatePauseTime,
  generateStops,
  generateWorkTime,
} from './index';
import {
  $finishedTimersCounters,
  $stopsCounters,
  $totalPauseTime,
  $totalWorkTime,
  $workLimit,
} from '../timers';
import { StatsCounter } from '../../typings';

$totalWorkTime.on(generateWorkTime, (timeArr, value) => [
  value,
  ...timeArr,
]);

$totalPauseTime.on(generatePauseTime, (timeArr, value) => [
  ...timeArr,
  value,
]);

$finishedTimersCounters.on(generateFinishedTimers, (counters, value) => [
  ...counters,
  value,
]);

$stopsCounters.on(generateStops, (counters, value) => [
  ...counters,
  value,
]);

const generateValue = (date: string, max: number): StatsCounter => {
  const counter = Math.floor(Math.random() * (max + 1));

  return {
    date,
    counter,
  };
};

const generateData = () => {
  const _date = dayjs();
  for (let i = 1; i < 21; i++) {
    const date = _date.subtract(i, 'day').format('DD-MM-YY');

    const workTime = generateValue(date, 6 * 60 * 60);

    const pauseRatio = 15 + Math.floor(Math.random() * 30);
    const pauseTime = generateValue(date, workTime.counter * (pauseRatio / 100));

    // eslint-disable-next-line effector/no-getState
    const finishedCounter = Math.round(workTime.counter / $workLimit.getState());

    // eslint-disable-next-line effector/no-getState
    const stopCounter = generateValue(date, 10);

    generateWorkTime(workTime);
    generatePauseTime(pauseTime);
    generateStops(stopCounter);
    generateFinishedTimers({
      date,
      counter: finishedCounter,
    });
  }
};

if (typeof window !== 'undefined') {
  hotkeys('alt+g', (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Сгенерировать рандомные значения?')) generateData();
  });
}
