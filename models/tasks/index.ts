import { combine } from 'effector';
import { Task } from '../../typings';
import { app } from '../app';
import { $timersByTask } from '../timers';

const $tasks = app.createStore<Task[]>([]);
const $tasksWithTimersCount = combine($tasks, $timersByTask, (tasks, timers) => tasks.map((task) => ({
  ...task,
  timersCount: timers[task.id].length,
})));

const addTask = app.createEvent<string>();

export { $tasks, addTask, $tasksWithTimersCount };
