import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Divider,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  InfoRounded,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
} from '@material-ui/icons';

import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';

import { NameSpaces as NS } from 'constants/i18n';
import LocaleDropdown from 'components/LocaleDropdown';
import { useLoading } from 'providers/LoadingProvider';
import { LOGOUT_USER } from 'constants/graphql-queries-mutations';
import CommonConstants from 'constants/common';
import UserInfo from './UserInfo';

// https://codesandbox.io/s/deopk?file=/demo.js:0-6582
// https://stackblitz.com/edit/app-bar-and-drawer?file=index.js

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between', // 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listItem: {
    justifyContent: 'space-around',
  },
  iconButton: {
    position: 'absolute',
    top: 1,
    right: 0,
  },
}));

const ResponsiveDrawer = ({ ...props }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation([NS.COMMON]);
  const { showLoading, hideLoading } = useLoading();
  const [logout] = useMutation(LOGOUT_USER);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('pages.dashboard');

  const userDetails = JSON.parse(sessionStorage.getItem(CommonConstants.USER_DETAILS));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    showLoading();
    logout({ variables: { accessToken: 'test' } })
      .then(({ data }) => {
        sessionStorage.removeItem(CommonConstants.USER_DETAILS);
        hideLoading();
        history.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            {t(`${NS.COMMON}:${title}`)}
          </Typography>
          <LocaleDropdown />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <UserInfo userDetails={userDetails} />
          <IconButton onClick={handleDrawerClose} className={classes.iconButton}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <Divider />
        <List>
          {[
            { label: 'pages.dashboard', path: 'home', icon: <DashboardIcon /> },
            { label: 'pages.about', path: 'about', icon: <InfoRounded /> },
          ].map((item, index) => (
            <Link
              to={item.path}
              style={{ textDecoration: 'none' }}
                          // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => setTitle(item.label)}
            >
              <ListItem button key={item.path} className={classes.listItem} selected={item.label === title}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={t(`${NS.COMMON}:${item.label}`)} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={t(`${NS.COMMON}:label.logout`)} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
