import React from 'react';
import classNames from 'classnames';
import { useStore } from 'effector-react';
import styles from './pomodoro-counter.module.css';
import { $selectedDay } from '../../../models/stats';
import { $finishedTimersCounters } from '../../../models/timers';

interface Props {
  extraClass?: string,
}

const calcDeclination = (amount: number, words: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];

  return words[(amount % 100 > 4 && amount % 100 < 20) ? 2 : cases[(amount % 10 < 5) ? amount % 10 : 5]];
};

export const PomodoroCounter = ({ extraClass }: Props) => {
  const selectedDay = useStore($selectedDay);
  const finishedTimersCounters = useStore($finishedTimersCounters);
  const targetCounter = finishedTimersCounters.find((counter) => counter.date === selectedDay);

  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass} title="количество помидоров">
      {
        selectedDay && targetCounter
          ? (
            <>
              <p className={styles.value}>{targetCounter.counter}</p>
              <h3 className={styles.title}>
                {calcDeclination(targetCounter.counter, ['помидор', 'помидора', 'помидоров'])}
              </h3>
            </>
          )
          : <p style={{ fontSize: 56, margin: 0 }}>Н/Д</p>

      }
    </section>
  );
};
