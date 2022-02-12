import React from 'react';
import classNames from 'classnames';
import styles from './activity.module.css';

interface Props {
  extraClass?: string,
}

export const Activity = ({ extraClass }: Props) => {
  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass} title="Время активности">
      <h3 className={styles.title}>Суббота</h3>
      <p className={styles.value}>Вы работали над задачами в&nbsp;течение&nbsp;<span>51&nbsp;минуты</span></p>
    </section>
  );
};
