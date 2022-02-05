import { guard, sample } from 'effector';
import { nanoid } from 'nanoid';
import {
  $tasks,
  addTask,
  completeTask,
  decreaseTimers,
  editTask,
  increaseTimers,
  removeTask,
} from './index';

$tasks.on(addTask, (state, name) => [
  {
    name,
    isCompleted: false,
    id: nanoid(6),
    timersCount: 1,
  },
  ...state,
]);

$tasks.on(increaseTimers, (tasks, id) => [...tasks].map((task) => {
  if (task.id !== id) return task;

  task.timersCount += 1;

  return task;
}));

$tasks.on(decreaseTimers, (tasks, id) => [...tasks].map((task) => {
  if (task.id !== id) return task;

  task.timersCount -= 1;

  return task;
}));

$tasks.on(editTask, (tasks, { id, value }) => [...tasks].map((task) => {
  if (task.id !== id) return task;

  task.name = value;

  return task;
}));

$tasks.on(removeTask, (tasks, id) => [...tasks].filter((task) => task.id !== id));

$tasks.on(completeTask, (tasks, id) => [...tasks].map((task) => {
  if (task.id === id) {
    task.isCompleted = true;

    return task;
  }

  return task;
}));

sample({
  source: $tasks,
  clock: guard({
    source: decreaseTimers,
    clock: $tasks,
    filter: (id, tasks) => {
      if (!tasks.length) return false;

      const targetTask = tasks.find((task) => task.id === id);

      return targetTask ? targetTask.timersCount < 1 : false;
    },
  }),
  fn: (_, id) => id,
  // @ts-ignore
  target: removeTask,
});
