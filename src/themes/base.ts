import { Theme } from '@material-ui/core';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export const themeCreator = (theme: string): Theme => themeMap[theme];

const themeMap: { [key: string]: Theme } = {
  lightTheme,
  darkTheme,
};
