import React from 'react';
import classNames from 'classnames';
import styles from './legend.module.css';

interface Props {
  extraClass?: string,
}

export const Legend = ({ extraClass }: Props) => {
  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass}>
      <h2 className={styles.title}>Ура! Теперь можно начать работать:</h2>
      <ul className={styles.list} title="инструкция по использованию">
        <li>Напишите название текущей задачи и добавьте её</li>
        <li>Запустите таймер («помидор»)</li>
        <li>Работайте пока «помидор» не прозвонит</li>
        <li>Сделайте короткий перерыв (3-5 минут)</li>
        <li>Продолжайте работать «помидор» за «помидором», пока задача не будет выполнена</li>
        <li>Каждые 4 «помидора» делайте длинный перерыв (15-30 минут)</li>
      </ul>
    </section>
  );
};
