import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';

import { NameSpaces as NS } from 'constants/i18n';


const TextInput = ({ ...props }) => {
  const { t } = useTranslation([NS.COMMON]);

  const { label, placeholder, helperText } = props;

  return (
    <TextField
      key={props.id}
      variant="outlined"
      fullWidth
      {...props}
      margin="normal"
      label={t(`${label}`)}
      placeholder={t(`${placeholder}`)}
      helperText={helperText ? t(`${helperText}`) : ''}
    />
  );
};
export default memo(TextInput);
