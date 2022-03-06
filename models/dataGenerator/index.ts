import dayjs from 'dayjs';
import { app } from '../app';
import { StatsCounter } from '../../types';
import { $workLimit } from '../timers';

export const generateWorkTime = app.createEvent<StatsCounter>();
export const generatePauseTime = app.createEvent<StatsCounter>();
export const generateFinishedTimers = app.createEvent<StatsCounter>();
export const generateStops = app.createEvent<StatsCounter>();

const generateValue = (date: string, max: number): StatsCounter => {
  const counter = Math.floor(Math.random() * (max + 1));

  return {
    date,
    counter,
  };
};

export const generateData = () => {
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
