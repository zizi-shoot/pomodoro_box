import React from 'react';
import classNames from 'classnames';
import { useStore } from 'effector-react';
import dayjs from 'dayjs';
import { $selectedDay } from '../../../models/stats';
import styles from './activity.module.css';
import 'dayjs/locale/ru';
import { $totalWorkTime } from '../../../models/timers';

dayjs.locale('ru');

interface Props {
  extraClass?: string,
}

export const Activity = ({ extraClass }: Props) => {
  const selectedDay = useStore($selectedDay);
  const totalWorkTime = useStore($totalWorkTime);
  const targetWorkTime = totalWorkTime.find((time) => time.date === selectedDay);
  let durationTime = dayjs.duration(0);

  if (targetWorkTime) durationTime = dayjs.duration(targetWorkTime.counter, 's');

  const workTimeString = `${durationTime.hours() ? `${durationTime.hours()}\u00A0ч\u00A0` : '\u00A0'}${durationTime.minutes()}\u00A0мин`;

  const _weekDay = dayjs(selectedDay, 'DD-MM-YY').format('dddd');
  const weekDay = _weekDay[0].toUpperCase() + _weekDay.substring(1);

  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass} title="Время активности">
      {
        selectedDay
          ? (
            <>
              <h3 className={styles.title}>{weekDay}</h3>
              <p className={styles.value}>Вы работали над задачами в&nbsp;течение&nbsp;<span>{workTimeString}</span></p>
            </>
          )
          : <h3 className={styles.title}>Выберите день</h3>
      }
    </section>
  );
};
