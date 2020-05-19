import React, { memo } from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props: any) => <MuiAlert elevation={6} {...props} />;

const useStyles = makeStyles((theme) => ({
  snackbar: {
    height: '100%',
  },
}));

const CustomSnackbar = (props: any) => {
  const classes = useStyles();
  const { message, onCloseCallback, open } = props;

  const onAlertClose = (event: React.SyntheticEvent) => {
    onCloseCallback();
  };
  const handleSnackBarClose = (event: any, reason: string) => {
    onCloseCallback();
  };

  return (
    <Snackbar
      className={classes.snackbar}
      open={open}
      autoHideDuration={6000}
      onClose={handleSnackBarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key="top,center"
    >
      <Alert onClose={onAlertClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default memo(CustomSnackbar);
