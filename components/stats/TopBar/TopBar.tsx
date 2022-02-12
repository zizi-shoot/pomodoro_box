import React from 'react';
import styles from './topbar.module.css';

interface Props {
  extraClass?: string,
}

export const TopBar = ({ extraClass }: Props) => (
  <section className={extraClass}>
    <h2>Ваша активность</h2>
    <select title="выбор периода">
      <option value="">Эта неделя</option>
      <option value="">Прошедшая неделя</option>
      <option value="">2 недели назад</option>
    </select>
  </section>
);
