import React from 'react';
import classNames from 'classnames';
import styles from './pomodoro-counter.module.css';

interface Props {
  extraClass?: string,
}

export const PomodoroCounter = ({ extraClass }: Props) => {
  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass} title="количество помидоров">
      <p className={styles.value}>2</p>
      <h3 className={styles.title}>помидора</h3>
    </section>
  );
};
