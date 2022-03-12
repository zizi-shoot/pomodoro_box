import {
  generateFinishedTimers,
  generatePauseTime,
  generateStops,
  generateWorkTime,
} from './index';
import {
  $finishedTimersCounters,
  $stopsCounters,
  $allPausingTimers,
  $allWorkingTimers,
} from '../timers';

$allWorkingTimers.on(generateWorkTime, (timeArr, value) => [
  value,
  ...timeArr,
]);

$allPausingTimers.on(generatePauseTime, (timeArr, value) => [
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
