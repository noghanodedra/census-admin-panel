import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { themeCreator } from 'themes/base';

export const ThemeContext = React.createContext((themeName: string): void => {});

const LIGHT_THEME = 'lightTheme';
const DARK_THEME = 'darkTheme';

const ThemeProvider: React.FC = (props) => {
  // Read current theme from localStorage or maybe from an api
  const curThemeName = localStorage.getItem('appTheme') || LIGHT_THEME;

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(curThemeName);

  // Get the theme object by theme name
  const theme = themeCreator(themeName);

  const setThemeName = (thName: string): void => {
    localStorage.setItem('appTheme', thName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, LIGHT_THEME, DARK_THEME };
