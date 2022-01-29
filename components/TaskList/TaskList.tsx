import React from 'react';
import { useStore } from 'effector-react';
import { $tasksWithTimersCount } from '../../models/tasks';
import { Task } from './Task';

export const TaskList = () => {
  const tasks = useStore($tasksWithTimersCount);

  return (
    <ul>
      {
        tasks.map(({ id, name, timersCount }) => (
          <Task
            key={id}
            id={id}
            name={name}
            timersCount={timersCount}
          />
        ))
      }
    </ul>
  );
};
