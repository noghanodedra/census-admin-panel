import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#679b9b',
      },
      secondary: {
        main: '#def4f0',
      },
    },
    overrides: {
      MuiListItem: {
        root: {
          color: '#679b9b',
          '&$selected': {
            // backgroundColor: '#e3f6f5',
          },
        },
      },
      MuiListItemIcon: {
        root: {
          color: '#679b9b',
        },
      },
      MuiMenuItem: {
        root: {
          '&$selected': {
            backgroundColor: '#def4f0',
          },
        },
      },
      MuiIconButton: {
        root: {
          color: '#679b9b',
        },
      },
    },
  }),
);
