import * as React from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { ApiProvider } from '@/providers/ApiProvider';

export interface MyAppProps extends AppProps {}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ApiProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ApiProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
