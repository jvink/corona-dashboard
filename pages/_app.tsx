import React, { useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme, ThemeProps } from '../theme';

const MyApp = ({ Component, pageProps }) => {
  const darkMode = useDarkMode(true);
  const theme: ThemeProps = darkMode.value ? darkTheme : lightTheme;

  useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/sw.js');
    // }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
