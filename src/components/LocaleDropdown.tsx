import React, { memo, useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Namespaces } from 'constants/i18n';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}));

const LocaleDropdown = () => {
  const { t, i18n } = useTranslation([Namespaces.COMMON]);
  const [currentLocale, setCurrentLocale] = useState('en');
  const classes = useStyles();

  const handleChange = (event: { target: { value: any; }; }) => {
    const code = event.target.value;
    setCurrentLocale(code);
    localStorage.setItem('locale', code);
    i18n.changeLanguage(code);
  };

  return (
    <Select
      labelId="select-label"
      id="locale-select"
      value={currentLocale}
      onChange={handleChange}
      className={classes.select}
    >
      <MenuItem value="en">{t(`${Namespaces.COMMON}:en`)}</MenuItem>
      <MenuItem value="gu">{t(`${Namespaces.COMMON}:gu`)}</MenuItem>
    </Select>
  );
};
export default memo(LocaleDropdown);
