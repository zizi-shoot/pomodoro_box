import React from 'react';
import styles from './activity.module.css';

interface Props {
  extraClass?: string,
}

export const Activity = ({ extraClass }: Props) => (
  <section className={extraClass} title="Время активности">
    <h3>Суббота</h3>
    <p>Вы работали над задачами в течение 51 минуты</p>
  </section>
);
