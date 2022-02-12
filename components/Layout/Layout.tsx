import React from 'react';
import Head from 'next/head';
import Header from '../Header';

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
    {children}
  </>
);
