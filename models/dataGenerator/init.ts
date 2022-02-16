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
} from '../timers';

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
