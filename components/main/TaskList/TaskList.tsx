import React from 'react';
import { useStore } from 'effector-react';
import { $todayTasks } from '../../../models/tasks';
import { Task } from './Task';
import { $workLimit } from '../../../models/timers';
import styles from './task-list.module.css';

export const TaskList = () => {
  const tasks = useStore($todayTasks);
  const workTime = useStore($workLimit);
  const totalTimersCounter = tasks.reduce((acc, task) => acc + task.timersCount, 0);
  const estimatedTime = new Date(totalTimersCounter * workTime * 1000);

  return (
    <>
      {
        tasks.length > 0
          ? (
            <ul className={styles.container}>
              {tasks.map((task) => <Task key={task.id} task={task} />)}
            </ul>
          )
          : <p className={styles.emptyWarning}>Список задач пуст</p>
      }
      {
        tasks.length > 0
        && (
          <p className={styles.estimatedTime}>
            {estimatedTime.getUTCHours()} ч {estimatedTime.getMinutes()} мин
          </p>
        )
      }
    </>
  );
};
