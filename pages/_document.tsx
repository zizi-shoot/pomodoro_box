import React from 'react';
import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

const Document = () => (
  <Html lang="ru" className="themeDefault">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Pomodoro box. Приложение для повышения продуктивности по методике Pomodoro"
      />
      <link href="/fonts/AzeretMono-Thin.woff2" crossOrigin="anonymous" type="font/woff2" />
      <link href="/fonts/Montserrat-Light.woff2" crossOrigin="anonymous" type="font/woff2" rel="preload" as="font" />
      <link href="/fonts/Montserrat-Regular.woff2" crossOrigin="anonymous" type="font/woff2" rel="preload" as="font" />
      <link href="/fonts/Montserrat-Medium.woff2" crossOrigin="anonymous" type="font/woff2" />
      <link href="/fonts/Montserrat-Bold.woff2" crossOrigin="anonymous" type="font/woff2" />
    </Head>
    <Main />
    <NextScript />
  </Html>
);

export default Document;
