import React from 'react';
import classNames from 'classnames';
import styles from './topbar.module.css';

interface Props {
  extraClass?: string,
}

export const TopBar = ({ extraClass }: Props) => {
  const containerClass = classNames(extraClass, styles.container);
  return (
    <section className={containerClass}>
      <h2 className={styles.title}>Ваша активность</h2>
      <select title="выбор периода">
        <option value="">Эта неделя</option>
        <option value="">Прошедшая неделя</option>
        <option value="">2 недели назад</option>
      </select>
    </section>
  );
};
