import React from 'react';
import { createPortal } from 'react-dom';
import { useStore } from 'effector-react';
import styles from './modal.module.css';
import { $notCompletedTasks } from '../../../models/tasks';

interface Props {
  onClick: () => void,
}

const emptyTaskListText = 'Поздравляю! Вы справились со всеми задачами, так держать 🤘';
const notEmptyTaskListText = 'Можете приступить к следующей задаче или сделать что-нибудь полезное не из списка.';

export const TaskDone = ({ onClick }: Props) => {
  const notCompletedTasks = useStore($notCompletedTasks);
  const modal = document.getElementById('task-done');

  if (!modal) return null;

  return createPortal(
    (
      <div className={styles.container}>
        <p className={styles.descr}>Отлично! Задача выполнена ✅</p>
        <p className={styles.descr}>{notCompletedTasks.length ? notEmptyTaskListText : emptyTaskListText}</p>
        <button className={styles.submitBtn} type="button" onClick={onClick}>OK</button>
      </div>
    ), modal,
  );
};
