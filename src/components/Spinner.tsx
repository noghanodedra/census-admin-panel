import React, { useContext, memo } from 'react';
import { CircularProgress } from '@material-ui/core';

import { LoadingContext } from 'contexts';

const Spinner = ({ ...props }) => {
  const { loadingCount } = useContext(LoadingContext);
  return (
    <>
      {loadingCount > 0 && (
      <div style={style.overlay}>
        <CircularProgress color="primary" thickness={5} size={60} disableShrink />
      </div>
      )}
    </>
  );
};

const style = {
  overlay: { display: 'flex', top: 20 },
};
export default memo(Spinner);
