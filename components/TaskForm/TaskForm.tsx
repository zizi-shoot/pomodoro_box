import React from 'react';
import styles from './task-form.module.css';

export const TaskForm = () => (
  <form className={styles.container} action="/" method="post">
    <input className={styles.input} type="text" name="task" id="taskInput" placeholder="Название задачи" />
    <button className={styles.submitBtn} type="submit">Добавить</button>
  </form>
);
