import React from 'react';
import styles from './chart.module.css';

interface Props {
  extraClass?: string,
}

export const Chart = ({ extraClass }: Props) => (
  <section className={extraClass}>
    График
  </section>
);
