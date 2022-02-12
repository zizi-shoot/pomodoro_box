import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import styles from './topbar.module.css';

interface Props {
  extraClass?: string,
}

const options = [
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
  const containerClass = classNames(extraClass, styles.container);
  return (
    <section className={containerClass}>
      <h2 className={styles.title}>Ваша активность</h2>
      <Select
        defaultValue={options[0]}
        styles={customStyles}
        options={options}
      />
    </section>
  );
};
