import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import {
  $tasks,
  addTask,
  completeTask,
  decreaseTimers,
  editTask,
  increaseTimers,
  removeTask,
} from './index';

const currentDate = dayjs().format('DD-MM-YY');

$tasks.on(addTask, (tasks, name) => {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const notCompletedTasks = tasks.filter((task) => !task.isCompleted);

  return [
    ...notCompletedTasks,
    {
      name,
      isCompleted: false,
      id: nanoid(6),
      timersCount: 1,
      date: currentDate,
    },
    ...completedTasks,
  ];
});

$tasks.on(increaseTimers, (tasks, id) => tasks.map((task) => {
  if (task.id !== id) return task;

  task.timersCount += 1;

  return task;
}));

$tasks.on(decreaseTimers, (tasks, id) => tasks.map((task) => {
  if (task.id !== id) return task;

  task.timersCount -= 1;

  return task;
}));

$tasks.on(editTask, (tasks, { id, value }) => tasks.map((task) => {
  if (task.id !== id) return task;

  task.name = value;

  return task;
}));

$tasks.on(removeTask, (tasks, id) => tasks.filter((task) => task.id !== id));

$tasks.on(completeTask, (_tasks, id) => {
  const tasks = _tasks.map((task) => {
    if (task.id === id) {
      task.isCompleted = true;

      return task;
    }

    return task;
  });

  const completedTask = tasks.shift();

  if (completedTask) tasks.push(completedTask);

  return tasks;
});
