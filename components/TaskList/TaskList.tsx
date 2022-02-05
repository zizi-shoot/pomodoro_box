import React from 'react';
import { useStore } from 'effector-react';
import { $tasks } from '../../models/tasks';
import { Task } from './Task';
import { $workLimit } from '../../models/timers';

export const TaskList = () => {
  const tasks = useStore($tasks);
  const workTime = useStore($workLimit);
  const totalTimersCounter = tasks.reduce((acc, task) => acc + task.timersCount, 0);
  const estimatedTime = new Date(totalTimersCounter * workTime * 1000);

  return (
    <>
      <ul>{tasks.map((task) => <Task key={task.id} task={task} />)}</ul>
      {tasks.length > 0 && <p>{estimatedTime.getUTCHours()} ч {estimatedTime.getMinutes()} мин</p>}
    </>
  );
};
