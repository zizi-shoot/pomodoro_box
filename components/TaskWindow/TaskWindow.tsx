import React from 'react';
import classNames from 'classnames';
import styles from './task-window.module.css';

interface ITask {
  name: string,
  index: number,
  pomodoroAmount: number,
}

interface IProps {
  task: ITask,
  extraClass?: string,
}

export const TaskWindow = ({ task, extraClass }: IProps) => {
  const { name, index, pomodoroAmount } = task;
  const primaryBtnClasses = classNames(styles.btn, styles.primaryBtn);
  const secondaryBtnClasses = classNames(styles.btn, styles.secondaryBtn);

  return (
    <section className={extraClass}>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>{name}</h2>
        <span className={styles.pomodoroNum}>
          Помидор
          {pomodoroAmount}
        </span>
      </header>
      <main className={styles.container}>
        <span className={styles.timer}>25:00</span>
        <p className={styles.descr}><span>Задача {index}</span> - {name}</p>
        <button type="button" className={primaryBtnClasses}>Старт</button>
        <button type="button" className={secondaryBtnClasses}>Стоп</button>
        <button type="button" className={styles.addBtn}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
            <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
          </svg>
        </button>
      </main>
    </section>
  );
};
