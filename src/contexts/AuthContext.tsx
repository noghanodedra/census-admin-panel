import React, { createContext } from 'react';

const AuthContext = createContext({
  authData: null,
  onLogin: (newAuthData: object) => {},
  onLogout: () => {},
});

export default AuthContext;
