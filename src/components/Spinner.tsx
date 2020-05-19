import React, { useContext, memo } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

import { LoadingContext } from 'contexts';

const useStyles = makeStyles((theme) => ({
  root: {
    left: '47%',
    position: 'absolute',
    top: '39vh',
    [theme.breakpoints.down('xs')]: {
      top: '51vh',
      left: '42%',
    },
  },
  overlay: { display: 'flex', top: 20 },
}));

const Spinner = ({ ...props }) => {
  const classes = useStyles();
  const { loadingCount } = useContext(LoadingContext);
  return (
    <>
      {loadingCount > 0 && (
      <div className={classes.overlay}>
        <CircularProgress color="primary" thickness={5} size={60} disableShrink className={classes.root} />
      </div>
      )}
    </>
  );
};

export default memo(Spinner);
