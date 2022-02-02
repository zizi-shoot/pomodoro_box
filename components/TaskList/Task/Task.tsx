import React from 'react';
import { useEvent } from 'effector-react';
import { Task as TaskProps } from '../../../typings';
import {
  decreaseTimers,
  editTask,
  increaseTimers,
  removeTask,
} from '../../../models/tasks';

export const Task = ({ task }: { task: TaskProps }) => {
  const { id, name, timersCount } = task;

  const editTaskFn = useEvent(editTask);
  const removeTaskFn = useEvent(removeTask);
  const increaseTimersFn = useEvent(increaseTimers);
  const decreaseTimersFn = useEvent(decreaseTimers);

  return (
    <li>
      <button style={{ marginRight: 8 }} type="button" onClick={() => decreaseTimersFn(id)}>-</button>
      <span style={{ marginRight: 8 }}>{timersCount}</span>
      <span style={{ marginRight: 16 }}>X 🍅</span>
      <button style={{ marginRight: 16 }} type="button" onClick={() => increaseTimersFn(id)}>+</button>
      <span style={{ marginRight: 16 }}>{name}</span>
      <button style={{ marginRight: 16 }} type="button" onClick={() => editTaskFn({ id, value: '123' })}>Редактировать</button>
      <button style={{ marginRight: 16 }} type="button" onClick={() => removeTaskFn(id)}>Удалить</button>
    </li>
  );
};
