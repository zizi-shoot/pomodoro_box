import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

interface Props {
  onClick: () => void,
}

export const TaskDone = ({ onClick }: Props) => {
  const modal = document.getElementById('task-done');

  if (!modal) return null;

  return createPortal(
    (
      <div className={styles.container}>
        <p className={styles.descr}>Отлично! Задача выполнена ✅</p>
        <p className={styles.descr}>Можете приступить к следующей задаче или сделать что-нибудь полезное не из списка.</p>
        <button className={styles.submitBtn} type="button" onClick={onClick}>OK</button>
      </div>
    ), modal,
  );
};
