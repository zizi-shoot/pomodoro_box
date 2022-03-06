import React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import styles from './index-layout.module.css';
import commonStyles from '../layout.module.css';

interface Props {
  children?: React.ReactNode;
}

export const IndexLayout = ({ children }: Props) => {
  const containerClass = classNames(commonStyles.container, styles.container);

  return (
    <>
      <Head>
        <title>Pomodoro Box</title>
      </Head>
      <main className={commonStyles.main}>
        <h1 className="visuallyHidden">Менеджер задач по методу помидора</h1>
        <div className={containerClass}>{children}</div>
      </main>
      <div id="edit-dialog" />
      <div id="context-menu" />
    </>
  );
};
