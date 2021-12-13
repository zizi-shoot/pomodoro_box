import React from 'react';
import Head from 'next/head';
import Header from '../Header';

interface IProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: IProps) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Pomodoro box. Приложение для повышения продуктивности по методике Pomodoro"
      />
      <link href="/public/fonts/Montserrat-Thin.woff2" crossOrigin="anonymous" type="font/woff2" />
      <link href="/public/fonts/Montserrat-Light.woff2" crossOrigin="anonymous" type="font/woff2" rel="preload" as="font" />
      <link href="/public/fonts/Montserrat-Regular.woff2" crossOrigin="anonymous" type="font/woff2" rel="preload" as="font" />
      <link href="/public/fonts/Montserrat-Medium.woff2" crossOrigin="anonymous" type="font/woff2" />
      <link href="/public/fonts/Montserrat-Bold.woff2" crossOrigin="anonymous" type="font/woff2" />
      <title>Pomodoro Box</title>
    </Head>
    <Header />
    <main>{children}</main>
  </>
);
