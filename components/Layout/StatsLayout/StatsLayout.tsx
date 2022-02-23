import React from 'react';
import Head from 'next/head';
import styles from './stats-layout.module.css';

interface Props {
  children?: React.ReactNode;
}

export const StatsLayout = ({ children }: Props) => (
  <>
    <Head>
      <title>Pomodoro Box | Статистика</title>
    </Head>
    <main className={styles.main}>
      <h1 className="visuallyHidden">Менеджер задач по методу помидора</h1>
      <div className={styles.container}>{children}</div>
    </main>
  </>
);
