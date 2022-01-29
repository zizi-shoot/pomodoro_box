import { useEvent } from 'effector-react';
import React from 'react';
import { addTimer, removeTimer } from '../../../models/timers';

interface Props {
  id: string,
  name: string,
  timersCount: number,
}

export const Task = ({ id, name, timersCount }: Props) => {
  const addTimerFn = useEvent(addTimer);
  const removeTimerFn = useEvent(removeTimer);

  return (
    <li>
      <span style={{ marginRight: 16 }}>{timersCount}</span>
      <span style={{ marginRight: 16 }}>{name}</span>{' '}
      <button type="button" onClick={() => removeTimerFn(id)} style={{ marginRight: 8 }}>-</button>
      <button type="button" onClick={() => addTimerFn(id)}>+</button>
    </li>
  );
};
