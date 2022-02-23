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

// @ts-ignore
// @ts-ignore
const customStyles = {
  indicatorSeparator: (provided: {}) => ({
    ...provided,
    display: 'none',
  }),
  container: (provided: {}) => ({
    ...provided,
    width: 300,
  }),
  control: (provided: {}) => ({
    ...provided,
    backgroundColor: 'var(--tile-bg-color)',
    borderColor: 'var(--border-color)',
    transition: 'background-color 0.3s, border-color 0.3s',
  }),
  menu: (provided: {}) => ({
    ...provided,
    backgroundColor: 'var(--tile-bg-color)',
    borderColor: 'var(--border-color)',
  }),
  option: (provided: {}, { isFocused }: { isFocused: boolean}) => ({
    ...provided,
    // @ts-ignore
    backgroundColor: isFocused ? 'var(--menu-btn-hover-color)' : provided.backgroundColor,
    borderColor: 'var(--border-color)',
  }),
  singleValue: (provided: {}) => ({
    ...provided,
    color: 'var(--font-primary-color)',
    transition: 'color 0.3s',
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
