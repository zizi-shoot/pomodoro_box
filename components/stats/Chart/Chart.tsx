import React, { MouseEventHandler, useRef } from 'react';
import {
  BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip,
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { useEvent, useStore } from 'effector-react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

import classNames from 'classnames';
import { $totalWorkTime } from '../../../models/timers';
import { $selectedPeriod, setSelectedDay } from '../../../models/stats';
import { SelectedValues } from '../../../typings';
import styles from './chart.module.css';

dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
);

const periodMap: Map<SelectedValues, number> = new Map([
  ['current', 0],
  ['last', 1],
  ['before-last', 2],
]);

interface Props {
  extraClass?: string,
}

export const Chart = ({ extraClass }: Props) => {
  const ref = useRef(null);
  const workTimeData = useStore($totalWorkTime);
  const selectedPeriod = useStore($selectedPeriod);
  const setSelectedDayFn = useEvent(setSelectedDay);
  const subtractValue = periodMap.get(selectedPeriod.value) || 0;
  const startDayOfPeriod = dayjs()
    .startOf('isoWeek')
    .subtract(subtractValue, 'week')
    .format('DD-MM-YY');
  const startDayIndex = workTimeData.findIndex((timeData) => timeData.date === startDayOfPeriod);
  const chartData = workTimeData.slice(startDayIndex !== -1 ? startDayIndex : 0);
  const containerClass = classNames(extraClass, styles.container);

  const data = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        data: chartData.map((item) => item.counter),
        backgroundColor: [
          '#bbe1cc',
        ],
        hoverBackgroundColor: '#6fc797',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1500,
          callback: (value: number) => dayjs.duration(value, 's').format('H:mm'),
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (value: any): string => {
            const durationTime = dayjs.duration(value.raw, 's');

            return `${durationTime.hours() ? `${durationTime.hours()}ч ` : ''}${durationTime.minutes()}мин`;
          },
        },
      },
    },
  };

  const onClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!ref.current) return;

    const [element] = getElementAtEvent(ref.current, event);

    if (!element) return;

    const chartCurrentValue = data.datasets[0].data[element.index];
    const selectedDayValue = workTimeData
      .find((timeData) => timeData.counter === chartCurrentValue)
      ?.date;

    if (selectedDayValue) setSelectedDayFn(selectedDayValue);
  };

  return (
    <section className={containerClass}>
      <Bar
        type="bar"
        ref={ref}
        data={data}
        onClick={onClick}
        // @ts-ignore
        options={options}
      />
    </section>
  );
};
