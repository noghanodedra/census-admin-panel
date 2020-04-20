import React, { useContext, memo } from 'react';
import Loader from 'react-loader-spinner';

import { LoadingContext } from 'contexts';

const Spinner = ({ ...props }) => {
  const { loadingCount } = useContext(LoadingContext);

  return (
    <>
      {loadingCount > 0 && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
    </>
  );
};

export default memo(Spinner);
