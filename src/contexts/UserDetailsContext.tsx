import React, { createContext } from 'react';

export interface IUserDetails {
  firstName : string;
  lastName : string;
  email : string;
  lastLoggedIn : Date;
}

export interface IUserDetailsContext {
  userDetails: IUserDetails;
  setUserDetails: (userDetails: IUserDetails) => void;
}

export const USER_DETAILS_DEFAULT_VALUE = {
  userDetails: {
    firstName: '',
    lastName: '',
    email: '',
    lastLoggedIn: new Date(),
  },
  setUserDetails: (userDetails: IUserDetails) => {},
};

const UserDetailsContext = createContext<IUserDetailsContext>(USER_DETAILS_DEFAULT_VALUE);

export default UserDetailsContext;
