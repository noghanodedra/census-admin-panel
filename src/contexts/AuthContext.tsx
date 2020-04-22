import React, { createContext } from 'react';

const AuthContext = createContext({
  data: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

export default AuthContext;
