import React, { useEffect } from 'react';
// import Amplify from 'aws-amplify';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../src/theme';
import WithAuth from '../components/Auth/WithAuth';
import { EmiterProvider } from '../components/Emiter/EmiterContext';
import { Provider } from "mobx-react";
import mainStore from "../src/store";
// import awsConfig from '../src/aws-exports'


// Amplify.configure(awsConfig)

export default function MyApp(props) {

  const { Component, pageProps } = props;
  const stores = {
    mainStore,
    ...mainStore,
  }

  useEffect(async () => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider  {...stores}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <EmiterProvider >
          <CssBaseline />
          <WithAuth>
            <Component {...pageProps} />
          </WithAuth>
        </EmiterProvider>
      </ThemeProvider>
    </Provider>
  );
}
