import React, { memo, useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation(['translation', 'login']);
  const [currentLocale, setCurrentLocale] = useState('en');
  const classes = useStyles();
  console.log(t('translation:gu'));

  const handleChange = (event: { target: { value: any; }; }) => {
    setCurrentLocale(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      labelId="select-label"
      id="locale-select"
      value={currentLocale}
      onChange={handleChange}
      className={classes.select}
    >
      <MenuItem value="en">{t('translation:en')}</MenuItem>
      <MenuItem value="gu">{t('translation:gu')}</MenuItem>
    </Select>
  );
};
export default memo(LocaleDropdown);
