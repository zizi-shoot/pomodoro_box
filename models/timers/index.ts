import { Timers } from '../../typings';
import { app } from '../app';

const $timersByTask = app.createStore<Timers>({});

const addTimer = app.createEvent<string>();
const addFirstTimer = app.createEvent<string>();
const removeTimer = app.createEvent<string>();

export {
  $timersByTask, addTimer, addFirstTimer, removeTimer,
};
