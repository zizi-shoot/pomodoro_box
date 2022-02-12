import React from 'react';
import styles from './pomodoro-counter.module.css';

interface Props {
  extraClass?: string,
}

export const PomodoroCounter = ({ extraClass }: Props) => (
  <section className={extraClass} title="количество помидоров">
    <p>2</p>
    <h3>помидора</h3>
  </section>
);
