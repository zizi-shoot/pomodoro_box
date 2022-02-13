import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { useEvent, useStore } from 'effector-react';
import styles from './topbar.module.css';
import { useIsMounted } from '../../../hooks';
import { $selectedPeriod, setSelectedPeriod } from '../../../models/stats';
import { SelectedPeriod } from '../../../typings';

interface Props {
  extraClass?: string,
}

const options: SelectedPeriod[] = [
  { value: 'current', label: 'Эта неделя' },
  { value: 'last', label: 'Прошедшая неделя' },
  { value: 'before-last', label: '2 недели назад' },
];

const customStyles = {
  indicatorSeparator: (provided: {}) => ({
    ...provided,
    display: 'none',
  }),
  container: (provided: {}) => ({
    ...provided,
    width: 300,
  }),
};

export const TopBar = ({ extraClass }: Props) => {
  const isMounted = useIsMounted();
  const selectedPeriod = useStore($selectedPeriod);
  const setSelectedPeriodFn = useEvent(setSelectedPeriod);

  if (!isMounted) return null;

  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass}>
      <h2 className={styles.title}>Ваша активность</h2>
      <Select
        defaultValue={selectedPeriod}
        styles={customStyles}
        options={options}
        onChange={(event) => setSelectedPeriodFn(event as SelectedPeriod)}
      />
    </section>
  );
};
