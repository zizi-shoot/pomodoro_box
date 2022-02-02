import React from 'react';
import classNames from 'classnames';
import { useEvent, useStore } from 'effector-react';
import dayjs from 'dayjs';
import styles from './task-window.module.css';
import { $activeTimePassed, $completedTimersCounter, $pomodoroTime } from '../../models/timers';
import { $notCompletedTasks } from '../../models/tasks';
import {
  $primaryBtnText,
  $secondaryBtnText,
  $windowState,
  changeWindowState,
} from '../../models/timerWindow';

interface Props {
  extraClass?: string,
}

export const TaskWindow = ({ extraClass }: Props) => {
  const pomodoroTime = useStore($pomodoroTime);
  const timeCounter = useStore($activeTimePassed);
  const completedTimersCounter = useStore($completedTimersCounter);
  const primaryBtnText = useStore($primaryBtnText);
  const secondaryBtnText = useStore($secondaryBtnText);
  const windowState = useStore($windowState);
  const notCompletedTasks = useStore($notCompletedTasks);
  const changeWindowStateFn = useEvent(changeWindowState);

  const currentTask = notCompletedTasks ? notCompletedTasks[0] : null;
  const timeFormatted = dayjs.unix(pomodoroTime - timeCounter).format('mm:ss');
  const primaryBtnClasses = classNames(styles.btn, styles.primaryBtn);
  const secondaryBtnClasses = classNames(styles.btn, styles.secondaryBtn);
  const addBtnClasses = classNames(styles.btn, styles.addBtn);

  const handlePrimaryClick = () => {
    changeWindowStateFn('primaryBtn');
  };

  const handleSecondaryClick = () => {
    changeWindowStateFn('secondaryBtn');
  };

  return (
    <section className={extraClass} data-blocked={windowState === 'empty'}>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>{currentTask?.name || 'Нет задач'}</h2>
        <span className={styles.pomodoroNum}>
          {currentTask?.timersCount ? `Помидор ${completedTimersCounter + 1}` : null}
        </span>
      </header>
      <main className={styles.container}>
        <span className={styles.timer}>{timeFormatted}</span>
        <p className={styles.descr}><span>Задача - </span>{currentTask?.name || ''}</p>
        <button
          type="button"
          className={primaryBtnClasses}
          onClick={handlePrimaryClick}
          disabled={windowState === 'startedBreak'}
        >
          {primaryBtnText}
        </button>
        <button
          type="button"
          className={secondaryBtnClasses}
          onClick={handleSecondaryClick}
          disabled={windowState === 'new'}
        >
          {secondaryBtnText}
        </button>
        <button
          type="button"
          className={addBtnClasses}
        >
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
            <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
          </svg>
        </button>
      </main>
    </section>
  );
};
