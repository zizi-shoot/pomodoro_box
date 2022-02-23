import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/fonts.css';
import '../styles/global.css';
import '../models/init';
import { fork, Scope, serialize } from 'effector';
import { Provider } from 'effector-react/scope';
import { useHotkeys } from 'react-hotkeys-hook';
import { generateData } from '../models/dataGenerator';

let clientScope: Scope;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const scope = fork({
    values: {
      ...(clientScope && serialize(clientScope)),
      ...pageProps.initialState,
    },
  });
  if (typeof window !== 'undefined') clientScope = scope;

  useHotkeys('alt+g', (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Сгенерировать рандомные значения?')) generateData();
  });

  return (
    <Provider value={scope}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
