import React, { useEffect, useState, createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme, ThemeProps } from '../theme';

export const DarkModeContext = createContext(null);

const MyApp = ({ Component, pageProps }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!isDarkMode);
  const theme: ThemeProps = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/sw.js');
    // }
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default MyApp;
