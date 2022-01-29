import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../models/init';
import { fork, Scope, serialize } from 'effector';
import { Provider } from 'effector-react/scope';

let clientScope: Scope;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const scope = fork({
    values: {
      ...(clientScope && serialize(clientScope)),
      ...pageProps.initialState,
    },
  });
  if (typeof window !== 'undefined') clientScope = scope;

  return (
    <Provider value={scope}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
