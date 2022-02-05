import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useEvent } from 'effector-react';
import { Task as TaskProps } from '../../../typings';
import {
  decreaseTimers,
  editTask,
  increaseTimers,
  removeTask,
} from '../../../models/tasks';
import styles from './task.module.css';

export const Task = ({ task }: { task: TaskProps }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<string>('');

  const { id, name, timersCount } = task;

  const editTaskFn = useEvent(editTask);
  const removeTaskFn = useEvent(removeTask);
  const increaseTimersFn = useEvent(increaseTimers);
  const decreaseTimersFn = useEvent(decreaseTimers);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDialogValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    editTaskFn({ id, value: dialogValue });
    setDialogValue('');
    setIsEditDialogOpen(false);
  };

  return (
    <li className={styles.task}>
      <button style={{ marginRight: 8 }} type="button" onClick={() => decreaseTimersFn(id)}>-</button>
      <span style={{ marginRight: 8 }}>{timersCount}</span>
      <span style={{ marginRight: 16 }}>X 🍅</span>
      <button style={{ marginRight: 16 }} type="button" onClick={() => increaseTimersFn(id)}>+</button>
      <span style={{ marginRight: 16 }}>{name}</span>
      <button style={{ marginRight: 16 }} type="button" onClick={() => setIsEditDialogOpen(true)}>Редактировать</button>
      <button style={{ marginRight: 16 }} type="button" onClick={() => removeTaskFn(id)}>Удалить</button>
      {
        isEditDialogOpen
        && (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <input type="text" value={dialogValue} onChange={handleChange} minLength={3} />
            <button type="submit">Ок</button>
          </form>
        )
      }
    </li>
  );
};
