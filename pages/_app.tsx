import React, { useState, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme, ThemeProps } from '../theme';

const MyApp = ({ Component, pageProps }) => {
  const [isMounted, setIsMounted] = useState(false);
  const darkMode = useDarkMode(true);
  const theme: ThemeProps = darkMode.value ? darkTheme : lightTheme;

  useEffect(() => {
    setIsMounted(true);

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/service-worker.js');
    // }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isMounted && <Component {...pageProps} />}
    </ThemeProvider>
  );
};

export default MyApp;
