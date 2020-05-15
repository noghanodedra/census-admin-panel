import React, { memo, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Avatar, Typography, CardContent, Grid,
} from '@material-ui/core';
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 120,
    marginBottom: 0,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface IProps {
  userDetails: {
    firstName: string;
    lastName:string;
    email:string;
    lastLoggedIn:Date
  };
}

const UserInfo: FunctionComponent<IProps> = (props: IProps) => {
  const classes = useStyles();
  const { userDetails } = props;

  const getInitials = () => {
    if (userDetails) { return (userDetails.firstName.charAt(0) + userDetails.lastName.charAt(0)).toUpperCase(); }
    return '';
  };

  return (
    <>
      <div className={classes.card}>
        <CardContent>
          <Grid container justify="center">
            <Avatar className={clsx(classes.large, classes.avatar)}>{getInitials()}</Avatar>
          </Grid>
          <Typography variant="subtitle1" component="p">
            {userDetails.firstName} {userDetails.lastName}
          </Typography>
          <Typography variant="caption" component="h2">
            {userDetails.email}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            Last login:
            {Moment(userDetails.lastLoggedIn).format(' YYYY-MM-DD HH:mma')}
          </Typography>
        </CardContent>
      </div>
    </>
  );
};
export default memo(UserInfo);
