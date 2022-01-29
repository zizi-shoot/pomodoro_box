import { nanoid } from 'nanoid';
import { sample } from 'effector';
import { $tasks, addTask } from './index';
import { addFirstTimer } from '../timers';

$tasks.on(addTask, (state, value) => [
  {
    name: value,
    isCompleted: false,
    id: nanoid(6),
  },
  ...state,
]);

sample({
  clock: addTask,
  source: $tasks,
  fn: (tasks) => tasks[0].id,
  target: addFirstTimer,
});
