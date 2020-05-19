import { createMuiTheme } from '@material-ui/core';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#bc658d',
    },
    secondary: {
      main: '#8566aa',
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        color: '#bc658d',
        '&$selected': {
          // backgroundColor: '#e3f6f5',
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: '#bc658d',
      },
    },
    MuiMenuItem: {
      root: {
        '&$selected': {
          backgroundColor: '#8566aa',
        },
      },
    },
    MuiIconButton: {
      root: {
        color: '#bc658d',
      },
    },
    MuiTablePagination: {
      root: {
        backgroundColor: '#8566aa',
      },
    },
  },
});
