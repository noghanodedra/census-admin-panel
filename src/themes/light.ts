import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#679b9b',
      },
      secondary: {
        main: '#00a1ab',
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
            backgroundColor: '#00a1ab',
          },
        },
      },
      MuiIconButton: {
        root: {
          color: '#679b9b',
        },
      },
      MuiCircularProgress: {
        root: {
          left: '46%',
          position: 'absolute',
          top: '38vh',
        },
      },
    },
  }),
);
