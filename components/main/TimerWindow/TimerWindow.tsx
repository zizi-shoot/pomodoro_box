import React, { useState } from 'react';
import classNames from 'classnames';
import { useEvent, useStore } from 'effector-react';
import dayjs from 'dayjs';
import styles from './timer-window.module.css';
import {
  $workTimePassed,
  $breakLimit,
  $breakTimePassed,
  $timerState,
  $workLimit,
  changeTimerState,
  resetWorkingTimer,
  $finishedTodayTimersCounter,
} from '../../../models/timers';
import { $notCompletedTodayTasks, completeTask, increaseTimers } from '../../../models/tasks';
import {
  $primaryBtn,
  $secondaryBtn,
  $timerType,
  changeTimerType,
} from '../../../models/timerWindow';
import { TaskDone } from '../modals';
import { colors } from '../../Layout';

interface Props {
  extraClass?: string,
}

export const TimerWindow = ({ extraClass }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const workLimit = useStore($workLimit);
  const breakLimit = useStore($breakLimit);
  const timerType = useStore($timerType);
  const timerState = useStore($timerState);
  const workingTimeCounter = useStore($workTimePassed);
  const breakingTimeCounter = useStore($breakTimePassed);
  const finishedTimersCounter = useStore($finishedTodayTimersCounter)[0];
  const primaryBtn = useStore($primaryBtn);
  const secondaryBtn = useStore($secondaryBtn);
  const notCompletedTasks = useStore($notCompletedTodayTasks);

  const primaryEventFn = useEvent<void>(primaryBtn.event);
  const secondaryEventFn = useEvent<void>(secondaryBtn.event);
  const changeTimerStateFn = useEvent(changeTimerState);
  const changeTimerTypeFn = useEvent(changeTimerType);
  const increaseTimersFn = useEvent(increaseTimers);
  const completeTaskFn = useEvent(completeTask);
  const resetWorkingTimerFn = useEvent(resetWorkingTimer);

  const currentTask = notCompletedTasks ? notCompletedTasks[0] : null;
  const workingTimeFormatted = dayjs.unix(workLimit - workingTimeCounter).format('mm:ss');
  const breakingTimeFormatted = dayjs.unix(breakLimit - breakingTimeCounter).format('mm:ss');
  const primaryBtnClass = classNames(styles.btn, styles.primaryBtn);
  const secondaryBtnClass = classNames(styles.btn, styles.secondaryBtn);

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
    secondaryEventFn();

    if (timerType === 'pause') {
      toggleModalContainer();
      setIsModalOpened(!isModalOpened);
      if (currentTask) completeTaskFn(currentTask.id);

      return;
    }

    changeTimerTypeFn(secondaryBtn.type);
    changeTimerStateFn(secondaryBtn.state);
  };

  const timerName = (): string | null => {
    if (timerType === 'break') return `Перерыв ${finishedTimersCounter.counter % 4 || 4}`;
    if (currentTask) return `Помидор ${finishedTimersCounter.counter + 1}`;

    return null;
  };

  const headerColor = (): string => {
    if (!currentTask) return colors.inactive;

    switch (timerType) {
      case 'work':
        return timerState === 'new' ? colors.positive : colors.negative;
      case 'break':
        return colors.neutral;
      default:
        return colors.positive;
    }
  };

  const handleTaskDoneSubmit = () => {
    toggleModalContainer();
    setIsModalOpened(!isModalOpened);
    changeTimerTypeFn(secondaryBtn.type);
    changeTimerStateFn(secondaryBtn.state);

    if (!notCompletedTasks.length) {
      resetWorkingTimerFn();
      changeTimerStateFn('new');
    }

    primaryEventFn();
  };

  return (
    <>
      <section className={extraClass}>
        <header className={styles.header} style={{ backgroundColor: headerColor() }}>
          <h2 title={currentTask?.name || 'Нет задач'} className={styles.headerTitle}>{currentTask?.name || 'Нет задач'}</h2>
          <span className={styles.pomodoroNum}>{timerName()}</span>
        </header>
        {
          currentTask
            ? (
              <main className={styles.container}>
                <span
                  className={styles.timer}
                  style={{ color: timerType === 'work' && timerState === 'started' ? colors.negative : colors.fontPrimary }}
                >
                  {timerType !== 'break' ? workingTimeFormatted : breakingTimeFormatted}
                </span>
                <button
                  type="button"
                  className={primaryBtnClass}
                  onClick={handlePrimaryClick}
                  disabled={timerType === 'break' && timerState === 'started'}
                >
                  {primaryBtn.name}
                </button>
                <button
                  type="button"
                  className={secondaryBtnClass}
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
                      className={styles.addBtn}
                      onClick={() => increaseTimersFn(currentTask?.id)}
                    >
                      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="25" />
                        <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
                      </svg>
                    </button>
                  )
                }
              </main>
            )
            : (
              <div className={styles.emptyTimer}>
                <p>👀</p>
              </div>
            )
        }
      </section>
      {isModalOpened && <TaskDone onClick={handleTaskDoneSubmit} />}
    </>
  );
};
