import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    border: '1px solid red',
  },
  helperText: { border: '1px solid red' },
  outlinedRoot: {
    '&:hover $notchedOutline': {
      borderColor: 'red',
    },
    '&$focused $notchedOutline': {
      borderColor: 'green',
      borderWidth: 1,
    },
  },
  notchedOutline: {},
  focused: {},
}));


const CTextField = ({ ...props }) => {
  const classes = useStyles();

  const InputProps = {
    classes: {
      root: classes.outlinedRoot,
      notchedOutline: classes.notchedOutline,
      focused: classes.focused,
    },
  };

  return (
    <TextField
      variant="outlined"
      {...props}
      className={classes.textField}
      FormHelperTextProps={{
        className: classes.helperText,
      }}
      InputProps={InputProps}
    />
  );
};

export default memo(CTextField);
