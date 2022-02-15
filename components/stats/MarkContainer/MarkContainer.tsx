import React from 'react';
import classNames from 'classnames';
import { useStore } from 'effector-react';
import dayjs from 'dayjs';
import styles from './mark-container.module.css';
import { Mark } from '../Mark';
import { $selectedDay } from '../../../models/stats';
import { $stopsCounters, $totalPauseTime, $totalWorkTime } from '../../../models/timers';

interface Props {
  extraClass?: string,
}

export const MarkContainer = ({ extraClass }: Props) => {
  const selectedDay = useStore($selectedDay);
  const totalWorkTime = useStore($totalWorkTime);
  const totalPauseTime = useStore($totalPauseTime);
  const stopsCounters = useStore($stopsCounters);

  const targetWorkTime = totalWorkTime.find((time) => time.date === selectedDay);
  const targetPauseTime = totalPauseTime.find((time) => time.date === selectedDay);
  const targetStopCounter = stopsCounters.find((counter) => counter.date === selectedDay);

  let durationPauseTime = dayjs.duration(0);

  if (targetPauseTime) durationPauseTime = dayjs.duration(targetPauseTime.counter, 's');

  const pauseTimeString = `${durationPauseTime.hours() ? `${durationPauseTime.hours()}ч` : ''} ${durationPauseTime.minutes()}м`;

  let focusPercentage = 0;

  if (targetWorkTime && targetPauseTime) {
    focusPercentage = Math.round((targetWorkTime.counter / (targetWorkTime.counter + targetPauseTime.counter)) * 100);
  }

  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass} title="карточки с показателями">
      <Mark
        title="Фокус"
        value={targetWorkTime && targetPauseTime ? `${focusPercentage}%` : 'Н/Д'}
        backgroundColor="var(--green-light)"
        backgroundImage="/img/focus.svg"
      />
      <Mark
        title="Время на паузе"
        value={targetPauseTime?.counter ? pauseTimeString : 'Н/Д'}
        backgroundColor="var(--orange-light)"
        backgroundImage="/img/pause.svg"
      />
      <Mark
        title="Остановки"
        value={targetStopCounter ? `${targetStopCounter?.counter}` : 'Н/Д'}
        backgroundColor="var(--red-light)"
        backgroundImage="/img/stop.svg"
      />
    </section>
  );
};
