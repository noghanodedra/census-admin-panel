import React, { useState, FunctionComponent } from 'react';

import { USER_DETAILS_DEFAULT_VALUE, IUserDetails } from 'contexts/UserDetailsContext';
import { UserDetailsContext } from 'contexts';

const UserDetailsProvider: FunctionComponent = ({ children }) => {
  const userState = {
    ...USER_DETAILS_DEFAULT_VALUE,
  };

  const setUserDetails = (userDetails: IUserDetails) => {
    updateUserDetails((prevState) => ({ ...prevState, ...userDetails }));
  };

  const [userDetails, updateUserDetails] = useState(userState);

  return (
    <UserDetailsContext.Provider value={userDetails}>
      {children}
    </UserDetailsContext.Provider>);
};

const useUserDetails = () => {
  const context = React.useContext(UserDetailsContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a AppProvider');
  }
  return context;
};

export { UserDetailsProvider, useUserDetails };
