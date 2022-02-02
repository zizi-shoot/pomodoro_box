import { Task } from '../../typings';
import { app } from '../app';

interface EditTask {
  id: string,
  value: string,
}

export const $tasks = app.createStore<Task[]>([]);
export const $notCompletedTasks = $tasks.map((tasks) => tasks.filter((task) => !task.isCompleted));

export const addTask = app.createEvent<string>();
export const editTask = app.createEvent<EditTask>();
export const removeTask = app.createEvent<string>();
export const increaseTimers = app.createEvent<string>();
export const decreaseTimers = app.createEvent<string>();
export const completeTask = app.createEvent<string>();
