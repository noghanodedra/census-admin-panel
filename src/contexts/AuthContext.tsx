import React, { createContext } from 'react';

const AuthContext = createContext({
  authData: {},
  setData: (data: never) => {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

export default AuthContext;
