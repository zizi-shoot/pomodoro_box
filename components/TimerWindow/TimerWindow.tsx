import React, { useState } from 'react';
import classNames from 'classnames';
import { useEvent, useStore } from 'effector-react';
import dayjs from 'dayjs';
import styles from './timer-window.module.css';
import {
  $activeTimePassed,
  $breakLimit,
  $breakTimePassed,
  $completedTimersCounter,
  $timerState,
  $workLimit,
  changeTimerState,
} from '../../models/timers';
import { $notCompletedTasks, increaseTimers } from '../../models/tasks';
import {
  $primaryBtn,
  $secondaryBtn,
  $timerType,
  changeTimerType,
} from '../../models/timerWindow';
import { TaskDone } from '../modals';

interface Props {
  extraClass?: string,
}

export const TimerWindow = ({ extraClass }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const workLimit = useStore($workLimit);
  const breakLimit = useStore($breakLimit);
  const timerType = useStore($timerType);
  const timerState = useStore($timerState);
  const workingTimeCounter = useStore($activeTimePassed);
  const breakingTimeCounter = useStore($breakTimePassed);
  const completedTimersCounter = useStore($completedTimersCounter);
  const primaryBtn = useStore($primaryBtn);
  const secondaryBtn = useStore($secondaryBtn);
  const notCompletedTasks = useStore($notCompletedTasks);

  const primaryEventFn = useEvent<void>(primaryBtn.event);
  const secondaryEventFn = useEvent<void>(secondaryBtn.event);
  const changeTimerStateFn = useEvent(changeTimerState);
  const changeTimerTypeFn = useEvent(changeTimerType);
  const increaseTimersFn = useEvent(increaseTimers);
  const currentTask = notCompletedTasks ? notCompletedTasks[0] : null;
  const workingTimeFormatted = dayjs.unix(workLimit - workingTimeCounter).format('mm:ss');
  const breakingTimeFormatted = dayjs.unix(breakLimit - breakingTimeCounter).format('mm:ss');
  const primaryBtnClasses = classNames(styles.btn, styles.primaryBtn);
  const secondaryBtnClasses = classNames(styles.btn, styles.secondaryBtn);
  const addBtnClasses = classNames(styles.btn, styles.addBtn);

  const toggleModalContainer = () => {
    const modal = document.getElementById('task-done');

    if (!modal) return;

    modal.classList.toggle('hidden');
    setIsModalOpened(!isModalOpened);
  };

  const handlePrimaryClick = (): void => {
    primaryEventFn();
    changeTimerTypeFn(primaryBtn.type);
    changeTimerStateFn(primaryBtn.state);
  };

  const handleSecondaryClick = (): void => {
    if (timerType === 'pause') {
      toggleModalContainer();
      setIsModalOpened(!isModalOpened);
      return;
    }

    changeTimerTypeFn(secondaryBtn.type);
    changeTimerStateFn(secondaryBtn.state);
    secondaryEventFn();
  };

  const timerName = (): string | null => {
    if (timerType === 'break') return `Перерыв ${completedTimersCounter % 4}`;
    if (currentTask) return `Помидор ${completedTimersCounter + 1}`;

    return null;
  };

  const headerColor = (): string => {
    if (!currentTask) return 'var(--greyC4)';

    switch (timerType) {
      case 'work':
        return timerState === 'new' ? 'var(--green)' : 'var(--red)';
      case 'break':
        return 'var(--orange)';
      default:
        return 'var(--green)';
    }
  };

  const handleTaskDoneSubmit = () => {
    toggleModalContainer();
    setIsModalOpened(!isModalOpened);
    changeTimerTypeFn(secondaryBtn.type);
    changeTimerStateFn(secondaryBtn.state);
    primaryEventFn();
  };

  return (
    <>
      <section className={extraClass}>
        <header className={styles.header} style={{ backgroundColor: headerColor() }}>
          <h2 className={styles.headerTitle}>{currentTask?.name || 'Нет задач'}</h2>
          <span className={styles.pomodoroNum}>{timerName()}</span>
        </header>
        {
          currentTask
            ? (
              <main className={styles.container}>
                <span className={styles.timer}>{timerType !== 'break' ? workingTimeFormatted : breakingTimeFormatted}</span>
                <p className={styles.descr}><span>Задача - </span>{currentTask?.name || ''}</p>
                <button
                  type="button"
                  className={primaryBtnClasses}
                  onClick={handlePrimaryClick}
                >
                  {primaryBtn.name}
                </button>
                <button
                  type="button"
                  className={secondaryBtnClasses}
                  onClick={handleSecondaryClick}
                  disabled={timerType === 'work' && timerState === 'new'}
                >
                  {secondaryBtn.name}
                </button>
                {
                  currentTask
                  && (
                    <button
                      type="button"
                      className={addBtnClasses}
                      onClick={() => increaseTimersFn(currentTask?.id)}
                    >
                      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
                        <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
                      </svg>
                    </button>
                  )
                }
              </main>
            )
            : (
              <div className={styles.emptyTimer}>
                <p>Пустая помидорка 😞</p>
              </div>
            )
        }
      </section>
      {isModalOpened && <TaskDone onClick={handleTaskDoneSubmit} />}
    </>
  );
};
