import {
  $selectedDay,
  $selectedPeriod,
  setSelectedDay,
  setSelectedPeriod,
} from './index';

$selectedPeriod.on(setSelectedPeriod, (_, value) => value);
$selectedDay.on(setSelectedDay, (_, value) => value);
