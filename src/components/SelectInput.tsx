
import React, { memo } from 'react';
import {
  makeStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { NameSpaces as NS } from 'constants/i18n';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectInput = ({ ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation([NS.COMMON]);

  const {
    id, label, error, helperText, onChange, lookUp,
  } = props;

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth error={error}>
      <InputLabel id={`${id}-select-outlined-label`}>{t(`${label}`)}</InputLabel>
      <Select
        labelId={`${id}-select-outlined-label`}
        id={`${id}-select-outlined`}
        label={label}
        name={id}
        defaultValue=""
        onChange={(event) => onChange(event)}
        required
      >
        <MenuItem value="">
          <em>{t(`${NS.COMMON}:label.none`)}</em>
        </MenuItem>
        {lookUp.options.map((option: any) => (
          <MenuItem key={option[lookUp.value]} value={option[lookUp.value]}>
            {option[lookUp.key]}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{t(`${helperText}`)}</FormHelperText>}
    </FormControl>
  );
};

export default memo(SelectInput);
