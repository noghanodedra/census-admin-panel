import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#679b9b',
      },
      secondary: {
        main: '#6983aa',
      },
    },
    overrides: {
      MuiListItem: {
        root: {
          // color: '#679b9b',
          '&$selected': {
            backgroundColor: '#679b9b',
          },
        },
      },
      MuiMenuItem: {
        root: {
          '&$selected': {
            backgroundColor: '#6983aa',
          },
        },
      },
    },
  }),
);
