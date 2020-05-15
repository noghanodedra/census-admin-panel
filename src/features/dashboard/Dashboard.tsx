import React, { memo, useContext, useEffect } from 'react';
import { LoadingContext } from 'contexts';
import { useQuery } from '@apollo/react-hooks';

import { GET_DROP_DOWN_DATA } from 'constants/graphql-queries-mutations';
import { usePersistedState } from 'hooks';
import { CommonConstants } from 'constants/common';

const Dashboard = ({ ...props }) => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const { loading, data } = useQuery(GET_DROP_DOWN_DATA);
  const [dropDownData, setDropDownData] = usePersistedState(CommonConstants.DROP_DOWN_DATA);

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
      setDropDownData(data);
      console.log(data);
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <>
      <div>
        <h1>Welcome to dashboard</h1>
      </div>
    </>
  );
};

export default memo(Dashboard);
