import React, { memo } from 'react';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '60%',
    marginTop: 100,
  },
  icon: {
    fontSize: '5rem',
  },
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <PeopleAltIcon color="primary" className={classes.icon} />
    </Box>
  );
};

export default memo(Logo);
