import React from 'react';
import Head from 'next/head';
import Header from '../Header';
import styles from './layout.module.css';

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Pomodoro box. Приложение для повышения продуктивности по методике Pomodoro"
      />
      <link href="/fonts/Montserrat-Thin.woff2" crossOrigin="anonymous" type="font/woff2" />
      <link href="/fonts/Montserrat-Light.woff2" crossOrigin="anonymous" type="font/woff2" rel="preload" as="font" />
      <link href="/fonts/Montserrat-Regular.woff2" crossOrigin="anonymous" type="font/woff2" rel="preload" as="font" />
      <link href="/fonts/Montserrat-Medium.woff2" crossOrigin="anonymous" type="font/woff2" />
      <link href="/fonts/Montserrat-Bold.woff2" crossOrigin="anonymous" type="font/woff2" />
      <title>Pomodoro Box</title>
    </Head>
    <Header />
    <main className={styles.main}>
      <h1 className="visually-hidden">Менеджер задач по методу помидора</h1>
      <div className={styles.container}>{children}</div>
    </main>
    <div id="task-done" className="modal hidden" />
    <div id="remove-confirm" className="modal hidden" />
    <div id="edit-dialog" />
    <div id="menu" />
  </>
);
