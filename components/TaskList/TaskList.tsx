import React from 'react';
import { useStore } from 'effector-react';
import { $tasks } from '../../models/tasks';
import { Task } from './Task';

export const TaskList = () => {
  const tasks = useStore($tasks);

  return (
    <ul>{tasks.map((task) => <Task key={task.id} task={task} />)}</ul>
  );
};
