import React, { MouseEventHandler, useRef } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { useEvent, useStore } from 'effector-react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

import classNames from 'classnames';
import { $allWorkingTimers } from '../../../models/timers';
import { $selectedPeriod, setSelectedDay } from '../../../models/stats';
import { SelectedValues, StatsCounter } from '../../../types';
import styles from './chart.module.css';
import { $appTheme } from '../../../models/app';

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

const backgroundColor = new Map([
  ['themeLight', '#bbe1cc'],
  ['themeDark', '#2e734c'],
]);

const hoverBackgroundColor = new Map([
  ['themeLight', '#35b36e'],
  ['themeDark', '#6fc797'],
]);

interface Props {
  extraClass?: string,
}

export const Chart = ({ extraClass }: Props) => {
  const html = typeof window !== 'undefined' && document.querySelector('html');
  const appTheme = useStore($appTheme);
  // eslint-disable-next-line no-nested-ternary
  const currentTheme = appTheme !== 'themeSystem'
    ? appTheme
    : (html && html.classList.contains('themeDark'))
    || (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'themeDark' : 'themeLight';
  const ref = useRef(null);
  const workTimeData = useStore($allWorkingTimers);
  const selectedPeriod = useStore($selectedPeriod);
  const setSelectedDayFn = useEvent(setSelectedDay);
  const containerClass = classNames(extraClass, styles.container);
  const subtractValue = periodMap.get(selectedPeriod.value) || 0;
  const startDayOfPeriod = dayjs()
    .startOf('isoWeek')
    .subtract(subtractValue, 'week');
  const emptyChartData: StatsCounter[] = [];

  for (let i = 0; i < 7; i++) {
    emptyChartData.push({
      counter: 0,
      date: startDayOfPeriod.add(i, 'd').format('DD-MM-YY'),
    });
  }

  const chartData: StatsCounter[] = emptyChartData.map((item) => {
    const targetCounter = workTimeData.find((el) => el.date === item.date);

    if (!targetCounter) return item;

    return {
      ...item,
      counter: targetCounter.counter,
    };
  });

  const data = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        data: chartData.map((item) => item.counter),
        backgroundColor: Array(7).fill(backgroundColor.get(currentTheme)),
        hoverBackgroundColor: Array(7).fill(hoverBackgroundColor.get(currentTheme)),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1500,
          callback: (value: number) => dayjs.duration(value, 's').format('H:mm'),
          color: '#455875',
        },
      },
      x: {
        ticks: {
          color: '#455875',
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
          title: (value: any) => dayjs(chartData[value[0].dataIndex].date, 'DD-MM-YY').format('DD.MM'),
        },
      },
    },
  };

  const onClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!ref.current) return;

    const chart: ChartJS = ref.current;
    const [element] = getElementAtEvent(ref.current, event);

    if (!element) return;

    const chartCurrentValue = data.datasets[0].data[element.index];
    const selectedDayValue = workTimeData
      .find((timeData) => timeData.counter === chartCurrentValue)
      ?.date;

    if (selectedDayValue) setSelectedDayFn(selectedDayValue);

    const [dataset] = chart.data.datasets;

    if (dataset) {
      for (let i = 0; i < 7; i++) {
        // @ts-ignore
        dataset.backgroundColor[i] = backgroundColor.get(currentTheme);
        // @ts-ignore
        dataset.hoverBackgroundColor[i] = hoverBackgroundColor.get(currentTheme);
      }

      // @ts-ignore
      dataset.backgroundColor[element.index] = hoverBackgroundColor.get(currentTheme);
      // @ts-ignore
      dataset.hoverBackgroundColor[element.index] = hoverBackgroundColor.get(currentTheme);
    }

    chart.update();
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
