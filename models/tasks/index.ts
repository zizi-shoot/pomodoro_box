import dayjs from 'dayjs';
import { EditTask, Task } from '../../typings';
import { app } from '../app';

const currentDate = dayjs().format('DD-MM-YY');

export const $tasks = app.createStore<Task[]>([]);
export const $todayTasks = $tasks.map((tasks) => tasks.filter((task) => task.date === currentDate));
export const $notCompletedTodayTasks = $tasks
  .map((tasks) => tasks.filter((task) => !task.isCompleted && task.date === currentDate));

export const addTask = app.createEvent<string>();
export const editTask = app.createEvent<EditTask>();
export const removeTask = app.createEvent<string>();
export const increaseTimers = app.createEvent<string>();
export const decreaseTimers = app.createEvent<string>();
export const completeTask = app.createEvent<string>();
