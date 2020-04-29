import React, { memo } from 'react';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const Logo = () => (
  <PeopleAltIcon color="primary" fontSize="large" style={{ justifyContent: 'center', justifySelf: 'center' }} />
);

export default memo(Logo);
