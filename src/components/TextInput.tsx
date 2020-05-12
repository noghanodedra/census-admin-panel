import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = ({ ...props }) => <TextField
  key={props.id}
  variant="outlined"
  fullWidth
  margin="normal"
  {...props}
/>;

export default memo(TextInput);
