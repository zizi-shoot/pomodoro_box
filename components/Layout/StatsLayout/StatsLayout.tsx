import React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import styles from './stats-layout.module.css';
import commonStyles from '../layout.module.css';

interface Props {
  children?: React.ReactNode;
}

export const StatsLayout = ({ children }: Props) => {
  const containerClass = classNames(commonStyles.container, styles.container);
  return (
    <>
      <Head>
        <title>Pomodoro Box | Статистика</title>
      </Head>
      <main className={commonStyles.main}>
        <h1 className="visuallyHidden">Менеджер задач по методу помидора</h1>
        <div className={containerClass}>{children}</div>
      </main>
    </>
  );
};
